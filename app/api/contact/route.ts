import { Resend } from "resend";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  let name: string;
  let email: string;
  let message: string;

  try {
    const body = await request.json();
    name = String(body.name ?? "").trim();
    email = String(body.email ?? "").trim();
    message = String(body.message ?? "").trim();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!name || !email || !message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const { error } = await resend.emails.send({
      from: "Luna Legal Lab <contacto@lunalegallab.com>",
      to: "eduardo@lunalegallab.com",
      replyTo: email,
      subject: `Consulta de ${name} — Luna Legal Lab`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #7b1c2e; margin-bottom: 24px;">Nueva consulta desde lunalegallab.com</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; width: 100px; vertical-align: top;">Nombre:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #7b1c2e;">${email}</a></td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-weight: 600; margin-bottom: 8px;">Mensaje:</p>
          <p style="line-height: 1.6; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #6b7280;">Este mensaje fue enviado desde el formulario de contacto de <a href="https://lunalegallab.com" style="color: #7b1c2e;">lunalegallab.com</a>.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Unexpected error" }, { status: 500 });
  }
}
