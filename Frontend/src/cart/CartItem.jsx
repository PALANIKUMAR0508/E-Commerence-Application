import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  addToCart,
  removeErrors,
  removeItemFromCart,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    if (item.stock <= quantity) {
      toast.error("Cannot exceed available stock", {
        position: "top-center",
        autoClose: 300,
      });
      dispatch(removeErrors());
      return;
    }
    const newQty = quantity + 1;
    setQuantity(newQty);
    dispatch(addToCart({ id: item.product, quantity: newQty }));
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantity Cannot be less than 1", {
        position: "top-center",
        autoclose: "3000",
      });
      dispatch(removeErrors());
      return;
    }
    const newQty = quantity - 1;
    setQuantity(newQty);
    dispatch(addToCart({ id: item.product, quantity: newQty }));
  };

  return (
    <div
      key={item.product}
      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50"
    >
      <img
        className="w-20 h-20 rounded-lg object-cover"
        src={item.image}
        alt={item.name}
      />
      <div className="flex-1">
        <h3 className="font-bold text-slate-800">{item.name}</h3>
        <p className="font-sm text-gray-500 truncate max-w-50px">
          {item.description}
        </p>
        <p className="font-bold text-amber-600 mt-2">RS.{item.price}</p>
        <p className="text-sm text-gray-500">
          ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={decreaseQuantity}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Minus />
        </button>
        <span className="w-8 text-center font-bold">{item.quantity}</span>
        <button
          onClick={increaseQuantity}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Plus />
        </button>
      </div>
      <button
        onClick={() => dispatch(removeItemFromCart(item.product))}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        <Trash2 />
      </button>
    </div>
  );
};

export default CartItem;
