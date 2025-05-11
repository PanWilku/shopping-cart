import { CartValues } from "./types/fetching";

type CartProps = {
    cartItems: CartValues[]
}


function Cart( {cartItems}: CartProps ) {
    return (
        <div className="flex w-full h-full border-b-3 items-center justify-center min-h-screen bg-amber-300">
            <div className="flex flex-col flex-grow w-3/4 h-full bg-white">
                <div className="flex w-full p-24 text-4xl font-bold border-2">
                    Your Order
                </div>
                <div className="flex flex-col w-full p-4 h-full text-2xl">
                    <div className="flex w-full border-2 ">
                        ordered items go here
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-grow w-1/4 h-full border-l-3">
                <div className="flex w-full p-4 text-2xl">
                    Items price:
                </div>
                <div className="flex w-full p-4 text-2xl">
                    Shipping:
                </div>
                <div className="flex w-full p-4 text-2xl">
                    Total:
                </div>
                <div className="flex w-full h-full">
                    <div className="flex w-full">
                        <button className="flex w-full h-16 rounded-md items-center p-4 m-8 text-2xl justify-center border-2">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cart;