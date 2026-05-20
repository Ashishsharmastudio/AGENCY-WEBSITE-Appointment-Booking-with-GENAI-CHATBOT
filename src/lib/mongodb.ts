import { MongoClient, ObjectId } from "mongodb";
import fs from "fs/promises";
import path from "path";

declare global {
  var _mongoClientPromise: Promise<MongoClient | LocalMongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
const localDbPath = path.join(process.cwd(), "data", "local-db.json");

type LocalDocument = Record<string, unknown> & { _id?: ObjectId };
type LocalFilter = Record<string, unknown>;
type LocalSort = Record<string, 1 | -1>;

interface LocalDbStorage {
  [db: string]: {
    [collection: string]: LocalDocument[];
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function ensureLocalDataFile(): Promise<LocalDbStorage> {
  try {
    await fs.mkdir(path.dirname(localDbPath), { recursive: true });
    const existing = await fs.readFile(localDbPath, "utf8");
    return existing.trim() ? (JSON.parse(existing) as LocalDbStorage) : {};
  } catch (error) {
    if ((error as { code?: string }).code === "ENOENT") {
      return {};
    }
    throw error;
  }
}

async function writeLocalDataFile(data: LocalDbStorage) {
  await fs.mkdir(path.dirname(localDbPath), { recursive: true });
  await fs.writeFile(localDbPath, JSON.stringify(data, null, 2), "utf8");
}

function matchesFilter(doc: unknown, filter: unknown): boolean {
  if (!isObject(filter) || !isObject(doc)) return false;
  if (Object.keys(filter).length === 0) return true;

  return Object.entries(filter).every(([key, value]) => {
    const docValue = doc[key];

    if (value instanceof ObjectId) {
      return (
        (docValue instanceof ObjectId && docValue.equals(value)) ||
        (isObject(docValue) &&
          "_id" in docValue &&
          docValue._id instanceof ObjectId &&
          docValue._id.equals(value)) ||
        false
      );
    }

    if (isObject(value) && typeof (value as { equals?: unknown }).equals === "function") {
      return (
        isObject(docValue) &&
        typeof (docValue as { equals?: unknown }).equals === "function" &&
        (docValue as { equals: (other: unknown) => boolean }).equals(value)
      );
    }

    if (isObject(value)) {
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

  async findOne(filter: LocalFilter) {
    const storage = await this.loadData();
    const docs = storage[this.dbName][this.collectionName];
    return docs.find((doc) => matchesFilter(doc, filter)) || null;
  }

  async insertOne(doc: LocalDocument) {
    const storage = await this.loadData();
    const collection = storage[this.dbName][this.collectionName];
    const record: LocalDocument = { ...doc, _id: new ObjectId() };
    collection.push(record);
    await writeLocalDataFile(storage);
    return { insertedId: record._id };
  }

  async deleteOne(filter: LocalFilter) {
    const storage = await this.loadData();
    const collection = storage[this.dbName][this.collectionName];
    const index = collection.findIndex((doc) => matchesFilter(doc, filter));
    if (index === -1) return { deletedCount: 0 };
    collection.splice(index, 1);
    await writeLocalDataFile(storage);
    return { deletedCount: 1 };
  }

  async updateOne(filter: LocalFilter, update: Record<string, unknown>) {
    const storage = await this.loadData();
    const collection = storage[this.dbName][this.collectionName];
    const index = collection.findIndex((doc) => matchesFilter(doc, filter));
    if (index === -1) return { matchedCount: 0, modifiedCount: 0, upsertedId: null };

    const doc = collection[index];

    if (isObject(update.$set)) {
      Object.assign(doc, update.$set);
    }

    if (isObject(update.$inc)) {
      Object.entries(update.$inc).forEach(([key, value]) => {
        if (typeof value === "number") {
          const currentValue = typeof doc[key] === "number" ? (doc[key] as number) : 0;
          doc[key] = currentValue + value;
        }
      });
    }

    collection[index] = doc;
    await writeLocalDataFile(storage);
    return { matchedCount: 1, modifiedCount: 1, upsertedId: null };
  }

  async findOneAndUpdate(
    filter: LocalFilter,
    update: Record<string, unknown>,
    options?: { returnDocument?: "before" | "after"; upsert?: boolean }
  ) {
    const storage = await this.loadData();
    const collection = storage[this.dbName][this.collectionName];
    const index = collection.findIndex((doc) => matchesFilter(doc, filter));

    if (index === -1) {
      if (options?.upsert) {
        const record: LocalDocument = { ...((update.$set as LocalDocument) || {}), _id: new ObjectId() };
        collection.push(record);
        await writeLocalDataFile(storage);
        return { value: options?.returnDocument === "after" ? record : null, lastErrorObject: { n: 1 }, ok: 1 };
      }
      return { value: null, lastErrorObject: { n: 0 }, ok: 1 };
    }

    const beforeDoc = { ...collection[index] };
    const doc = collection[index];

    if (isObject(update.$set)) {
      Object.assign(doc, update.$set);
    }

    if (isObject(update.$inc)) {
      Object.entries(update.$inc).forEach(([key, value]) => {
        if (typeof value === "number") {
          const currentValue = typeof doc[key] === "number" ? (doc[key] as number) : 0;
          doc[key] = currentValue + value;
        }
      });
    }

    collection[index] = doc;
    await writeLocalDataFile(storage);

    return {
      value: options?.returnDocument === "after" ? doc : beforeDoc,
      lastErrorObject: { n: 1 },
      ok: 1,
    };
  }

  async countDocuments(filter: LocalFilter = {}) {
    const storage = await this.loadData();
    const collection = storage[this.dbName][this.collectionName] || [];
    return collection.filter((doc) => matchesFilter(doc, filter)).length;
  }

  aggregate(pipeline: unknown[]) {
    return new LocalAggregationCursor(this.dbName, this.collectionName, pipeline);
  }

  find(filter: LocalFilter = {}) {
    return new LocalCursor(this.dbName, this.collectionName, filter);
  }
}

class LocalAggregationCursor {
  constructor(
    private dbName: string,
    private collectionName: string,
    private pipeline: unknown[],
  ) {}

  async toArray() {
    const storage = await ensureLocalDataFile();
    const collection = storage[this.dbName]?.[this.collectionName] || [];
    let results: Record<string, unknown>[] = collection;

    for (const stage of this.pipeline) {
      if (!isObject(stage)) continue;

      if (isObject(stage.$group)) {
        const groupStage = stage.$group as Record<string, unknown>;
        const idExpr = groupStage._id;
        const sumExpr = groupStage.count as Record<string, unknown>;

        if (isObject(sumExpr) && sumExpr.$sum === 1) {
          const buckets = new Map<string, number>();

          for (const doc of results) {
            const key =
              idExpr === "$status" && isObject(doc) && typeof doc.status === "string"
                ? doc.status
                : "unknown";
            buckets.set(key, (buckets.get(key) || 0) + 1);
          }

          results = Array.from(buckets.entries()).map(([key, count]) => ({ _id: key, count }));
        }
      }
    }

    return results;
  }
}

class LocalCursor {
  private filter: LocalFilter;
  private operations: Array<{ type: "sort" | "limit" | "skip"; value: LocalSort | number }> = [];

  constructor(private dbName: string, private collectionName: string, filter: LocalFilter) {
    this.filter = filter;
  }

  sort(sortObj: LocalSort) {
    this.operations.push({ type: "sort", value: sortObj });
    return this;
  }

  skip(count: number) {
    this.operations.push({ type: "skip", value: count });
    return this;
  }

  limit(count: number) {
    this.operations.push({ type: "limit", value: count });
    return this;
  }

  async toArray() {
    const storage = await ensureLocalDataFile();
    const allDocs = storage[this.dbName]?.[this.collectionName] || [];
    let docs = allDocs.filter((doc) => matchesFilter(doc, this.filter));

    for (const op of this.operations) {
      if (op.type === "sort") {
        const sortObj = op.value as LocalSort;
        const [[key, direction]] = Object.entries(sortObj);
        docs = docs.slice().sort((a, b) => {
          const av = a[key];
          const bv = b[key];
          if (av === bv) return 0;
          if (av == null) return 1;
          if (bv == null) return -1;
          return direction === -1 ? (bv > av ? 1 : -1) : av > bv ? 1 : -1;
        });
      }
      if (op.type === "skip") {
        docs = docs.slice(op.value as number);
      }
      if (op.type === "limit") {
        docs = docs.slice(0, op.value as number);
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

let clientPromise: Promise<MongoClient | LocalMongoClient>;

async function createClientPromise() {
  if (!uri) {
    console.warn("No MONGODB_URI found, using local JSON fallback database at data/local-db.json");
    await ensureLocalDataFile();
    return new LocalMongoClient();
  }

  const options = {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  };
  const client = new MongoClient(uri, options);

  try {
    return await client.connect();
  } catch (error) {
    console.warn(
      "Unable to connect to MongoDB, falling back to local JSON database at data/local-db.json:",
      error,
    );
    await ensureLocalDataFile();
    return new LocalMongoClient();
  }
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = createClientPromise();
}

export default clientPromise;
