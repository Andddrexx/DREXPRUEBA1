import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import nodemailer from "npm:nodemailer@6.9.13";

const LOGO_URL = "https://tofwyhslelgguhecvmnc.supabase.co/storage/v1/object/public/assets/logo.png";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface EmailOrderPayload {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  finalPrice: number;
  notes: string;
  deliveryMethod: string;
}

function buildClientEmailHtml(payload: EmailOrderPayload): string {
  const itemsRows = payload.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #404040; color: #d4d4d4;">${item.name}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #404040; color: #d4d4d4; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #404040; color: #d4d4d4; text-align: right;">${item.total.toFixed(2)}€</td>
      </tr>`
    )
    .join("");

  const discountRow =
    payload.discount > 0
      ? `<tr>
          <td colspan="2" style="padding: 8px 0; color: #34d399; text-align: right;">Descuento aplicado:</td>
          <td style="padding: 8px 0; color: #34d399; text-align: right;">-${payload.discount.toFixed(2)}€</td>
        </tr>`
      : "";

  const shippingRow =
    payload.deliveryMethod === "Envío"
      ? payload.shipping > 0
        ? `<tr>
            <td colspan="2" style="padding: 8px 0; color: #a3a3a3; text-align: right;">Envío:</td>
            <td style="padding: 8px 0; color: #a3a3a3; text-align: right;">+${payload.shipping.toFixed(2)}€</td>
          </tr>`
        : `<tr>
            <td colspan="2" style="padding: 8px 0; color: #a3a3a3; text-align: right;">Envío:</td>
            <td style="padding: 8px 0; color: #34d399; text-align: right;">Gratis</td>
          </tr>`
      : "";

  const deliveryLabel = payload.deliveryMethod === "Envío"
    ? "Envío a domicilio (3-5 días laborables)"
    : "Entrega en mano / Recogida (24-48h)";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Confirmación de pedido #${payload.orderId}</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 15%, #2a2a2a 30%, #3a3a3a 45%, #4a4a4a 60%, #5a5a5a 75%, #6a6a6a 90%, #7a7a7a 100%); font-family: 'Inter', -apple-system, sans-serif; color: #e5e5e5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <div style="text-align: center; margin-bottom: 40px;">
      <img src="${LOGO_URL}" alt="CBDREX" style="max-width: 180px; height: auto; margin: 0 auto;" />
    </div>

    <div style="background: rgba(38, 38, 38, 0.85); border: 1px solid #404040; border-radius: 16px; padding: 32px; margin-bottom: 24px;">

      <div style="text-align: center; margin-bottom: 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 16px auto;">
          <tr>
            <td width="56" height="56" valign="middle" align="center" style="width: 56px; height: 56px; background: #065f46; border-radius: 50%; text-align: center; vertical-align: middle; line-height: 56px;">
              <span style="font-size: 30px; color: #6ee7b7; line-height: 56px; vertical-align: middle; display: inline-block;">&#10003;</span>
            </td>
          </tr>
        </table>
        <h2 style="color: #ffffff; font-size: 22px; margin: 0 0 8px 0;">Pedido confirmado</h2>
        <p style="color: #a3a3a3; font-size: 14px; margin: 0;">Gracias, ${payload.name}. Tu pedido ha sido registrado correctamente.</p>
      </div>

      <div style="background: rgba(10, 10, 10, 0.6); border: 1px solid #404040; border-radius: 10px; padding: 16px; margin-bottom: 24px; text-align: center;">
        <p style="color: #a3a3a3; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 4px 0;">Número de pedido</p>
        <p style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: 0.05em;">#${payload.orderId}</p>
      </div>

      <p style="color: #737373; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Productos</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 8px 0; color: #525252; font-size: 12px; border-bottom: 1px solid #404040;">Producto</th>
            <th style="text-align: center; padding: 8px 0; color: #525252; font-size: 12px; border-bottom: 1px solid #404040;">Cant.</th>
            <th style="text-align: right; padding: 8px 0; color: #525252; font-size: 12px; border-bottom: 1px solid #404040;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td colspan="2" style="padding: 8px 0; color: #a3a3a3; text-align: right;">Subtotal:</td>
          <td style="padding: 8px 0; color: #a3a3a3; text-align: right;">${payload.subtotal.toFixed(2)}€</td>
        </tr>
        ${discountRow}
        ${shippingRow}
        <tr>
          <td colspan="2" style="padding: 12px 0; color: #ffffff; font-weight: 700; font-size: 18px; text-align: right; border-top: 1px solid #404040;">Total:</td>
          <td style="padding: 12px 0; color: #ffffff; font-weight: 700; font-size: 18px; text-align: right; border-top: 1px solid #404040;">${payload.finalPrice.toFixed(2)}€</td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #404040;">
        <p style="color: #737373; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;">Entrega</p>
        <p style="color: #e5e5e5; font-size: 14px; margin: 0;">${deliveryLabel}</p>
      </div>

    </div>

    <div style="background: rgba(38, 38, 38, 0.85); border: 1px solid #404040; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <p style="color: #a3a3a3; font-size: 13px; margin: 0 0 8px 0;">Nos pondremos en contacto contigo para confirmar tu pedido y coordinar la entrega.</p>
      <p style="color: #737373; font-size: 12px; margin: 0;">Si tienes alguna duda, escríbenos a <a href="mailto:cbdrexstore@gmail.com" style="color: #34d399; text-decoration: none;">cbdrexstore@gmail.com</a></p>
    </div>

    <p style="color: #737373; font-size: 12px; text-align: center; margin: 0;">
      CBDREX &mdash; Cannabis Legal Premium
    </p>
  </div>
</body>
</html>`;
}

