import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { generateSmartResponse } from "@/lib/geminiClient"; // removed unused Chat import

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

    if (!question)
      return NextResponse.json({ error: "Missing question" }, { status: 400 });

    const matched = serviceCatalog.find((s) =>
      question.toLowerCase().includes(s.name.toLowerCase().split(" ")[0])
    );

    const aiReply = await generateSmartResponse(serviceCatalog, question);

    const client = await clientPromise;
    const db = client.db("my-agency");

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
  } catch (error: unknown) {
    // typed properly – no `any`
    if (error instanceof Error) {
      console.error("Chat API Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("Unknown Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
