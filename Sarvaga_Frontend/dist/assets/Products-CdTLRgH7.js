import{u as n,j as e,S as d,F as c}from"./index-DSqz48Eg.js";import{i as g}from"./_DSC1528-1-Cl1xaHpD.js";const m="/assets/jpeg-optimizer__DSC1395-1-BKKA_ZP5.JPG",p="/assets/jpeg-optimizer__DSC1407-1-nkuwI5Wz.JPG",x="/assets/jpeg-optimizer__DSC1423-1-Gu8G2K1e.JPG",h="/assets/_DSC1557-BEQUHbzP.JPG",u=[{id:1,img:m,title:"Chanderi Silk",rating:4.8,color:"Royal Blue",aosDelay:"0"},{id:2,img:p,title:"Silk zari stripe",rating:4.5,color:"Magenta",aosDelay:"100"},{id:3,img:x,title:"Dupion Silk",rating:5,color:"Rama",aosDelay:"200"},{id:4,img:g,title:"Cotton",rating:4.3,color:"Pink",aosDelay:"300"},{id:5,img:h,title:"Handbrush Linen silk",rating:4.6,color:"Light Orange",aosDelay:"400"}],j=()=>{const i=n();let t=!1;const o=()=>{t=!1},l=()=>{t=!0},a=s=>{t||i(`/description/${s}`)},r={dots:!0,infinite:!0,speed:500,slidesToShow:4,slidesToScroll:1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]};return e.jsx("div",{className:"mt-14 mb-12 flex justify-center",children:e.jsxs("div",{className:"container bg-gray-100 py-10 px-5 rounded-lg shadow-lg",children:[e.jsxs("div",{className:"text-left mb-10 mx-6 max-w-[600px]",children:[e.jsx("h1",{"data-aos":"fade-up",className:"text-2xl text-black font-bold",children:"Top Selling Products"}),e.jsx("p",{"data-aos":"fade-up",className:"text-sm text-gray-500 mt-1",children:"Explore the top selling products and find what's best for you."})]}),e.jsx(d,{...r,children:u.map(s=>e.jsx("div",{className:"relative p-4 bg-white shadow-lg rounded-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl cursor-pointer",onMouseDown:o,onMouseMove:l,onClick:()=>a(s.id),children:e.jsxs("div",{className:"relative w-full h-[400px] overflow-hidden rounded-lg bg-gradient-to-b from-transparent to-gray-200",children:[e.jsx("img",{src:s.img,alt:s.title,className:"w-full h-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"}),e.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white",children:[e.jsx("h3",{className:"font-semibold text-lg",children:s.title}),e.jsx("p",{className:"text-sm",children:s.color}),e.jsxs("div",{className:"flex items-center gap-1 mt-1",children:[e.jsx(c,{className:"text-yellow-400"}),e.jsx("span",{children:s.rating})]})]})]})},s.id))}),e.jsx("div",{className:"flex justify-center mt-10",children:e.jsx("button",{className:"text-white bg-purple-700 hover:bg-purple-600 border border-purple-700 rounded-xl w-[200px] hover:w-[250px] transition-all duration-300 px-4 py-2",children:"View All Products"})})]})})};export{j as default};
