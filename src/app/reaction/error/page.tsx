import React from 'react'

const noWork = () => {
  return (
    <div><div className ="flex items-start gap-4">
    <span className ="text-red-600">
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
      <strong className ="block font-medium text-gray-900 font-poppins"> Welldone</strong>

      <p className ="mt-1 text-sm text-gray-700">
        Your Changes have been saved. You'll be redirected in 5 seconds.
      </p>

      <div className ="mt-4 flex gap-2">
        <a
          href="#"
          className ="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          <span className ="text-sm"> Leave</span>

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

      </div>
    </div>

  </div></div>
  )
}

export default noWork