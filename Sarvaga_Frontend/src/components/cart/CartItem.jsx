import React from 'react';

// const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
//     return (
//         <div className="flex items-center border-b py-4">
//             <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
//             <div className="ml-4 flex-1">
//                 <h3 className="text-lg font-semibold">{item.name}</h3>
//                 <p className="text-gray-600">Price: Rs.{item.price}</p>
//                 <div className="mt-2 flex items-center">
//                     <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
//                     <span className="mx-2">{item.quantity}</span>
//                     <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
//                     <button onClick={() => onRemove(item.id)} className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Remove</button>
//                 </div>
//             </div>
//         </div>
//     );
// };
const CartItem=({item})=>{}
export default CartItem;