function buildInternalEmailHtml(payload: EmailOrderPayload): string {
  const itemsRows = payload.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #404040; color: #d4d4d4;">${item.name}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #404040; color: #d4d4d4; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #404040; color: #d4d4d4; text-align: right;">${item.unitPrice.toFixed(2)}€</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #404040; color: #d4d4d4; text-align: right;">${item.total.toFixed(2)}€</td>
      </tr>`
    )
    .join("");

  const discountRow =
    payload.discount > 0
      ? `<tr>
          <td colspan="3" style="padding: 8px 0; color: #34d399; text-align: right;">Descuento:</td>
          <td style="padding: 8px 0; color: #34d399; text-align: right;">-${payload.discount.toFixed(2)}€</td>
        </tr>`
      : "";

  const shippingRow =
    payload.shipping > 0
      ? `<tr>
          <td colspan="3" style="padding: 8px 0; color: #a3a3a3; text-align: right;">Envío:</td>
          <td style="padding: 8px 0; color: #a3a3a3; text-align: right;">+${payload.shipping.toFixed(2)}€</td>
        </tr>`
      : `<tr>
          <td colspan="3" style="padding: 8px 0; color: #a3a3a3; text-align: right;">Envío:</td>
          <td style="padding: 8px 0; color: #34d399; text-align: right;">Gratis</td>
        </tr>`;

  const shippingSection =
    payload.deliveryMethod === "Envío" ? shippingRow : "";

  const notesSection = payload.notes.trim()
    ? `<div style="background: rgba(26, 26, 26, 0.7); border: 1px solid #404040; border-radius: 8px; padding: 16px; margin-top: 24px;">
        <p style="color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;">Notas del cliente</p>
        <p style="color: #e5e5e5; margin: 0;">${payload.notes}</p>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Nuevo pedido #${payload.orderId}</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 15%, #2a2a2a 30%, #3a3a3a 45%, #4a4a4a 60%, #5a5a5a 75%, #6a6a6a 90%, #7a7a7a 100%); font-family: 'Inter', -apple-system, sans-serif; color: #e5e5e5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <div style="text-align: center; margin-bottom: 40px;">
      <img src="${LOGO_URL}" alt="CBDREX" style="max-width: 180px; height: auto; margin: 0 auto;" />
    </div>

    <div style="background: rgba(38, 38, 38, 0.85); border: 1px solid #404040; border-radius: 16px; padding: 32px; margin-bottom: 24px;">
      <div style="text-align: center; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #404040;">
        <p style="color: #a3a3a3; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 4px 0;">Nuevo Pedido</p>
        <h2 style="color: #ffffff; font-size: 22px; margin: 0 0 12px 0;">#${payload.orderId}</h2>
        <div style="background: #fef3c7; color: #92400e; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block;">
          Pendiente de confirmación
        </div>
      </div>

      <div style="display: grid; gap: 16px; margin-bottom: 24px;">
        <div style="background: rgba(10, 10, 10, 0.6); border: 1px solid #404040; border-radius: 10px; padding: 16px;">
          <p style="color: #a3a3a3; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Datos del cliente</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #737373; padding: 4px 0; width: 100px; font-size: 14px;">Nombre</td>
              <td style="color: #e5e5e5; padding: 4px 0; font-weight: 600;">${payload.name}</td>
            </tr>
            <tr>
              <td style="color: #737373; padding: 4px 0; font-size: 14px;">Email</td>
              <td style="color: #e5e5e5; padding: 4px 0; font-weight: 600;">${payload.email}</td>
            </tr>
            <tr>
              <td style="color: #737373; padding: 4px 0; font-size: 14px;">Teléfono</td>
              <td style="color: #e5e5e5; padding: 4px 0; font-weight: 600;">${payload.phone}</td>
            </tr>
            <tr>
              <td style="color: #737373; padding: 4px 0; font-size: 14px;">Entrega</td>
              <td style="color: #e5e5e5; padding: 4px 0; font-weight: 600;">${payload.deliveryMethod}</td>
            </tr>
          </table>
        </div>
      </div>

      <p style="color: #737373; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Productos</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 8px 0; color: #525252; font-size: 12px; border-bottom: 1px solid #404040;">Producto</th>
            <th style="text-align: center; padding: 8px 0; color: #525252; font-size: 12px; border-bottom: 1px solid #404040;">Cant.</th>
            <th style="text-align: right; padding: 8px 0; color: #525252; font-size: 12px; border-bottom: 1px solid #404040;">Precio</th>
            <th style="text-align: right; padding: 8px 0; color: #525252; font-size: 12px; border-bottom: 1px solid #404040;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td colspan="3" style="padding: 8px 0; color: #a3a3a3; text-align: right;">Subtotal:</td>
          <td style="padding: 8px 0; color: #a3a3a3; text-align: right;">${payload.subtotal.toFixed(2)}€</td>
        </tr>
        ${discountRow}
        ${shippingSection}
        <tr>
          <td colspan="3" style="padding: 12px 0; color: #ffffff; font-weight: 700; font-size: 18px; text-align: right; border-top: 1px solid #404040;">Total:</td>
          <td style="padding: 12px 0; color: #ffffff; font-weight: 700; font-size: 18px; text-align: right; border-top: 1px solid #404040;">${payload.finalPrice.toFixed(2)}€</td>
        </tr>
      </table>

      ${notesSection}
    </div>

    <p style="color: #737373; font-size: 12px; text-align: center; margin: 0;">
      CBDREX &mdash; Cannabis Legal Premium &mdash; cbdrexstore@gmail.com
    </p>
  </div>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const payload: EmailOrderPayload = await req.json();

    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailAppPassword = Deno.env.get("GMAIL_APP_PASSWORD");

    if (!gmailUser || !gmailAppPassword) {
      console.warn("Gmail SMTP credentials not configured, skipping email");
      return new Response(JSON.stringify({ ok: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const clientHtml = buildClientEmailHtml(payload);
    const internalHtml = buildInternalEmailHtml(payload);

    await Promise.all([
      transporter.sendMail({
        from: `"CBDREX" <${gmailUser}>`,
        to: payload.email,
        subject: `Confirmación de pedido #${payload.orderId}`,
        html: clientHtml,
      }),
      transporter.sendMail({
        from: `"CBDREX Pedidos" <${gmailUser}>`,
        to: "cbdrexstore@gmail.com",
        subject: `Nuevo pedido #${payload.orderId}`,
        html: internalHtml,
      }),
    ]);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-order-email error:", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
