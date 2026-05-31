import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true, message: 'Logged out.' });
  res.cookies.set('devaio_token', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });
  return res;
}
