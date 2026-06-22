import { connectDB } from '@/lib/mongodb'
import PawProduct from '@/lib/model/pawproduct'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params
  const body = await req.json()
  const product = await PawProduct.findByIdAndUpdate(id, body, { returnDocument: 'after' })
  return NextResponse.json(product)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params
  await PawProduct.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
