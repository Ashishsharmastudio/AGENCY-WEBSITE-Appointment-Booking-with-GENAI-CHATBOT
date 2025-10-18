import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("my-agency");
    const appointments = await db.collection("appointments").find().sort({ date: 1 }).toArray();
    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load appointments" }, { status: 500 });
  }
}
