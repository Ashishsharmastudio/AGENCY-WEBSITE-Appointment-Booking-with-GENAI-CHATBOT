import { MongoClient, ObjectId } from "mongodb";
import fs from "fs/promises";
import path from "path";

declare global {
  var _mongoClientPromise: Promise<any> | undefined;
}

const uri = process.env.MONGODB_URI;
const localDbPath = path.join(process.cwd(), "data", "local-db.json");

interface LocalDbStorage {
  [db: string]: {
    [collection: string]: any[];
  };
}

async function ensureLocalDataFile(): Promise<LocalDbStorage> {
  try {
    await fs.mkdir(path.dirname(localDbPath), { recursive: true });
    const existing = await fs.readFile(localDbPath, "utf8");
    return existing.trim() ? (JSON.parse(existing) as LocalDbStorage) : {};
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw error;
  }
}

async function writeLocalDataFile(data: LocalDbStorage) {
  await fs.mkdir(path.dirname(localDbPath), { recursive: true });
  await fs.writeFile(localDbPath, JSON.stringify(data, null, 2), "utf8");
}

function matchesFilter(doc: any, filter: any): boolean {
  if (!filter || Object.keys(filter).length === 0) return true;
  return Object.entries(filter).every(([key, value]) => {
    const docValue = doc[key];
    if (value && typeof value === "object" && typeof value.equals === "function") {
      return docValue?.equals?.(value) || false;
    }
    if (value instanceof ObjectId) {
      return docValue?._id?.equals?.(value) || docValue?.equals?.(value) || false;
    }
    if (typeof value === "object" && value !== null) {
      return matchesFilter(docValue, value);
    }
    return docValue === value;
  });
}

class LocalCollection {
  constructor(private dbName: string, private collectionName: string) {}

  private async loadData() {
    const storage = await ensureLocalDataFile();
    storage[this.dbName] = storage[this.dbName] || {};
    storage[this.dbName][this.collectionName] = storage[this.dbName][this.collectionName] || [];
    return storage;
  }

  async findOne(filter: any) {
    const storage = await this.loadData();
    const docs = storage[this.dbName][this.collectionName];
    return docs.find((doc: any) => matchesFilter(doc, filter)) || null;
  }

  insertOne(doc: any) {
    return (async () => {
      const storage = await this.loadData();
      const collection = storage[this.dbName][this.collectionName];
      const record = { ...doc, _id: new ObjectId() };
      collection.push(record);
      await writeLocalDataFile(storage);
      return { insertedId: record._id };
    })();
  }

  deleteOne(filter: any) {
    return (async () => {
      const storage = await this.loadData();
      const collection = storage[this.dbName][this.collectionName];
      const index = collection.findIndex((doc: any) => matchesFilter(doc, filter));
      if (index === -1) return { deletedCount: 0 };
      collection.splice(index, 1);
      await writeLocalDataFile(storage);
      return { deletedCount: 1 };
    })();
  }

  updateOne(filter: any, update: any) {
    return (async () => {
      const storage = await this.loadData();
      const collection = storage[this.dbName][this.collectionName];
      const index = collection.findIndex((doc: any) => matchesFilter(doc, filter));
      if (index === -1) return { matchedCount: 0, modifiedCount: 0, upsertedId: null };
      const doc = collection[index];
      if (update.$set) Object.assign(doc, update.$set);
      if (update.$inc) {
        Object.entries(update.$inc).forEach(([key, value]) => {
          doc[key] = (doc[key] || 0) + (value as number);
        });
      }
      collection[index] = doc;
      await writeLocalDataFile(storage);
      return { matchedCount: 1, modifiedCount: 1, upsertedId: null };
    })();
  }

  find(filter: any = {}) {
    return new LocalCursor(this.dbName, this.collectionName, filter);
  }
}

class LocalCursor {
  private filter: any;
  private operations: Array<{ type: "sort" | "limit"; value: any }> = [];

  constructor(private dbName: string, private collectionName: string, filter: any) {
    this.filter = filter;
  }

  sort(sortObj: any) {
    this.operations.push({ type: "sort", value: sortObj });
    return this;
  }

  limit(count: number) {
    this.operations.push({ type: "limit", value: count });
    return this;
  }

  async toArray() {
    const storage = await ensureLocalDataFile();
    const allDocs = storage[this.dbName]?.[this.collectionName] || [];
    let docs = allDocs.filter((doc: any) => matchesFilter(doc, this.filter));

    for (const op of this.operations) {
      if (op.type === "sort") {
        const [[key, direction]] = Object.entries(op.value);
        docs = docs.slice().sort((a: any, b: any) => {
          const av = a[key];
          const bv = b[key];
          if (av === bv) return 0;
          if (av == null) return 1;
          if (bv == null) return -1;
          return direction === -1 ? (bv > av ? 1 : -1) : av > bv ? 1 : -1;
        });
      }
      if (op.type === "limit") {
        docs = docs.slice(0, op.value);
      }
    }

    return docs;
  }
}

class LocalDb {
  constructor(private dbName: string) {}

  collection(name: string) {
    return new LocalCollection(this.dbName, name);
  }
}

class LocalMongoClient {
  db(dbName: string) {
    return new LocalDb(dbName);
  }
  async connect() {
    return this;
  }
}

let clientPromise: Promise<any>;

if (!uri) {
  clientPromise = (async () => {
    console.warn("No MONGODB_URI found, using local JSON fallback database at data/local-db.json");
    await ensureLocalDataFile();
    return new LocalMongoClient();
  })();
} else {
  const options = {};
  const client = new MongoClient(uri, options);

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = client.connect();
  }
}

export default clientPromise;
