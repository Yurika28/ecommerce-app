import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get('limit') ?? '194'
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}`)
  const data = await res.json()
  return NextResponse.json(data)
}
