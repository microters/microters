import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const data = await request.json();
        
        const transporter = nodemailer.createTransport({
            host: process.env.TITAN_SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.TITAN_USER,
                pass: process.env.TITAN_PASS,
            },
            authMethod: 'LOGIN',
            tls: {
                rejectUnauthorized: false 
            }
        });

        const mailOptions = {
            from: `"Contact Form" <${process.env.TITAN_USER}>`,
            to: process.env.TITAN_USER, 
            replyTo: data.workEmail,
            subject: `New Lead: ${data.firstName} ${data.lastName}`,
            html: `<p><strong>Needs:</strong> ${data.yourNeeds}</p><p>${data.helpText}</p>`,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("SMTP Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}