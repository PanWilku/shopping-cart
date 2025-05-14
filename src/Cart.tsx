import { CartValues } from "./types/fetching";
import { useEffect, useState } from "react";

type CartProps = {
    cartItems: CartValues[],
    setCartItems: React.Dispatch<React.SetStateAction<CartValues[]>>
}

type itemProps = {
    id: number,
    title: string,
    price: number,
    quantity: number,
    image: string
}


function Cart( {cartItems, setCartItems}: CartProps ) {

    const [totalPrice, setTotalPrice] = useState(0);
    const [shipping, setShipping] = useState(0);

    useEffect(() => {
        //reduce because its not async like cartItems.map and setTotalPrice
        const sum = cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setTotalPrice(sum);
        setShipping(sum > 100 ? 0 : 15);
      }, [cartItems]);

    function handleDeleteItem(item: itemProps) {
        //filter out the item from cartItems
        const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        //set the new cartItems
        setCartItems(newCartItems);
    }


    return (
        <div className="flex w-full h-full border-b-3 items-center justify-center min-h-screen bg-amber-300">
            <div className="flex flex-col flex-grow w-3/4 h-full bg-white">
                <div className="flex w-full p-24 text-4xl font-bold">
                    Your Order
                </div>
                <div className="flex w-full justify-between h-16 text-2xl bg-gray-800 text-white">
                    <div className="flex w-1/2 items-center justify-center">Name</div>
                    <div className="flex w-1/5 items-center justify-end">Quantity</div>
                    <div className="flex w-1/5 items-center justify-center">Price</div>
                    <div className="flex w-1/10 items-center justify-center"></div>
                </div>
                <div className="flex flex-col w-full p-4 h-full text-2xl">
                    {cartItems.map((item, i) => (
                        <div key={i} className="flex w-full p-4 items-center border-b-2 min-h-48">
                            <div className="flex w-1/2 gap-4 items-center">
                                <img src={item.image} className="w-32"></img>
                                {item.title}
                            </div>
                            <div className="flex w-1/5 justify-end">
                                <p>{item.quantity}</p>
                            </div>
                            <div className="flex w-1/5 justify-center gap-4">
                                <p>{item.price * item.quantity}$</p>
                            </div>
                            <div className="flex w-1/10 justify-center gap-4">
                                <button onClick={() => handleDeleteItem(item)} className="bg-red-400 p-4 rounded-md cursor-pointer hover:bg-red-500 transform transition duration-500 ease-in-out">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col flex-grow w-1/4 h-full border-l-3">
            <div className="flex w-full p-4 text-2xl">
                <div className="flex w-1/2 justify-end">
                    <p>Items price:</p>
                </div>
                <div className="flex w-1/2 justify-end">
                    <p>{totalPrice.toFixed(2)}$</p>
                </div>
            </div>
            <div className="flex w-full p-4 text-2xl">
                <div className="flex w-1/2 justify-end">
                    <p>Shipping:</p>
                </div>
                <div className="flex w-1/2 justify-end">
                    <p>{shipping === 0 ? "FREE" : `${shipping}$`}</p>
                </div>
            </div>
            <div className="flex w-full p-4 text-2xl">
                <div className="flex w-1/2 justify-end">
                    <p>Total:</p>
                </div>
                <div className="flex w-1/2 justify-end">
                    <p>{(totalPrice + shipping).toFixed(2)}$</p>
                </div>
            </div>
                <div className="flex w-full h-full">
                    <div className="flex w-full">
                        <button className="flex w-full h-16 rounded-md items-center p-4 m-8 text-2xl
                         justify-center border-2 hover:bg-gray-800 hover:text-white transform
                          transition duration-500 ease-in-out">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cart;