'use client'
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { products as initialProducts, Product } from '@/lib/data'

type ProductStore = {
  products: Product[]
  updateProduct: (updated: Product) => void
  addProduct: (p: Product) => void
  deleteProduct: (id: string) => void
  refreshProducts: () => Promise<void>
}

const ProductContext = createContext<ProductStore>({
  products: initialProducts,
  updateProduct: () => {},
  addProduct: () => {},
  deleteProduct: () => {},
  refreshProducts: async () => {},
})

export function ProductProvider({ children }: { children: ReactNode }) {

  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [hydrated, setHydrated] = useState(false)

  // ✅ Fetch from MongoDB
  const refreshProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/pawmart')
      const data = await res.json()
      const normalized = data.map((p: any) => ({
        ...p,
        id: p._id?.toString() || p.id,
      }))
      setProducts(normalized)
    } catch (err) {
      console.error('Failed to refresh products:', err)
    }
  }, [])

  // ✅ Load on mount
  useEffect(() => {
    refreshProducts().finally(() => setHydrated(true))
  }, [])

  // ✅ Update in MongoDB
  const updateProduct = useCallback(async (updated: Product) => {
    try {
      const id = updated._id || updated.id
      await fetch(`/api/pawmart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      await refreshProducts()
    } catch (err) {
      console.error('Failed to update product:', err)
    }
  }, [refreshProducts])

  // ✅ Add to MongoDB
  const addProduct = useCallback(async (p: Product) => {
    try {
      const res = await fetch('/api/pawmart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      })
      const saved = await res.json()
      setProducts(prev => [{ ...p, id: saved._id?.toString() }, ...prev])
    } catch (err) {
      console.error('Failed to add product:', err)
    }
  }, [])

  // ✅ Delete from MongoDB
  const deleteProduct = useCallback(async (id: string) => {
    try {
      const product = products.find(p => p.id === id)
      await fetch(`/api/pawmart/${product?._id || id}`, {
        method: 'DELETE',
      })
      await refreshProducts()
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }, [products, refreshProducts])

  return (
  <ProductContext.Provider value={{ products, updateProduct, addProduct, deleteProduct, refreshProducts }}>
    {hydrated ? children : null}
  </ProductContext.Provider>
)
}

export const useProducts = () => useContext(ProductContext)