import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../components/pageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "./CartItem";
import { Trash2 } from "lucide-react";
import { clearCart } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { success, loading, error, message, cartItems } = useSelector(
    (state) => state.cart,
  );
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  ); //acc=>accumlator
  const tax = subTotal * 0.18;
  const shippingCharges = cartItems.length === 0 ? 0 : subTotal > 500 ? 0 : 50;
  const total = subTotal + tax + shippingCharges;
  return (
    <>
      <PageTitle title="Your cart" />
      <Navbar />
      <main className="pt-20 pb-10 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/*Cart Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex justify-between">
                  Your Cart
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center text-sm"
                  >
                    <Trash2 /> clear cart
                  </button>
                </h2>
                <div className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">Your cart is Empty</p>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <CartItem item={item} key={item.product} />
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              {/*Amount Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Order summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">
                      Subtotal
                    </span>
                    <span className="font-bold"> ₹ {subTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">
                      Shippingcharges
                    </span>
                    <span className="font-bold">
                      {" "}
                      ₹ {shippingCharges.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">Tax</span>
                    <span className="font-bold"> ₹ {tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className=" text-xl font-bold text-gray-600">
                        Total Amount
                      </span>
                      <span className="text-xl font-bold text-amber-600">
                        ₹ {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-5">
                    Process Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
