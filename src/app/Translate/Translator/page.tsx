"use client";
import React from 'react'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import RouteProtector from '@/app/Components/RouteProtector';
import Audiotranslator from '@/app/Components/Audiotranslator';
import Texttranslator from '@/app/Components/Texttranslator';
import { useRouter } from 'next/router';


const Translator = () => {
  const [translationType, setTranslationType] = useState("");
  
const handleTranslationTypeChange = (event:any) => {
  setTranslationType(event.target.value);
};

useEffect(() => {
  console.log(translationType);
}, [translationType]);

  
  return (
    <RouteProtector>
    <div className="flex min-h-screen flex-col items-center justify-between  pt-0 h-full ">
    {/* draw blue inner border */}
    <div className='w-full h-full m-3 flex border-2 border-blue-500 rounded-lg flex-col'>
      <div className=' w-full m-3 px-2 font-roboto font-bold flex items-center justify-center flex-col md:flex-row'>
        <h4 className=' text-sm font-bold text-black'>What are you translating:</h4>
        <select
        value={translationType}
        onChange={handleTranslationTypeChange}
        id="translation-type" className=' w-[200px] border-b-2  border-blue-500 rounded-lg mx-3 h-[40px]  ' >
        <option value="audio">Audio</option>
        <option value="text">Text</option>
      </select>
    </div>
    {/* body of page */}
    <div className=' mt-2 min-w-full bg-transparent rounded-md px-2 '>
      {
       translationType === "text" ? <Texttranslator /> : <Audiotranslator />
      }
    </div>
        </div> 
    
</div>
</RouteProtector>
  )
}

export default Translator