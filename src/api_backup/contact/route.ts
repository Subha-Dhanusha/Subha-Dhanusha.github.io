import { NextRequest, NextResponse } from 'next/server';
import { submitContactMessage } from '@/lib/data/portfolio-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, domain_context } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const saved = await submitContactMessage({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: subject ? String(subject).trim() : 'Portfolio Inquiry',
      message: String(message).trim(),
      domain_context: domain_context || 'ai-ml',
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. Thank you for reaching out!',
      data: saved,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to submit contact message' },
      { status: 500 }
    );
  }
}
