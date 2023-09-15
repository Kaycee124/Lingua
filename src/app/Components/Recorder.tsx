"use client";
import React from 'react'

const Recorder = ({music_folder}:{
    music_folder: string
}) => {
    const getMicrophonePerm = async() => {
      console.log('getMicrophonePerm')  
    }
    const startRecording = async() => {
        console.log('startRecording')
    }
    const stopRecording = async() => {
        console.log('stopRecording')
    }
    const playRecording = async() => {
        console.log('playRecording')
    }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between  pt-0 h-full ">
    {/* draw blue inner border */}controls
    <div className='w-full h-full m-3 flex items-center justify-center border-2 border-blue-500 rounded-lg flex-col'>
    <h1>Translator</h1>
    <div className='flex flex-col items-center justify-center'>
    <button className='bg-blue-500 text-white p-2 rounded-lg mb-4' onClick={getMicrophonePerm} >Request Permission</button>
    <button className='bg-blue-500 text-white p-2 rounded-lg mb-4' onClick={ startRecording} >Record Audio</button>
    <button className='bg-blue-500 text-white p-2 rounded-lg mb-4' onClick={ stopRecording} >Stop Record</button>
    <button className='bg-blue-500 text-white p-2 rounded-lg mb-4' onClick={ playRecording}>PlayBack</button>

      </div>
    {/* <audio ref={audioRef} controls />  */}
        </div> 
    
</div>
    
  )
}

export default Recorder