"use client";
import React from 'react'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'

const RouteProtector:any= ({children}:{
    children: React.ReactNode
}) => {
    const router = useRouter()
    useEffect(() => {
        
}, [])
  return  <>{children}</>
}

export default RouteProtector