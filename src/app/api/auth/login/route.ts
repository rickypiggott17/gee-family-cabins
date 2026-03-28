import { NextRequest, NextResponse } from 'next/server';

const FAMILY_PASSWORD = process.env.FAMILY_PASSWORD;

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === FAMILY_PASSWORD) {
      // Create response with authentication cookie
      const response = NextResponse.json({ success: true });
      
      // Set secure cookie (expires in 24 hours)
      response.cookies.set('gee-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// Optional: Add logout functionality
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  
  // Clear the authentication cookie
  response.cookies.set('gee-auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return response;
}