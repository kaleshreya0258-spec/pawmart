import { connectDB } from '@/lib/mongodb'
import PawProduct from '@/lib/model/pawproduct'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectDB()
  const products = await PawProduct.find()
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const product = await PawProduct.create(body)
  return NextResponse.json(product)
}