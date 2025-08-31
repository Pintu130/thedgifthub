import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: NextRequest) {
  try {
    const { items, customer } = await req.json()

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY env var" }, { status: 500 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    })

    const origin = req.headers.get("origin") || req.nextUrl.origin

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/cart?canceled=true`,
      customer_email: customer?.email,
      metadata: {
        name: customer?.name || "",
        address: customer?.address || "",
        city: customer?.city || "",
        country: customer?.country || "",
      },
      line_items: (items || []).map((i: any) => ({
        quantity: i.qty,
        price_data: {
          currency: "usd",
          product_data: {
            name: i.name,
            images: i.image ? [i.image] : undefined,
          },
          unit_amount: Math.round(Number(i.price) * 100),
        },
      })),
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU", "IN"] },
    })

    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Stripe error" }, { status: 500 })
  }
}
