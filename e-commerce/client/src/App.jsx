import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Auth from './pages/Auth';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    if (existItem) {
      setCartItems(cartItems.map((x) => x._id === product._id ? { ...existItem, qty: existItem.qty + qty } : x));
    } else {
      setCartItems([...cartItems, { ...product, qty }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  const updateQty = (id, qty) => {
    setCartItems(cartItems.map((x) => x._id === id ? { ...x, qty } : x));
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)} />
      <main className="pb-20">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQty={updateQty} />} />
          <Route path="/auth" element={<Auth setUser={setUser} />} />
          <Route path="/checkout" element={<div className="container text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Integrate Stripe Here</h1>
            <p className="text-slate-400">Checkout implementation would involve Stripe Elements and a backend endpoint.</p>
            <button onClick={() => { setCartItems([]); alert('Order Placed Successfully!') }} className="btn-primary mt-8">Complete Purchase (Demo)</button>
          </div>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
