import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db("my-agency");
    const collection = db.collection("contact-queries");

    // Build filter
    const filter = status ? { status } : {};

    // Get total count
    const total = await collection.countDocuments(filter);

    // Get paginated results
    const queries = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get statistics
    const stats = await collection.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    const statusStats = {
      total,
      new: 0,
      contacted: 0,
      converted: 0,
      closed: 0
    };

    stats.forEach(stat => {
      statusStats[stat._id as keyof typeof statusStats] = stat.count;
    });

    return NextResponse.json({
      queries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: statusStats
    });

  } catch (error) {
    console.error('Error fetching contact queries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact queries' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("my-agency");
    const collection = db.collection("contact-queries");

    const result = await collection.updateOne(
      { _id: new (await import('mongodb')).ObjectId(id) },
      { 
        $set: { 
          status,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Contact query not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Status updated successfully',
      updated: result.modifiedCount > 0
    });

  } catch (error) {
    console.error('Error updating contact query:', error);
    return NextResponse.json(
      { error: 'Failed to update contact query' },
      { status: 500 }
    );
  }
}

