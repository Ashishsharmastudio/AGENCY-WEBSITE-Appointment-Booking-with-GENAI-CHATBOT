import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { generateSmartResponse } from "@/lib/geminiClient";

const serviceCatalog = [
  {
    name: "Website Development",
    description:
      "Modern responsive websites built with Next.js, React, and Tailwind CSS.",
  },
  {
    name: "AI & Automation",
    description:
      "AI chatbots, automation tools, and smart integrations for businesses.",
  },
  {
    name: "SaaS Product Development",
    description:
      "Scalable SaaS platforms with secure APIs and cloud deployment.",
  },
  {
    name: "E-commerce Development",
    description:
      "Custom online stores with payment gateway and admin dashboard.",
  },
  {
    name: "UI/UX Design",
    description: "Clean, modern interfaces that focus on usability.",
  },
  {
    name: "Maintenance & Optimization",
    description: "Ongoing support, updates, and performance improvements.",
  },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, userId } = body;

    if (!question) {
      return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }

    const matched = serviceCatalog.find((s) => {
      const q = question.toLowerCase();
      return (
        q.includes(s.name.toLowerCase()) ||
        q.includes(s.name.split(" ")[0].toLowerCase())
      );
    });

    // ✅ FIXED: Pass serviceCatalog as first argument (expected type)
    const aiReply = await generateSmartResponse(serviceCatalog, question);

    // ✅ Save to MongoDB
    const client = await clientPromise;
    const db = client.db("my-agency");

    const savedChat = await db.collection("chats").insertOne({
      userId: userId || "guest",
      serviceId: matched?.name || "General Service",
      question,
      response: aiReply,
      createdAt: new Date(),
    });

    // ✅ Respond back
    return NextResponse.json({
      success: true,
      reply: aiReply,
      detectedService: matched?.name || "General Service",
      _id: savedChat.insertedId,
    });
  } catch (error: unknown) {
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
