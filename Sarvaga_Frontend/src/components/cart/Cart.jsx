import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axiosInstance from '../../api/AxiosInstance';
import Navbar from '../Navbar';

const Cart = () => {
    const { user, isAuthenticated } = useAuth0();
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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
                    console.log("user id "+user_id)
                    const response = await axiosInstance.post("user/carts/getItems",{
                        userId : user_id,
                    })
                    console.log("response\n",response);
                    setItems(response.data)
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
    }, [isAuthenticated, user]);

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

                <div className="space-y-4">
                    {console.log(items)}
                    {items.map((item, index) => (
                        <div key={index} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{item.productName}</h3>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ₹{item.price}</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold">₹{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex flex-row gap-10">
                    <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Continue to Payment</button>
                </div>
            </div>
        </>
    );
};

export default Cart;
