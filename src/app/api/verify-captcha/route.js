import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { token } = await request.json();
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "Captcha verification failed",
        errors: data['error-codes']
      }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal Error" }, { status: 500 });
  }
}