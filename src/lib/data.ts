import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export interface ProjectDocument {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
  technologies?: string[];
  createdAt: string;
  updatedAt?: string;
  isFeatured?: boolean;
  link?: string;
  demoUrl?: string;
  github?: string;
  repoUrl?: string;
}

export interface BlogDocument {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  author?: string;
  category?: string;
  createdAt: string;
  published?: boolean;
}

function normalizeId(document: unknown) {
  if (!document || typeof document !== "object") return document;
  const doc = document as Record<string, unknown>;
  if (doc._id && typeof doc._id !== "string") {
    return { ...doc, _id: (doc._id as { toString: () => string }).toString() };
  }
  return document;
}

export async function getProjects(filter: Record<string, unknown> = {}) {
  try {
    const client = await clientPromise;
    const db = client.db("agencyDB");
    const cursor = db.collection("projects").find(filter).sort({ createdAt: -1 });
    const result = await cursor.toArray();
    return result.map(normalizeId) as ProjectDocument[];
  } catch (error) {
    console.error("Failed to load projects:", error);
    return [];
  }
}

export async function getProjectById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("agencyDB");
    const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null;
    if (!objectId) return null;
    const project = await db.collection("projects").findOne({ _id: objectId });
    return normalizeId(project) as ProjectDocument | null;
  } catch (error) {
    console.error("Failed to load project:", error);
    return null;
  }
}

export async function getPublishedBlogs() {
  try {
    const client = await clientPromise;
    const db = client.db("agencyDB");
    const blogs = await db
      .collection("blogs")
      .find({ published: true })
      .sort({ createdAt: -1 })
      .toArray();
    return blogs.map(normalizeId) as BlogDocument[];
  } catch (error) {
    console.error("Failed to load published blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const client = await clientPromise;
    const db = client.db("agencyDB");
    const blog = await db.collection("blogs").findOne({ slug });
    return normalizeId(blog) as BlogDocument | null;
  } catch (error) {
    console.error("Failed to load blog by slug:", error);
    return null;
  }
}
