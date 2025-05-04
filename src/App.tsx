import { useState, useEffect } from 'react'
import NavBar from './NavBar'
import Carousel from './Carousel'
import ShoppingSection from './ShoppingSection'
import type { Fetching } from './types/fetching'

function App() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const fetchingData: Fetching = {
      products,
      loading,
      error
    }

    console.log(products)

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
        <NavBar></NavBar>
        <Carousel></Carousel>
        <ShoppingSection {...fetchingData}></ShoppingSection>
      </div>
    </>
  )
}

export default App
