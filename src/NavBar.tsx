import cart from "../public/cart.svg";
import { Link } from "react-router-dom";
import shopIcon from "../public/odin-shop-icon.png";

type NavBarProps = {
  cartTotalQuantity: number
}

export default function NavBar({ cartTotalQuantity }: NavBarProps) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/" className="text-white no-underline">
        <img src={shopIcon} className="object-contain w-24"></img>
        </Link>
      </div>
      <ul className="navbar__links items-center gap-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link to="/services" className="hover:underline">
            Services
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </li>
        <li className="relative inline-block">
          <Link to="/cart">
            <img
              src={cart}
              className="w-12 bg-amber-300 rounded-md"
              alt="Cart"
            />
          </Link>
          <span
            className="
              absolute top-0 right-0
              -translate-y-1/2 translate-x-1/2
              bg-black text-white text-sm
              rounded-full w-6 h-6 flex
              items-center justify-center
            "
          >
            {cartTotalQuantity > 99 ? (
              <span className="text-xs">99+</span>
            ) : (
              cartTotalQuantity
            )}
          </span>
        </li>
      </ul>
    </nav>
  );
}
