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
        });

        const servicesRequested = data.services?.join(', ') || 'None selected';

        const mailOptions = {
            from: `"Project Proposal" <${process.env.TITAN_USER}>`,
            to: process.env.TITAN_USER, 
            replyTo: data.email,
            subject: `New Proposal Request: ${data.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
                    <h2 style="color: #f35d36; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Project Proposal</h2>
                    
                    <p><strong>Services:</strong> ${servicesRequested}</p>
                    <p><strong>Monthly Budget:</strong> ${data.budget}</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <tr>
                            <td style="padding: 8px; border: 1px solid #eee; background: #f9f9f9; width: 30%;"><strong>Client Name:</strong></td>
                            <td style="padding: 8px; border: 1px solid #eee;">${data.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #eee; background: #f9f9f9;"><strong>Email:</strong></td>
                            <td style="padding: 8px; border: 1px solid #eee;">${data.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #eee; background: #f9f9f9;"><strong>Phone:</strong></td>
                            <td style="padding: 8px; border: 1px solid #eee;">${data.contactNo || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #eee; background: #f9f9f9;"><strong>Website:</strong></td>
                            <td style="padding: 8px; border: 1px solid #eee;">${data.website || 'N/A'}</td>
                        </tr>
                         <tr>
                            <td style="padding: 8px; border: 1px solid #eee; background: #f9f9f9;"><strong>Company:</strong></td>
                            <td style="padding: 8px; border: 1px solid #eee;">${data.company || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #eee; background: #f9f9f9;"><strong>Skype ID:</strong></td>
                            <td style="padding: 8px; border: 1px solid #eee;">${data.skype || 'N/A'}</td>
                        </tr>
                    </table>

                    <div style="margin-top: 20px; padding: 15px; background: #fef7f5; border-left: 4px solid #f35d36;">
                        <strong>Message:</strong><br/>
                        ${data.message || 'No additional details provided.'}
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Proposal API Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}