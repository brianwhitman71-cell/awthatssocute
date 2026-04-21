import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const image = formData.get("image") as File | null;

  const attachments: { filename: string; content: Buffer }[] = [];
  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    attachments.push({ filename: image.name, content: Buffer.from(bytes) });
  }

  // Email to Alexis
  const toAlexis = await resend.emails.send({
    from: "AW That's So Cute <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL ?? "awthatssocutecrafts@gmail.com",
    replyTo: email,
    subject: `Custom Order Request from ${firstName} ${lastName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;">
        <h2 style="color:#c06080;">New Custom Order Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left:3px solid #c06080;padding-left:12px;color:#555;">
          ${message.replace(/\n/g, "<br>")}
        </blockquote>
        ${attachments.length > 0 ? `<p><strong>Reference image attached:</strong> ${image!.name}</p>` : ""}
      </div>
    `,
    attachments,
  });

  if (toAlexis.error) {
    console.error("Resend error:", toAlexis.error);
    return NextResponse.json({ error: toAlexis.error.message }, { status: 500 });
  }

  // Confirmation email to customer
  await resend.emails.send({
    from: "AW That's So Cute <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL ?? email,
    subject: "We got your message! 🧶",
    html: `
      <div style="font-family:sans-serif;max-width:600px;">
        <h2 style="color:#c06080;">Thanks, ${firstName}!</h2>
        <p>Your message has been received. Alexis will get back to you as soon as possible.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color:#888;font-size:13px;"><strong>Your message:</strong></p>
        <blockquote style="border-left:3px solid #c06080;padding-left:12px;color:#555;font-size:13px;">
          ${message.replace(/\n/g, "<br>")}
        </blockquote>
        ${attachments.length > 0 ? `<p style="color:#888;font-size:13px;">Reference image attached: ${image!.name}</p>` : ""}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color:#aaa;font-size:12px;">
          AW That's So Cute · Atlanta, GA ·
          <a href="mailto:awthatssocutecrafts@gmail.com" style="color:#c06080;">awthatssocutecrafts@gmail.com</a>
        </p>
      </div>
    `,
    attachments,
  });

  return NextResponse.json({ success: true });
}
