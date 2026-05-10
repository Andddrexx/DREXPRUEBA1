import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
  phone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  finalPrice: number;
  notes: string;
  deliveryMethod: string;
}

function buildEmailHtml(payload: EmailOrderPayload): string {
  const itemsRows = payload.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #d4d4d4;">${item.name}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #d4d4d4; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #d4d4d4; text-align: right;">${item.unitPrice.toFixed(2)}€</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #d4d4d4; text-align: right;">${item.total.toFixed(2)}€</td>
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
    ? `<div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; margin-top: 24px;">
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
<body style="margin: 0; padding: 0; background: #0a0a0a; font-family: 'Inter', -apple-system, sans-serif; color: #e5e5e5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 8px 0;">CBDREX</h1>
      <p style="color: #737373; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 0.15em;">Cannabis Legal Premium</p>
    </div>

    <div style="background: #171717; border: 1px solid #262626; border-radius: 16px; padding: 32px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #262626;">
        <div>
          <p style="color: #737373; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 4px 0;">Nuevo Pedido</p>
          <h2 style="color: #ffffff; font-size: 22px; margin: 0;">#${payload.orderId}</h2>
        </div>
        <div style="background: #fef3c7; color: #92400e; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
          Pendiente de confirmación
        </div>
      </div>

      <div style="display: grid; gap: 16px; margin-bottom: 24px;">
        <div style="background: #0a0a0a; border: 1px solid #262626; border-radius: 10px; padding: 16px;">
          <p style="color: #737373; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Datos del cliente</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #737373; padding: 4px 0; width: 100px; font-size: 14px;">Nombre</td>
              <td style="color: #e5e5e5; padding: 4px 0; font-weight: 600;">${payload.name}</td>
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
            <th style="text-align: left; padding: 8px 0; color: #525252; font-size: 12px; border-bottom: 1px solid #262626;">Producto</th>
            <th style="text-align: center; padding: 8px 0; color: #525252; font-size: 12px; border-bottom: 1px solid #262626;">Cant.</th>
            <th style="text-align: right; padding: 8px 0; color: #525252; font-size: 12px; border-bottom: 1px solid #262626;">Precio</th>
            <th style="text-align: right; padding: 8px 0; color: #525252; font-size: 12px; border-bottom: 1px solid #262626;">Total</th>
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
          <td colspan="3" style="padding: 12px 0; color: #ffffff; font-weight: 700; font-size: 18px; text-align: right; border-top: 1px solid #262626;">Total:</td>
          <td style="padding: 12px 0; color: #ffffff; font-weight: 700; font-size: 18px; text-align: right; border-top: 1px solid #262626;">${payload.finalPrice.toFixed(2)}€</td>
        </tr>
      </table>

      ${notesSection}
    </div>

    <p style="color: #525252; font-size: 12px; text-align: center; margin: 0;">
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

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY not configured, skipping email");
      return new Response(JSON.stringify({ ok: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailHtml = buildEmailHtml(payload);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "CBDREX Pedidos <onboarding@resend.dev>",
        to: ["cbdrexstore@gmail.com"],
        subject: `Nuevo pedido #${payload.orderId}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(JSON.stringify({ ok: false, error: err }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify({ ok: true, data }), {
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
