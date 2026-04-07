import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'
import { CartItem } from '@/components/subComp/CartContext'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { items }: { items: CartItem[] } = await req.json()

  const lineItems = items.map(({ product, quantity }) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.title,
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=true`,
  })

  return NextResponse.json({ url: session.url })
}