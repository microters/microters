import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const data = await request.json();

        const transporter = nodemailer.createTransport({
            host: process.env.TITAN_SMTP_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.TITAN_USER,
                pass: process.env.TITAN_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.verify();

        const mailOptions = {
            from: `"Microters Lead" <${process.env.TITAN_USER}>`,
            to: process.env.TITAN_USER, 
            replyTo: data.email,
            subject: `New Lead: ${data.firstName} ${data.lastName}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
                    <h2 style="border-bottom: 2px solid #f35d36; padding-bottom: 10px;">New Contact Submission</h2>
                    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                    
                    <p><strong>Work Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    <p><strong>Website:</strong> ${data.website || 'N/A'}</p>
                    <p><strong>Job Title:</strong> ${data.jobTitle || 'N/A'}</p>
                    <p><strong>Needs:</strong> ${data.needs || 'N/A'}</p>
                    
                    <hr style="border: none; border-top: 1px solid #eee;" />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${data.message}</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("SMTP Error:", error);
        return NextResponse.json({ 
            success: false, 
            error: error.message,
            code: error.code 
        }, { status: 500 });
    }
}