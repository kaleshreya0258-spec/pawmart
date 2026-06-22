import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const name = (formData.get('name') as string) || 'product'

    console.log('Upload called:', file?.name, 'size:', file?.size)

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
    if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'Not an image' }, { status: 400 })
    if (file.size > 2 * 1024 * 1024) return NextResponse.json({ error: 'Too large' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const dataUri = `data:${file.type};base64,${base64}`

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'pawmart',
      public_id: slugify(name),
      overwrite: true,
    })

    console.log('Cloudinary success:', result.secure_url)
    return NextResponse.json({ path: result.secure_url })

  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}