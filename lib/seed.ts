import { connectDB } from './mongodb'
import PawProduct from './model/pawproduct'
import { products } from './data'

async function seed() {
  await connectDB()
  await PawProduct.deleteMany({})
  await PawProduct.insertMany(products)
  console.log('✅ Products seeded successfully!')
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})