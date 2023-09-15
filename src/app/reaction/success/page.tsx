"use client";
import React from 'react'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const Page = () => {
  const router:any = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const redirect = searchParams.get('redirect');
  console.log(message, redirect);
  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 0) {
          clearInterval(interval);
          router.push(redirect);
        }
        return --currentCount;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);
  return (
    <div><div className ="flex items-start gap-4">
    <span className ="text-green-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className ="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </span>

    <div className ="flex-1">
      <strong className ="block font-medium text-gray-900 font-poppins"> Congratulations</strong>

      <p className ="mt-1 text-sm text-gray-700">
        {message}. You&apos;ll be redirected in {count} seconds.
      </p>

      <div className ="mt-4 flex gap-2">
        <a
          href="#"
          className ="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          <span className ="text-sm"> Not redirecting??</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className ="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>

        <button
          className ="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-100"
        >
          <span className ="text-sm">Go back</span>
        </button>
      </div>
    </div>

  </div></div>
  )
}

export default Page

//function to get params from the link


