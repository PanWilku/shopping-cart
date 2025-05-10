import { CartValues } from "./types/fetching";

type CartProps = {
    cartItems: CartValues[]
}


function Cart( {cartItems}: CartProps ) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-200">
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        </div>
    );
}
export default Cart;