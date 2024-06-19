import React from 'react'

const Signup = () => {
  return (
    <div>
        <section class="min-h-screen flex justify-center items-center bg-white">
            <div class="px-16  bg-white py-6 border rounded-2xl shadow-xl shadow-slate-950">
                <h2 class="text-blue-900 text-2xl font-bold underline ">SignUp</h2>
                <p class="text-black font-semibold text-sm mt-2">Signup and Embrace the journey ahead</p>
                <hr></hr>
                <div class="flex flex-col ">
                <form action class="flex flex-col mt-6 gap-2"/>
                <input
                class=" font-semibold px-2 py-1 rounded-2xl border border-blue-300 w-[250px] hover:w-[300px] transition-all duration-300"
                type="text"
                name="Email"
                placeholder="Enter Email"
                required
                />
                <input
                class="font-semibold px-2 py-1  mt-3 rounded-2xl border border-blue-300 w-[250px] hover:w-[300px] transition-all duration-300"
                type="text"
                name="Fullname"
                placeholder="Enter Your Full Name"
                required
                />
                <input
                class=" px-2 py-1 font-semibold  mt-3 rounded-2xl border border-blue-300 w-[250px] hover:w-[300px] transition-all duration-300"
                type="password"
                name="Password"
                placeholder="Password"
                required
                />
                <button class="mt-4 rounded-2xl text-white   bg-blue-500 hover:bg-blue-800 px-1 py-2 w-full">
                    Login
                </button>
                <div class="text-center mt-3 text-grey w-full text">
            ------------------OR------------------
                </div>
            <div>
            <button class="w-full text-sm  hover:text-indigo-700 border-2 border-blue-300  py-2 rounded-xl mt-4 flex justify-center items-center bg-white font-semibold">
            <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            SignUp   with Google</button>
            </div>
            <p class="mt-4 text-center text-sm text-gray-500">
            Already have an account? 
            <a
            href="#" target='_blank'
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
            <button class="text-sm ">_Login</button>
            </a>
        </p>
            

            </div>



            </div>
        </section>

    </div>
  )
}

export default Signup