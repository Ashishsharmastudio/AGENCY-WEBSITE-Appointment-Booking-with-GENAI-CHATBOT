import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const client = await clientPromise;
    console.log('MongoDB client connected successfully');
    
    const db = client.db("agencyDB");
    console.log('Connected to database: agencyDB');
    
    const projects = await db.collection("portfolio").find().toArray();
    console.log(`Found ${projects.length} projects in portfolio collection`);
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("agencyDB");
    const body = await req.json();
    const project = await db.collection("portfolio").insertOne(body);
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 });
  }
}
