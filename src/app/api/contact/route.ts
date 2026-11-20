import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
const hits = new Map<string, number[]>();
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export async function POST(req: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO)
    return NextResponse.json({ error: "Email service is not configured on the server." }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now(); const recent = (hits.get(ip) ?? []).filter(t => now - t < 600_000);
  if (recent.length >= 5) return NextResponse.json({ error: "Too many messages. Try again in a few minutes." }, { status: 429 });

  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true }); // honeypot: bots fill this field
  const name = String(b.name ?? "").trim(), email = String(b.email ?? "").trim(), subject = String(b.subject ?? "").trim(), message = String(b.message ?? "").trim();
  if (name.length < 2 || name.length > 100 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 200 || subject.length < 3 || subject.length > 150 || message.length < 10 || message.length > 5000)
    return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });

  try {
    const port = Number(SMTP_PORT ?? 465);
    const t = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
    await t.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`, to: CONTACT_TO, replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `[Portfolio] ${subject.replace(/[\r\n]/g, " ")}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><b>From:</b> ${esc(name)} &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    hits.set(ip, [...recent, now]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact mail failed", e);
    return NextResponse.json({ error: "Could not send the message. Please try WhatsApp or email directly." }, { status: 502 });
  }
}
