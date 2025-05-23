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

    function handleMinus(item: itemProps) {
        const newItems = cartItems.map((cartItem) => {
            if (cartItem.id === item.id && cartItem.quantity > 1) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity - 1,
                };
            }
            return cartItem;
        })
        setCartItems(newItems);
    }

    function handlePlus(item: itemProps) {
        const newItems = cartItems.map((cartItem) => {
            if (cartItem.id === item.id && cartItem.quantity < 999) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                };
            }
            return cartItem;
        })
        setCartItems(newItems);
    }


    return (
        <div className="flex md:flex-row flex-col w-full h-screen items-center justify-center min-h-screen bg-gray-200">
            <div className="flex flex-col flex-grow w-full md:w-3/4 h-screen bg-gray-200 overflow-y-auto">
                <div className="flex w-full p-24 text-4xl font-bold">
                    Your Order
                </div>
                <div className="flex w-full justify-between h-16 text-2xl bg-gray-800 text-white">
                    <div className="flex md:w-1/4 flex-1 items-center justify-center">Name</div>
                    <div className="flex md:w-1/4 flex-1 items-center justify-end">Quantity</div>
                    <div className="flex md:w-1/4 flex-1 items-center justify-center">Price</div>
                    <div className="flex md:w-1/4 flex-1 items-center justify-center"></div>
                </div>
                <div className="flex flex-col w-full p-4 h-full md:text-2xl text-xl">
                    {cartItems.map((item, i) => (
                        <div key={i} className="flex w-full p-4 items-center border-b-2 min-h-48 gap-4 md:gap-0">
                            <div className="flex lg:w-1/2 flex-1 gap-4 items-center">
                                <img src={item.image} className="lg:w-32 w-26"></img>
                                <p className="line-clamp-4">{item.title}</p>
                            </div>
                            <div className="flex flex-1">
                                <div className="flex w-full justify-end items-center gap-2">
                                    <button  onClick={() => handleMinus(item)} className="w-6 h-6 flex justify-center items-center border-1 border-black hover:bg-gray-800 hover:text-white
                                     transform duration-500 ease-in-out cursor-pointer">-</button>
                                    {item.quantity}
                                    <button onClick={() => handlePlus(item)} className="w-6 h-6 flex justify-center items-center border-1 border-black hover:bg-gray-800 hover:text-white
                                     transform duration-500 ease-in-out cursor-pointer">+</button>
                                </div>
                            </div>
                            <div className="flex flex-1 justify-center gap-4">
                                <p>{(item.price * item.quantity).toFixed(2)}$</p>
                            </div>
                            <div className="flex flex-1 justify-center gap-4">
                                <button onClick={() => handleDeleteItem(item)} className="bg-red-400 lg:p-4 p-2 rounded-md cursor-pointer
                                 hover:bg-red-500 transform transition duration-500 ease-in-out">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex bg-amber-300 flex-col flex-grow w-full md:w-1/3 lg:w-1/4 h-full">
            {/* Items price */}
            <div className="flex flex-row w-full p-4 text-xl md:text-2xl gap-2 md:gap-4">
                <div className="flex-none md:flex-1 md:justify-end flex justify-between">
                <p className="text-right">Items price:</p>
                </div>
                <div className="flex-1 flex justify-end lg:items-center">
                <p className="text-right">{totalPrice.toFixed(2)}$</p>
                </div>
            </div>

            {/* Shipping */}
            <div className="flex flex-row w-full p-4 text-xl md:text-2xl gap-2 md:gap-4">
                <div className="flex-none md:flex-1 md:justify-end flex justify-between">
                <p className="text-right">Shipping:</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                <p className="text-right">
                    {shipping === 0 ? "FREE" : `${shipping}$`}
                </p>
                </div>
            </div>

            {/* Total */}
            <div className="flex flex-row w-full p-4 text-xl md:text-2xl gap-2 md:gap-4">
                <div className="flex-none md:flex-1 md:justify-end flex justify-between">
                <p className="text-right">Total:</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                <p className="text-right">
                    {(totalPrice + shipping).toFixed(2)}$
                </p>
                </div>
            </div>

            {/* Place Order button */}
            <div className="p-4">
                <button
                className="
                    w-full h-16 rounded-md text-2xl
                    border-2 border-gray-800
                    hover:bg-gray-800 hover:text-white
                    transition duration-500 ease-in-out cursor-pointer
                ">
                Place Order
                </button>
            </div>
            </div>

        </div>
    );
}
export default Cart;