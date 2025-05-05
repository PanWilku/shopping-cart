import cart from "../public/cart.svg";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">MyApp</div>
      <ul className="navbar__links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#cart">
          <img src={cart} className="w-12 bg-amber-300"></img></a></li>
      </ul>
    </nav>
  );
}
export default NavBar;