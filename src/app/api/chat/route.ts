import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import Chat from "@/lib/models/Chat";
import { generateSmartResponse } from "@/lib/geminiClient";

// A simple "mock" service list — replace this with real DB calls if needed.
const serviceCatalog = [
  { name: "Smart Home Setup", description: "Full automation and IoT device integration." },
  { name: "Security System", description: "Surveillance and smart locks for safety." },
  { name: "SaaS Dashboard", description: "Analytics and cloud dashboards for business." },
  { name: "E-commerce Development", description: "Custom online store with payment gateway." },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, userId } = body;

    if (!question) {
      return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }

    // Match relevant service by keyword
    const matched = serviceCatalog.find((s) =>
      question.toLowerCase().includes(s.name.toLowerCase().split(" ")[0])
    );

    // Generate AI reply
    const aiReply = await generateSmartResponse(serviceCatalog, question);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("my-agency");

    // Save chat record
    const savedChat = await db.collection("chats").insertOne({
      userId: userId || "guest",
      serviceId: matched?.name || null,
      question,
      response: aiReply,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      reply: aiReply,
      detectedService: matched?.name || "General Service",
      _id: savedChat.insertedId,
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
