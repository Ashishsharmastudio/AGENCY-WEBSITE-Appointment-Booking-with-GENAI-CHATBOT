import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("my-agency");
    const appointments = await db.collection("appointments").find().sort({ date: 1 }).toArray();
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { service, date, message, fileUrl } = body;

    if (!service || !date) {
      return NextResponse.json({ error: "Service and date are required" }, { status: 400 });
    }

    const appointment = {
      service,
      date: new Date(date),
      message: message || "",
      fileUrl: fileUrl || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("my-agency");
    const result = await db.collection("appointments").insertOne(appointment);

    return NextResponse.json({ success: true, appointment: { _id: result.insertedId, ...appointment } }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
