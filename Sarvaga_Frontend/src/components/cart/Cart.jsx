import React, { useState } from 'react';
import CartItem from './CartItem';
import {useNavigate } from 'react-router-dom';

const Cart = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1', price: 10, quantity: 1, image: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Item 2', price: 15, quantity: 1, image: 'https://via.placeholder.com/100' },
    ]);
    const Navigate=useNavigate();
    const addItem = () => {
        // const newItem = { id: items.length + 1, name: Item ${items.length + 1}, price: Math.floor(Math.random() * 20) + 5, quantity: 1, image: 'https://via.placeholder.com/100' };
        // setItems([...items, newItem]);
        Navigate('/sarees')

    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setItems(items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

            <div className="space-y-4">
                {items.map(item => (
                    <CartItem key={item.id} item={item} onRemove={removeItem} onUpdateQuantity={updateQuantity} />
                ))}
            </div>
            <div className="mt-4 flex flex-row  gap-10">
                <h3 className="text-xl font-semibold">Total Price: Rs.{getTotalPrice()}</h3>
                <button onClick={addItem} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add Item</button>
            </div>
        </div>
    );
};

export default Cart;