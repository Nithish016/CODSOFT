import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ChevronLeft, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = ({ cartItems, removeFromCart, updateQty }) => {
    const navigate = useNavigate();
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="glass-morphism p-12 rounded-3xl text-center space-y-4">
                    <p className="text-xl text-slate-400">Your cart is empty.</p>
                    <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 font-semibold hover:underline">
                        <ChevronLeft size={20} /> Go back to shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <motion.div
                                layout
                                key={item._id}
                                className="glass-morphism p-4 rounded-2xl flex items-center gap-6"
                            >
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                                <div className="flex-1">
                                    <Link to={`/product/${item._id}`} className="font-semibold hover:text-indigo-400 transition">{item.name}</Link>
                                    <p className="text-slate-400 text-sm mt-1">${item.price}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <select
                                        value={item.qty}
                                        onChange={(e) => updateQty(item._id, Number(e.target.value))}
                                        className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 focus:outline-none"
                                    >
                                        {[...Array(item.countInStock || 10).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="glass-morphism p-6 rounded-3xl sticky top-28 space-y-6">
                            <h2 className="text-xl font-bold">Order Summary</h2>
                            <div className="space-y-3 border-b border-slate-800 pb-6">
                                <div className="flex justify-between text-slate-400">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>Shipping</span>
                                    <span className="text-emerald-400">Free</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-bold text-xl">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold text-lg flex items-center justify-center gap-3 transition"
                            >
                                <CreditCard size={20} /> Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
