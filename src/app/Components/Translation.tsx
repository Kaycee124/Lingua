"use client";
import React from 'react';
import {useState, useEffect, createContext, useContext} from 'react'
import fs from 'fs';
import axios from 'axios';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';

//using js geolocator to get user location

const Translation = () => {


const [location, setLocation] = useState <{latitude: Number|null; longitude: Number|null;  }>({latitude:null, longitude:null});
const [country, setCountry] = useState('');
const [loading , setLoading] = useState(false);
const [error, setError] = useState(false);
const [locationCheck, setLocationCheck] = useState(false);
const [CountryLanguage, setCountryLanguage] = useState('');
const siteContext = createContext({ country, CountryLanguage});
const [userLanguage, setUserLanguage] = useState('');

//get user location
 async function checkGeolocation(): Promise<void> {
  const geolocator = window.navigator.geolocation;
if (geolocator) {
  //get user location and log it
  setLoading(true);

  geolocator.getCurrentPosition((position) => {
    const {latitude, longitude} = position.coords;
     setLocation({
      latitude: latitude,
      longitude: longitude
     });
    setLocationCheck(true);
    setLoading(false);
  });
}
}
//end of get user location
//use longitude and latitude to get country
async function getCountry(): Promise<void> {
  //check if user location has been set
  if(location){
    try {
      //set loading status to true
      setLoading(true);
      //fetch country from api
       const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`;
       const response = await axios.get(url);
       const data = await response.data;
       console.log(data);
        //set country to the country gotten from the api
        setCountry(data.address.country);
       setLoading(false);
      

    
      
    } catch (error) {
      //if there is an error set error to true
      setError(true);
      console.log(error);
      
    }
  }
}
//end of function
//empty comment to keep useeffects out of the way
//  begin function to get country official language
async function getCountryLanguage(): Promise<void> {
  //check if country language exists in local storage
  const countryLanguage = localStorage.getItem('countryLanguage');
  if(countryLanguage){
    setCountryLanguage(countryLanguage);
  }
if(location){
    try {
      //set loading status to true
      setLoading(true);
      //fetch country from api
       const url = `https://restcountries.com/v3.1/name/${country}`;
       const response = await axios.get(url);
       const data = await response.data;
       const countryData = data[0];
       const countryLanguage = countryData.languages;
       const Array = Object.values(countryLanguage);
      const ExtractedLang:any = Array[0];
        setCountryLanguage(ExtractedLang);
        localStorage.setItem('countryLanguage', ExtractedLang);      
       setLoading(false);              
    } catch (error) {
      //if there is an error set error to true
      setError(true);
      console.log(error);
      
    }
  }
}
async function CountryDetails () {
  await getCountry();
  await getCountryLanguage();
}
useEffect (() => {
  if (!locationCheck && location.latitude === null && location.longitude === null) {
    checkGeolocation();
    console.log('we wait for the location please wait a little');
  } else if (location.latitude !== null && location.longitude !== null) {
    console.log('Location is available:', location);
    CountryDetails();
  }
 }, [location, locationCheck]);

//end of function

useEffect(() => {
  //check if token exists in local storage
  const authToken = localStorage.getItem('authToken');
  if(authToken){
    console.log('token exists', authToken);
  }
}, []);


//end of the section
  return (
    <div className= ' w-full m-2 bg-white flex items-center justify-center h-full '>
      <div className='w-full h-full m-3 flex items-center justify-center border-2 border-blue-500 rounded-lg flex-col'>
          <h5 className='text-xl font-semibold text-black-500 font-roboto'>Welcome to Dashboard</h5>
          {/* center card for user */}
          <div className='flex flex-col items-center justify-center '>
              <div className=' mt-7'>
              <svg fill="#000000" width="96px" height="96px" viewBox="0 0 35 35" data-name="Layer 2" id="a7ce4915-3aac-4be4-ab11-f637a8342592" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier">

<path d="M17.5,16.383a8.067,8.067,0,1,1,8.067-8.067A8.076,8.076,0,0,1,17.5,16.383Zm0-13.633a5.567,5.567,0,1,0,5.567,5.566A5.573,5.573,0,0,0,17.5,2.75Z"/>

<path d="M31.477,34.75a1.25,1.25,0,0,1-1.23-1.037A12.663,12.663,0,0,0,17.5,22.852,12.663,12.663,0,0,0,4.753,33.713a1.25,1.25,0,0,1-2.464-.426A15.1,15.1,0,0,1,17.5,20.352,15.1,15.1,0,0,1,32.711,33.287a1.25,1.25,0,0,1-1.02,1.444A1.2,1.2,0,0,1,31.477,34.75Z"/>

</g>

</svg>
              </div>
              <div className='mt-7 flex flex-col'>
                <div className = "flex flex-row">
                <h5 className='text-sm font-bold text-black font-inter'>Your Location :</h5>
                <h5 className='text-sm font-bold text-indigo-700 font-inter ml-2'>{country}</h5>
                </div>
                <div className = "flex flex-row mt-4">
                <h5 className='text-sm font-bold text-black font-inter'>Official Language at your location:</h5>
                <h5 className='text-sm font-bold text-indigo-700 font-inter ml-2'>{CountryLanguage}</h5>
                </div>
                <h5 className='text-sm font-bold text-black font-inter mt-2'>What do you want to do:</h5>
                <div className = "flex flex-col mt-7">
                <a href='./Translate/Translator' className=' flex items-center justify-center bg-white border-solid border-2 border-indigo-500 text-white font-bold font-inter rounded-lg px-3 py-2 mt-2 s'  ><span className=' text-indigo-500'>Translate</span></a>
                <a href='./chat' className=' flex items-center justify-center bg-white border-solid border-2 border-indigo-500 text-white font-bold font-inter rounded-lg px-3 py-2 mt-2 s'  ><span className=' text-indigo-500'>Learn</span></a>
           
                </div>
                </div>
          </div>
          

         

      </div>
    </div>
  )
}

export default Translation