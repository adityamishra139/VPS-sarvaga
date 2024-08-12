import React, { useState } from 'react';
import CartItem from './CartItem';
import {useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axiosInstance from '../../api/AxiosInstance';
import Navbar from '../Navbar';

const Cart = () => {
    const {user , isAuthenticated} = useAuth0();
    const [products ,setProducts] = useState([]);
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

    const getProducts = async()=>{
        if(isAuthenticated)
        {
            try
            {
                let user_response = await axiosInstance.post("/user/signin",{
                username : user.name,
                email : user.email
                })
                if(user_response.data.msg == "User not found")
                {
                    user_response = await axiosInstance.post("user/signup",{
                        username : user.name,
                        email : user.email,
                    })
                }
                const user_id = user_response.data.id;
                console.log(user_id)
                const response = await axiosInstance.get("user/carts/getItems",{
                    userId : user_id,
                })
                console.log(response);
            }
            catch(e){
                console.error("Error fetching cart" , e)
            }
        }
        else{
            console.error("Not Authenticated");
        }
    }
    getProducts();
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
        <>
        <Navbar />
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
        </>
    );
};

export default Cart;