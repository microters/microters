import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { email } = await request.json();
        
        const transporter = nodemailer.createTransport({
            host: process.env.TITAN_SMTP_HOST,
            port: 465,
            secure: true, 
            auth: {
                user: process.env.TITAN_USER,
                pass: process.env.TITAN_PASS,
            },
        });

        const mailOptions = {
            from: `"Newsletter Bot" <${process.env.TITAN_USER}>`,
            to: process.env.TITAN_USER, 
            subject: `New Newsletter Subscriber: ${email}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #f35d36;">New Subscription!</h2>
                    <p>You have a new subscriber for your newsletter.</p>
                    <p><strong>Email Address:</strong> ${email}</p>
                    <hr />
                    <p style="font-size: 12px; color: #888;">Sent from Microters Footer Form</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Subscription SMTP Error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}