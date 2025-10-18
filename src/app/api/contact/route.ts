import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received contact form data:', body);

    const { name, email, message, appointment } = body;

    // Validate required fields
    if (!name || !email || !message || !appointment) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Validate appointment date (must be in the future)
    const appointmentDate = new Date(appointment);
    
    if (isNaN(appointmentDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid appointment date format' },
        { status: 400 }
      );
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return NextResponse.json(
        { error: 'Appointment date must be in the future' },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db("my-agency");
    const collection = db.collection("contact-queries");

    const contactSubmission = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      appointment: appointmentDate,
      status: 'new', // new, contacted, converted, closed
  ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(contactSubmission);
    
    console.log('✅ Contact form submission saved to MongoDB:', {
      id: result.insertedId,
      name: contactSubmission.name,
      email: contactSubmission.email,
      appointment: contactSubmission.appointment,
      timestamp: contactSubmission.createdAt,
    });

    return NextResponse.json(
      { 
        message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
        submissionId: `CF-${Date.now()}`
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
