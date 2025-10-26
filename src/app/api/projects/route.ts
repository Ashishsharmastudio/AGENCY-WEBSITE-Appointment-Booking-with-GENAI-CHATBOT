import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const featuredParam = url.searchParams.get("featured");
    const limitParam = url.searchParams.get("limit");
    const filter: Record<string, boolean> = {};
    if (featuredParam === "true") filter.isFeatured = true;
    if (featuredParam === "false") filter.isFeatured = false;

    const client = await clientPromise;
    const db = client.db("agencyDB");
    const cursor = db.collection("projects").find(filter).sort({ createdAt: -1 });
    const limit = limitParam ? Number(limitParam) : undefined;
    const projects = await (limit ? cursor.limit(limit) : cursor).toArray();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const now = new Date();

    const projectDoc = {
      title: body.title?.toString() ?? "",
      description: body.description?.toString() ?? "",
      category: body.category?.toString() ?? "",
      image: body.image?.toString() ?? "",
      technologies: Array.isArray(body.technologies)
        ? body.technologies.map((t: string) => t.toString())
        : (body.technologies?.toString()?.split(",") ?? []).map((t: string) => t.trim()).filter(Boolean),
      liveUrl: body.liveUrl?.toString() ?? "",
      githubUrl: body.githubUrl?.toString() ?? "",
      isFeatured: Boolean(body.isFeatured ?? false),
      createdAt: now,
      updatedAt: now,
    };

    const client = await clientPromise;
    const db = client.db("agencyDB");
    const result = await db.collection("projects").insertOne(projectDoc);
    return NextResponse.json({ _id: result.insertedId, ...projectDoc }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}


