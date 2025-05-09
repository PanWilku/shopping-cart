import { useState, useEffect } from 'react'
import NavBar from './NavBar'
import Carousel from './Carousel'
import ShoppingSection from './ShoppingSection'
import type { Fetching } from './types/fetching'
import Footer from './Footer'


export interface CartValues {
  id: number
  title: string
  price: number
  quantity: number
}

function App() {

    const [cartItems, setCartItems] = useState<CartValues[]>([]);
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [cartTotalQuantity, setCartTotalQuantity] = useState<number>(0)

    useEffect(() => {
      const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartTotalQuantity(total);
    }, [cartItems]);

  useEffect(() => {
  
    fetch('https://fakestoreapi.com/products')
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((response) => {
      setProducts(response);
    })
    .catch((error) => {
      setError(error)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])


  return (
    <>
      <div className='flex flex-col max-w-[1920px] w-full bg-amber-200 items-center min-h-screen'>
        <NavBar cartTotalQuantity={cartTotalQuantity}></NavBar>
        <Carousel></Carousel>
        <ShoppingSection products={products} loading={loading} error={error} setCartItems={setCartItems}></ShoppingSection>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
