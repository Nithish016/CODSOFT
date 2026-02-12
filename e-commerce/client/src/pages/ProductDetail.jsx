import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct } from '../api';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const ProductDetail = ({ addToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await fetchProduct(id);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    if (loading) return <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div></div>;
    if (!product) return <div className="text-center mt-20">Product not found</div>;

    return (
        <div className="container py-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition">
                <ArrowLeft size={20} /> Back to results
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-3xl overflow-hidden glass-morphism p-4"
                >
                    <img src={product.image} alt={product.name} className="w-full h-auto rounded-2xl object-cover" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div>
                        <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm">{product.category}</span>
                        <h1 className="text-4xl font-bold mt-2 mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} className={i < Math.floor(product.rating) ? 'fill-yellow-400' : ''} />
                                ))}
                            </div>
                            <span className="text-slate-400">({product.numReviews} reviews)</span>
                        </div>
                    </div>

                    <p className="text-3xl font-bold text-white">${product.price}</p>
                    <p className="text-slate-400 leading-relaxed text-lg">{product.description}</p>

                    <div className="py-6 border-y border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Status:</span>
                            <span className={product.countInStock > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Quantity:</span>
                                <select
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 focus:outline-none"
                                >
                                    {[...Array(product.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <button
                        disabled={product.countInStock === 0}
                        onClick={() => addToCart(product, qty)}
                        className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed font-bold text-lg flex items-center justify-center gap-3 transition"
                    >
                        <ShoppingCart size={24} /> Add to Cart
                    </button>

                    <div className="grid grid-cols-3 gap-4 pt-6">
                        <div className="text-center p-4 rounded-2xl bg-slate-800/50">
                            <ShieldCheck className="mx-auto mb-2 text-indigo-400" />
                            <p className="text-xs text-slate-400 font-medium whitespace-nowrap">Secure Payment</p>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-slate-800/50">
                            <Truck className="mx-auto mb-2 text-indigo-400" />
                            <p className="text-xs text-slate-400 font-medium whitespace-nowrap">Fast Shipping</p>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-slate-800/50">
                            <RotateCcw className="mx-auto mb-2 text-indigo-400" />
                            <p className="text-xs text-slate-400 font-medium whitespace-nowrap">Easy Returns</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
