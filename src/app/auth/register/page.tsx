"use client"

import React from 'react'
import Dropdown from '../../Components/Dropdown'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { redirect, useRouter } from 'next/navigation'


const Register = () => {
    const [selected, setSelected] = useState('');
    const [errors, setErrors] = useState<String[]>([]);
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
   

    });
    const router = useRouter();
    const handleValueChange = (e:any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    } 

    const handleFormSubmit = async (e:any) => {
        e.preventDefault();
        sendToApi();
          
    }
  function sendToApi () {
        const {name, email, password, country} = formData;
        const url = 'http://localhost/ce-project/backend/register';
        const data = {
            name: name,
            email: email,
            password: password,
            country: country,
       
        }
        axios.post(url, data)
        .then((response) => {
            if (response.data.status === 'success') {
                alert('Registration successful');
                 router.push('/auth/login');
            } else {
                alert(response.data.message);
            }


        })
        .catch((error) => {
            alert ('An error occured');
            router.push('/auth/register');
        })
    }
   
  return (
    <div className ="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 lg:bg-gray-50 bg-no-repeat bg-cover lg:items-center">
	<div className ="absolute bg-slate-200 opacity-60 inset-0 z-0"></div>
	<div className ="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
<div className ="grid  gap-8 grid-cols-1">
	<div className ="flex flex-col ">
			<div className ="flex flex-col items-center">
				<h2 className ="font-semibold text-lg mr-auto font-roboto">Register</h2>
                <div className=' w-full '>
                <div className ="mt-12">
                        <form onSubmit={handleFormSubmit} >
                            {/* for displaying the firm errors */}
                            {errors.length > 0 && (
                                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                                    <ul>
                                        {errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div>
                                <div className ="text-sm font-bold text-gray-700 tracking-wide">Name</div>
                                <input className ="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="" 
                                placeholder="What shall we call you"
                                name='name'
                                onChange={handleValueChange}
                                required
                                />
                            </div>
                            <div className='mt-6'>
                            <div>
                                <div className ="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                <input 
                                className ="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type=""
                                 placeholder="mike@gmail.com"
                                 name='email'
                                 onChange={handleValueChange}
                                 required
                                 />
                            </div>
                            </div>
                            <div className ="mt-6">
                                <div className ="flex justify-between items-center">
                                    <div className ="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                    <div>
                                    </div>
                                </div>
                                <input
                                 name='password'
                                 onChange={handleValueChange}
                                 required 
                                className ="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="" placeholder="Enter your password"/>
                            </div>
                          
                            <div className='mt-6'>
                            <div>
                                <div className ="text-sm font-bold text-gray-700 tracking-wide">Country</div>
                                <input
                                 name="country"
                                 onChange={handleValueChange} 
                                 required
                                className ="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="" placeholder="Enter your country"/>
                            </div>
                            </div>
                            <div className='mt-6'>
                        
                            </div>
                           
                            
                            <div className ="mt-10">
                                <button className ="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg">
                                    Register
                                </button>
                            </div>
                            
                        </form>
                        
                    </div>
                </div>
				
			</div>
			
		</div>
	</div>
			</div>
            </div>
  )
}

export default Register