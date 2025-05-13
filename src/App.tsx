// App.tsx
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import Carousel from './Carousel'
import ShoppingSection from './ShoppingSection'
import About from './About'
import type { CartValues } from './types/fetching'
import Services from './Services'
import Contact from './Contact'
import Cart from './Cart'


function App() {
  const [cartItems, setCartItems] = useState<CartValues[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0)

  useEffect(() => {
    setCartTotalQuantity(
      cartItems.reduce((sum, item) => sum + item.quantity, 0)
    )
  }, [cartItems])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(r => {
        if (!r.ok) throw new Error('Network response was not ok')
        return r.json()
      })
      .then(setProducts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])


  return (
    <Routes>
      {/* layout that displays on every page */}
      <Route
        path="/"
        element={<Layout cartTotalQuantity={cartTotalQuantity} />}
      >
        <Route
          index
          element={
            <>
              <Carousel />
              <ShoppingSection
                products={products}
                loading={loading}
                error={error}
                setCartItems={setCartItems}
              />
            </>
          }
        />

        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="cart"
          element={
            <Cart
              cartItems={cartItems}/>} />
        </Route>
        {/* error route */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-4xl font-bold">404 Not Found</h1>
              <p className="mt-4 text-lg">The page you are looking for does not exist.</p>
            </div>
          }
        />
    </Routes>
  )
}

export default App
