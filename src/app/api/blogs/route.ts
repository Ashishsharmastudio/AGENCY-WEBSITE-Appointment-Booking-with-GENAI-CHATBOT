import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const publishedParam = url.searchParams.get("published");
    const limitParam = url.searchParams.get("limit");
    const filter: Record<string, boolean> = {};
    if (publishedParam === "true") filter.isPublished = true;
    if (publishedParam === "false") filter.isPublished = false;

    const client = await clientPromise;
    const db = client.db("agencyDB");
    const cursor = db.collection("blogs").find(filter).sort({ createdAt: -1 });
    const limit = limitParam ? Number(limitParam) : undefined;
    const blogs = await (limit ? cursor.limit(limit) : cursor).toArray();
    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const now = new Date();

    const title: string = body.title?.toString() ?? "";
    const providedSlug: string | undefined = body.slug?.toString();
    const slug = providedSlug && providedSlug.length > 0 ? slugify(providedSlug) : slugify(title);

    const blogDoc = {
      title,
      slug,
      content: body.content?.toString() ?? "",
      author: body.author?.toString() ?? "",
      category: body.category?.toString() ?? "",
      image: body.image?.toString() ?? "",
      isPublished: Boolean(body.isPublished ?? false),
      createdAt: now,
      updatedAt: now,
    };

    const client = await clientPromise;
    const db = client.db("agencyDB");

    // Ensure unique slug
    const existing = await db.collection("blogs").findOne({ slug: blogDoc.slug });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const result = await db.collection("blogs").insertOne(blogDoc);
    return NextResponse.json({ _id: result.insertedId, ...blogDoc }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}


