import mongoose from 'mongoose'

const PawProductSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  category:    { type: String, required: true },
  stock:       { type: Number, default: 0 },
  rating:      { type: Number, default: 0 },
  reviews:     { type: Number, default: 0 },
  featured:    { type: Boolean, default: false },
  description: { type: String, default: '' },
  image:       { type: String, default: '' },
})

export default mongoose.models.PawProduct || mongoose.model('PawProduct', PawProductSchema)