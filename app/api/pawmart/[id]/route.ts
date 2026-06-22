import { connectDB } from '@/lib/mongodb'
import PawProduct from '@/lib/model/pawproduct'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const body = await req.json()
  const product = await PawProduct.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json(product)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB()
  await PawProduct.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}