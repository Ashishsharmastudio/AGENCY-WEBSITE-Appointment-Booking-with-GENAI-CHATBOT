import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const client = await clientPromise;
    const db = client.db("agencyDB");
    const blog = await db.collection("blogs").findOne({ slug });
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const updates = await req.json();
    updates.updatedAt = new Date();

    const client = await clientPromise;
    const db = client.db("agencyDB");
    const { slug } = await context.params;
    const result = await db
      .collection("blogs")
      .findOneAndUpdate(
        { slug },
        { $set: updates },
        { returnDocument: "after" }
      );

    if (!result || !result.value)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(result.value);
  } catch {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db("agencyDB");
    const { slug } = await context.params;
    const result = await db.collection("blogs").deleteOne({ slug });
    if (result.deletedCount === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}


