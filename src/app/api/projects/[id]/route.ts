import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const client = await clientPromise;
    const db = client.db("agencyDB");
    const project = await db
      .collection("projects")
      .findOne({ _id: new ObjectId(id) });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const updates = await req.json();
    updates.updatedAt = new Date();

    const client = await clientPromise;
    const db = client.db("agencyDB");
    const { id } = await context.params;
    const result = await db
      .collection("projects")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updates },
        { returnDocument: "after" }
      );
    if (!result || !result.value)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(result.value);
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db("agencyDB");
    const { id } = await context.params;
    const result = await db
      .collection("projects")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}


