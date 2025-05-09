import cart from "../public/cart.svg";

type NavBarProps = {
  cartTotalQuantity: number
}

function NavBar({cartTotalQuantity}: NavBarProps) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">MyApp</div>
      <ul className="navbar__links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
        <li className="relative inline-block">
          <a href="#cart">
            <img
              src={cart}
              className="w-12 bg-amber-300 rounded-md"
              alt="Cart"
            />
          </a>
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
export default NavBar;