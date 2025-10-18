import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("agencyDB");
  const categories = await db.collection("categories").find().toArray();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("agencyDB");
  const body = await req.json();
  const category = await db.collection("categories").insertOne(body);
  return NextResponse.json(category);
}
