import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await fetchProducts(category);
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        getProducts();
    }, [category]);

    const categories = ['Electronics', 'Fashion', 'Home', 'Books'];

    return (
        <div className="container">
            <header className="mb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-4"
                >
                    Elevate Your Lifestyle
                </motion.h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Discover our curated collection of premium products designed for the modern world.
                </p>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-6">
                    <div className="glass-morphism p-6 rounded-2xl">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Filter size={18} /> Categories
                        </h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => setCategory('')}
                                className={`w-full text-left px-3 py-2 rounded-lg transition ${category === '' ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-slate-800'}`}
                            >
                                All Products
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition ${category === cat ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-slate-800'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-morphism rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
                                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                            <span>{product.rating}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <Link to={`/product/${product._id}`}>
                                            <h3 className="font-semibold text-lg mb-2 hover:text-indigo-400 transition line-clamp-1">{product.name}</h3>
                                        </Link>
                                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold">${product.price}</span>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="bg-indigo-600 hover:bg-indigo-700 p-2.5 rounded-xl text-white transition transform active:scale-95"
                                            >
                                                <ShoppingCart size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home;
