import React, { Children } from 'react'

const ReacLayout = ({children}:{
    children: React.ReactNode
}) => {
  return (
    <div className = " w-screen h-screen flex items-center justify-center align-middle ">
        <div
  role="alert"
  className ="rounded-xl border border-gray-100 bg-white p-4 shadow-xl"
>
  {children}
</div>
    </div>
  )
}

export default ReacLayout