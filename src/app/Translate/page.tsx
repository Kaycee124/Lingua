import React from 'react';
import Translation from '../Components/Translation';
import RouteProtector from '../Components/RouteProtector';

const Traslate = () => {
  return (
    <RouteProtector>
    <div className="flex min-h-screen flex-col items-center justify-between  pt-0 h-full ">
      <Translation />
      </div>
    </RouteProtector>
  )
}

export default Traslate