import { useState } from 'react'
import ItemCard from './Card'
import NavBar from './NavBar'

function App() {

  return (
    <>
      <div className='flex flex-col max-w-[1920px] w-full bg-amber-200 items-center h-screen'>
        <NavBar></NavBar>
      </div>
    </>
  )
}

export default App
