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
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; color: #374151; font-size: 14px;">${item.name}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: center; font-size: 14px;">${item.quantity}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: right; font-size: 14px; font-weight: 600;">${item.total.toFixed(2)}&euro;</td>
      </tr>`
    )
    .join("");

  const discountRow =
    payload.discount > 0
      ? `<tr>
          <td colspan="2" style="padding: 8px; color: #059669; text-align: right; font-size: 14px;">Descuento aplicado:</td>
          <td style="padding: 8px; color: #059669; text-align: right; font-size: 14px; font-weight: 600;">-${payload.discount.toFixed(2)}&euro;</td>
        </tr>`
      : "";

  const shippingRow =
    payload.deliveryMethod === "Env&iacute;o" || payload.deliveryMethod === "Envío"
      ? payload.shipping > 0
        ? `<tr>
            <td colspan="2" style="padding: 8px; color: #6b7280; text-align: right; font-size: 14px;">Env&iacute;o:</td>
            <td style="padding: 8px; color: #6b7280; text-align: right; font-size: 14px;">+${payload.shipping.toFixed(2)}&euro;</td>
          </tr>`
        : `<tr>
            <td colspan="2" style="padding: 8px; color: #6b7280; text-align: right; font-size: 14px;">Env&iacute;o:</td>
            <td style="padding: 8px; color: #059669; text-align: right; font-size: 14px; font-weight: 600;">Gratis</td>
          </tr>`
      : "";

  const deliveryLabel =
    payload.deliveryMethod === "Envío" || payload.deliveryMethod === "Env&iacute;o"
      ? "Env&iacute;o a domicilio (3-5 d&iacute;as laborables)"
      : "Entrega en mano / Recogida (24-48h)";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Confirmaci&oacute;n de pedido #${payload.orderId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #111827;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <img src="${LOGO_URL}" alt="CBDREX" width="160" style="max-width: 160px; height: auto; display: block; border-radius: 8px;" />
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">

                <!-- Green header -->
                <tr>
                  <td align="center" style="background-color: #ecfdf5; padding: 32px 32px 28px 32px; border-bottom: 1px solid #d1fae5;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                      <tr>
                        <td width="52" height="52" align="center" valign="middle" style="width: 52px; height: 52px; background-color: #059669; border-radius: 50%; text-align: center;">
                          <span style="font-size: 26px; color: #ffffff; line-height: 52px; display: block;">&#10003;</span>
                        </td>
                      </tr>
                    </table>
                    <h1 style="color: #065f46; font-size: 22px; font-weight: 700; margin: 16px 0 8px 0; text-align: center;">Pedido confirmado</h1>
                    <p style="color: #047857; font-size: 15px; margin: 0; text-align: center;">Gracias, ${payload.name}. Tu pedido ha sido registrado correctamente.</p>
                  </td>
                </tr>

                <!-- Order number -->
                <tr>
                  <td style="padding: 24px 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td align="center" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px;">
                          <p style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 6px 0; font-weight: 600;">N&uacute;mero de pedido</p>
                          <p style="color: #111827; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: 0.04em;">#${payload.orderId}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Products -->
                <tr>
                  <td style="padding: 0 32px 24px 32px;">
                    <p style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; margin: 0 0 12px 0;">Productos</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <thead>
                        <tr style="background-color: #f9fafb;">
                          <th style="text-align: left; padding: 10px 8px; color: #6b7280; font-size: 12px; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Producto</th>
                          <th style="text-align: center; padding: 10px 8px; color: #6b7280; font-size: 12px; font-weight: 600; border-bottom: 2px solid #e5e7eb; width: 50px;">Cant.</th>
                          <th style="text-align: right; padding: 10px 8px; color: #6b7280; font-size: 12px; font-weight: 600; border-bottom: 2px solid #e5e7eb; width: 80px;">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsRows}
                      </tbody>
                    </table>

                    <!-- Totals -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 8px;">
                      <tr>
                        <td colspan="2" style="padding: 8px; color: #6b7280; text-align: right; font-size: 14px;">Subtotal:</td>
                        <td style="padding: 8px; color: #6b7280; text-align: right; font-size: 14px; width: 80px;">${payload.subtotal.toFixed(2)}&euro;</td>
                      </tr>
                      ${discountRow}
                      ${shippingRow}
                      <tr>
                        <td colspan="2" style="padding: 12px 8px 8px 8px; color: #111827; font-weight: 700; font-size: 18px; text-align: right; border-top: 2px solid #e5e7eb;">Total:</td>
                        <td style="padding: 12px 8px 8px 8px; color: #111827; font-weight: 700; font-size: 18px; text-align: right; border-top: 2px solid #e5e7eb; width: 80px;">${payload.finalPrice.toFixed(2)}&euro;</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Delivery -->
                <tr>
                  <td style="padding: 0 32px 32px 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px;">
                          <p style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin: 0 0 6px 0;">Entrega</p>
                          <p style="color: #065f46; font-size: 14px; font-weight: 600; margin: 0;">${deliveryLabel}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Info box -->
          <tr>
            <td style="padding-top: 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px 24px;">
                    <p style="color: #374151; font-size: 14px; margin: 0 0 8px 0;">Nos pondremos en contacto contigo para confirmar tu pedido y coordinar la entrega.</p>
                    <p style="color: #6b7280; font-size: 13px; margin: 0;">Si tienes alguna duda, escr&iacute;benos a <a href="mailto:cbdrexstore@gmail.com" style="color: #059669; text-decoration: none; font-weight: 600;">cbdrexstore@gmail.com</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 0 0 0;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">CBDREX &mdash; Cannabis Legal Premium</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildInternalEmailHtml(payload: EmailOrderPayload): string {
  const itemsRows = payload.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; color: #374151; font-size: 14px;">${item.name}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: center; font-size: 14px;">${item.quantity}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: right; font-size: 14px;">${item.unitPrice.toFixed(2)}&euro;</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: right; font-size: 14px; font-weight: 600;">${item.total.toFixed(2)}&euro;</td>
      </tr>`
    )
    .join("");

  const discountRow =
    payload.discount > 0
      ? `<tr>
          <td colspan="3" style="padding: 8px; color: #059669; text-align: right; font-size: 14px;">Descuento:</td>
          <td style="padding: 8px; color: #059669; text-align: right; font-size: 14px; font-weight: 600;">-${payload.discount.toFixed(2)}&euro;</td>
        </tr>`
      : "";

  const shippingRow =
    payload.shipping > 0
      ? `<tr>
          <td colspan="3" style="padding: 8px; color: #6b7280; text-align: right; font-size: 14px;">Env&iacute;o:</td>
          <td style="padding: 8px; color: #6b7280; text-align: right; font-size: 14px;">+${payload.shipping.toFixed(2)}&euro;</td>
        </tr>`
      : `<tr>
          <td colspan="3" style="padding: 8px; color: #6b7280; text-align: right; font-size: 14px;">Env&iacute;o:</td>
          <td style="padding: 8px; color: #059669; text-align: right; font-size: 14px; font-weight: 600;">Gratis</td>
        </tr>`;

  const shippingSection =
    payload.deliveryMethod === "Envío" || payload.deliveryMethod === "Env&iacute;o" ? shippingRow : "";

  const notesSection = payload.notes.trim()
    ? `<tr>
        <td style="padding: 0 32px 32px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 16px;">
                <p style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin: 0 0 8px 0;">Notas del cliente</p>
                <p style="color: #374151; font-size: 14px; margin: 0; white-space: pre-line;">${payload.notes}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Nuevo pedido #${payload.orderId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #111827;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <img src="${LOGO_URL}" alt="CBDREX" width="160" style="max-width: 160px; height: auto; display: block; border-radius: 8px;" />
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">

                <!-- Header -->
                <tr>
                  <td align="center" style="background-color: #fefce8; padding: 28px 32px; border-bottom: 1px solid #fde68a;">
                    <p style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; margin: 0 0 6px 0;">Nuevo Pedido</p>
                    <h1 style="color: #111827; font-size: 24px; font-weight: 800; margin: 0 0 14px 0;">#${payload.orderId}</h1>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                      <tr>
                        <td style="background-color: #fef3c7; color: #92400e; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid #fde68a;">
                          Pendiente de confirmaci&oacute;n
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Customer data -->
                <tr>
                  <td style="padding: 24px 32px 0 32px;">
                    <p style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; margin: 0 0 12px 0;">Datos del cliente</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px;">
                      <tr>
                        <td style="padding: 8px 16px; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6b7280; font-size: 13px; width: 90px;">Nombre</td>
                              <td style="color: #111827; font-size: 14px; font-weight: 600;">${payload.name}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 16px; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6b7280; font-size: 13px; width: 90px;">Email</td>
                              <td style="color: #111827; font-size: 14px; font-weight: 600;">${payload.email}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 16px; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6b7280; font-size: 13px; width: 90px;">Tel&eacute;fono</td>
                              <td style="color: #111827; font-size: 14px; font-weight: 600;">${payload.phone}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 16px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6b7280; font-size: 13px; width: 90px;">Entrega</td>
                              <td style="color: #111827; font-size: 14px; font-weight: 600;">${payload.deliveryMethod}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Products -->
                <tr>
                  <td style="padding: 24px 32px 0 32px;">
                    <p style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; margin: 0 0 12px 0;">Productos</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <thead>
                        <tr style="background-color: #f9fafb;">
                          <th style="text-align: left; padding: 10px 8px; color: #6b7280; font-size: 12px; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Producto</th>
                          <th style="text-align: center; padding: 10px 8px; color: #6b7280; font-size: 12px; font-weight: 600; border-bottom: 2px solid #e5e7eb; width: 50px;">Cant.</th>
                          <th style="text-align: right; padding: 10px 8px; color: #6b7280; font-size: 12px; font-weight: 600; border-bottom: 2px solid #e5e7eb; width: 70px;">Precio</th>
                          <th style="text-align: right; padding: 10px 8px; color: #6b7280; font-size: 12px; font-weight: 600; border-bottom: 2px solid #e5e7eb; width: 70px;">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsRows}
                      </tbody>
                    </table>

                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 8px;">
                      <tr>
                        <td colspan="3" style="padding: 8px; color: #6b7280; text-align: right; font-size: 14px;">Subtotal:</td>
                        <td style="padding: 8px; color: #6b7280; text-align: right; font-size: 14px; width: 70px;">${payload.subtotal.toFixed(2)}&euro;</td>
                      </tr>
                      ${discountRow}
                      ${shippingSection}
                      <tr>
                        <td colspan="3" style="padding: 12px 8px 8px 8px; color: #111827; font-weight: 700; font-size: 18px; text-align: right; border-top: 2px solid #e5e7eb;">Total:</td>
                        <td style="padding: 12px 8px 8px 8px; color: #111827; font-weight: 700; font-size: 18px; text-align: right; border-top: 2px solid #e5e7eb; width: 70px;">${payload.finalPrice.toFixed(2)}&euro;</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Notes -->
                ${notesSection}

                <tr><td style="padding: 24px;"></td></tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 0 0 0;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">CBDREX &mdash; Cannabis Legal Premium &mdash; cbdrexstore@gmail.com</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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
