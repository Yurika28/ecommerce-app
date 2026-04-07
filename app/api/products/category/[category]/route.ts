import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params
  const res = await fetch(`https://dummyjson.com/products/category/${category}`)
  const data = await res.json()
  return NextResponse.json(data)
}
