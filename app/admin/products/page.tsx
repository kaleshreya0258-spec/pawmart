'use client'
import { useState } from 'react'
import { Product } from '@/lib/data'
import { useProducts } from '@/context/ProductContext'
import { Plus, Pencil, Trash2, Search, X, Star, ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/admin/PageHeader'
import { getCategoryEmoji } from '@/lib/data'

export default function AdminProductsPage() {
  const router = useRouter()
  const { products: items, addProduct, updateProduct, deleteProduct: deleteFromStore } = useProducts()
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<null | 'add' | Product>(null)
  const [form, setForm] = useState<Partial<Product>>({})
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [imageError, setImageError] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)

  const filtered = items.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const revokePreview = () => {
    if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview)
  }

  const openAdd = () => {
    setForm({ category: 'Dogs', featured: false, stock: 0, price: 0 })
    setModal('add')
    setImageError('')
    revokePreview()
    setImageFile(null)
    setImagePreview('')
  }

  const openEdit = (p: Product) => {
    setForm({ ...p })
    setModal(p)
    setImageError('')
    revokePreview()
    setImageFile(null)
    setImagePreview(p.image || '')
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setImageError('Please choose an image file (PNG, JPG, etc.)')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setImageError('Image is too large — please choose one under 2MB.')
      return
    }
    setImageError('')
    revokePreview()
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    revokePreview()
    setImageFile(null)
    setImagePreview('')
  }

  const saveProduct = async () => {
    setSaving(true)
    let imagePath = imagePreview && !imagePreview.startsWith('blob:') ? imagePreview : ''

    if (imageFile) {
      try {
        const fd = new FormData()
        fd.append('file', imageFile)
        fd.append('name', form.name || 'product')
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Upload failed')
        imagePath = data.path
        console.log('Image uploaded to:', imagePath)
      } catch (err) {
        console.error('Failed to upload image:', err)
        setImageError('Image upload failed — please try again.')
        setSaving(false)
        return
      }
    }

    const image = imagePath || `https://placehold.co/400x300/f97316/fff?text=${encodeURIComponent(form.name || 'Product')}`

    if (modal === 'add') {
      const newP: Product = {
        id: `p${Date.now()}`,
        name: form.name || 'New Product',
        category: form.category as Product['category'] || 'Dogs',
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        image,
        description: form.description || '',
        featured: form.featured || false,
        rating: 0, reviews: 0,
      }
      await addProduct(newP)
    } else {
      await updateProduct({ ...(modal as Product), ...form, image } as Product)
    }
    setSaving(false)
    setModal(null)
  }

  const closeModal = () => {
    revokePreview()
    setImageFile(null)
    setImagePreview('')
    setModal(null)
  }

  const deleteProduct = (id: string) => {
    deleteFromStore(id)
    setDeleteTarget(null)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Products"
        subtitle={`${items.length} products total`}
        action={
          <button onClick={openAdd} className="btn-primary">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        }
      />

      <div className="lg:hidden flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.back()} className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all" aria-label="Go back">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Products</h2>
            <p className="text-gray-500 text-xs">{items.length} total</p>
          </div>
        </div>
        <button onClick={openAdd} className="btn-primary text-xs py-2 px-3">
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      <div className="relative mb-4 md:mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input className="input pl-9" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="card p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
              {p.image
                ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                : getCategoryEmoji(p.category)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{p.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">{p.category}</span>
                <span className="text-gray-300">·</span>
                <span className={`text-xs font-medium ${p.stock < 15 ? 'text-red-500' : 'text-gray-500'}`}>{p.stock} in stock</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-gray-900">₹{p.price.toLocaleString()}</span>
                {p.featured && <span className="bg-green-100 text-green-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">Featured</span>}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              <button type="button" onClick={() => openEdit(p)} className="p-2 rounded-lg bg-blue-50 text-blue-600 active:scale-95 transition-transform" aria-label={`Edit ${p.name}`}>
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => setDeleteTarget(p.id)} className="p-2 rounded-lg bg-red-50 text-red-500 active:scale-95 transition-transform" aria-label={`Delete ${p.name}`}>
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Product</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Category</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium">Price</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium">Stock</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Rating</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Featured</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-base shrink-0 overflow-hidden">
                        {p.image
                          ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          : getCategoryEmoji(p.category)}
                      </div>
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{p.category}</td>
                  <td className="px-5 py-3 text-right font-semibold">₹{p.price.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={p.stock < 15 ? 'text-red-600 font-semibold' : 'text-gray-700'}>{p.stock}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> {p.rating}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {p.featured
                      ? <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">Yes</span>
                      : <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2.5 py-0.5 rounded-full">No</span>}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button type="button" onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" aria-label={`Edit ${p.name}`}>
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => setDeleteTarget(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" aria-label={`Delete ${p.name}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modal !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-bold text-gray-900">{modal === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
              <button onClick={closeModal} title="Close" aria-label="Close" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Product Name</label>
                <input className="input" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Premium Dog Kibble" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Product Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-orange-50 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0 text-3xl">
                    {imagePreview
                      ? <img src={imagePreview} alt="Product preview" className="w-full h-full object-cover" />
                      : <ImageIcon className="w-6 h-6 text-gray-300" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <label className="btn-secondary text-xs py-2 px-3 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" /> {imagePreview ? 'Change Image' : 'Upload Image'}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                      </label>
                      {imagePreview && (
                        <button type="button" onClick={removeImage} className="text-xs font-semibold text-red-500 hover:underline">
                          Remove
                        </button>
                      )}
                    </div>
                    {imageError
                      ? <p className="text-[11px] text-red-500 mt-1.5">{imageError}</p>
                      : imageFile
                        ? <p className="text-[11px] text-orange-500 mt-1.5">Image selected — will upload to Cloudinary on Save.</p>
                        : <p className="text-[11px] text-gray-400 mt-1.5">PNG or JPG, up to 2MB.</p>}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="product-category" className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select id="product-category" title="Product category" className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Product['category'] }))}>
                    {['Dogs', 'Cats', 'Birds', 'Fish', 'Small Pets'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" title="Price (in rupees)" placeholder="0" className="input" value={form.price || ''} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Stock</label>
                <input type="number" title="Stock quantity" placeholder="0" className="input" value={form.stock || ''} onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))} />
              </div>
              <div>
                <label htmlFor="product-description" className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea id="product-description" placeholder="Add a short description" className="input resize-none h-20" value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured || false} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-brand-500" />
                <span className="text-sm font-medium text-gray-700">Show in Bestsellers / Featured</span>
              </label>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100 sticky bottom-0 bg-white">
              <button onClick={closeModal} disabled={saving} className="btn-secondary flex-1 justify-center">Cancel</button>
              <button onClick={saveProduct} disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? 'Saving…' : modal === 'add' ? 'Add Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-sm p-6 text-center">
            <p className="text-4xl mb-3">🗑️</p>
            <h3 className="font-bold text-gray-900 mb-2">Delete this product?</h3>
            <p className="text-sm text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="btn-secondary flex-1 justify-center">Cancel</button>
              <button onClick={() => deleteProduct(deleteTarget)} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
