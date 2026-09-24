import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL || 'sdsubi0610@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'SubhaPortfolio2026!';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Verify credentials
    if (email.trim().toLowerCase() === adminEmail.toLowerCase() && password === adminPassword) {
      // Mock secure token for local verification
      const token = Buffer.from(`${adminEmail}:${Date.now() + 86400000 * 7}`).toString('base64');
      const response = NextResponse.json({
        success: true,
        email: adminEmail,
        role: 'Super Admin',
        token,
      });

      // Set auth cookie
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Login failed' }, { status: 500 });
  }
}
