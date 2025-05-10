import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

interface LayoutProps {
  cartTotalQuantity: number
}

export default function Layout({ cartTotalQuantity }: LayoutProps) {
  return (
    <div className='flex flex-col max-w-[1920px] w-full bg-amber-200 items-center min-h-screen'>
      <NavBar cartTotalQuantity={cartTotalQuantity} />
      {/* The Outlet component will render the child routes */}
        <Outlet />
      <Footer />
    </div>
  )
}
