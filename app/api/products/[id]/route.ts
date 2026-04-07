import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  const data = await res.json()
  return NextResponse.json(data)
}
