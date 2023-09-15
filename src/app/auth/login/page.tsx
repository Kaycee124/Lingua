"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import ApiUtility from '@/app/utilities/ApiUtility';
import SuccessAlert from '@/app/Components/Alert';
import { useRouter, useSearchParams } from 'next/navigation';
const Login = () => {
    const router:any = useRouter();
    const apiUtility = new ApiUtility();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleValueChange = (e:any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    } 
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        senddata();
        console.log(formData);
         }

         const senddata = async () => {
            const {email, password} = formData;
            const endpoint = 'login';
            const data = {
                email: email,
                password: password,
            };
            const response:any = await apiUtility.postData(endpoint, data);
            console.log(response);
            if (response.request.status == 200) {
                console.log('success');
                localStorage.setItem('authToken', response.data.data);
                router.replace('/reaction/success?message=Login successful&redirect=/Translate');
            } else {
                console.log('failed');
            }
         }
       

  return (
    
    <div className = "relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 lg:bg-gray-50 bg-no-repeat bg-cover lg:items-center">
        <div className ="absolute bg-slate-200 opacity-60 inset-0 z-0"></div>
	<div className ="max-w-md w-full space-y-8 p-6 bg-white rounded-xl shadow-lg z-10">
<div className ="grid  gap-8 grid-cols-1"></div>
        <div className=' font-semibold font-inter mt-0'> Login</div>
        <div className=' w-full '>
        <div className="mt-4">
                        <form onSubmit = {handleSubmit}>
                            <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                <input
                                onChange={handleValueChange}
                                name='email' 
                                required 
                                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="" placeholder="user@host.com"/>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                    <div>
                                        <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer">
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>
                                <input
                                onChange={handleValueChange}
                                name='password' 
                                required 
                                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="" placeholder="Enter your password"/>
                            </div>
                            <div className="mt-10">
                                <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg" type = "submit">
                                    Log In
                                </button>
                            </div>
                        </form>
                        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            Don&apos;t have an account ? <Link href={"/auth/register"}><span className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign up</span></Link>
                        </div>
                    </div>
        </div>
</div>
    </div>
    
            
  )
}

export default Login