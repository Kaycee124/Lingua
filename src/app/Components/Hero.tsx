import React from 'react'

const Hero = () => {
  return (
   <>
   <div className = "md:hidden h-28">

   </div>
   <section className= "header relative pt-10 items-center flex h-screen w-full md:px-10 flex-col lg:flex-row">
      <div className="container mx-auto items-center flex flex-wrap">
        <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
          <div className="md:pt-16 pt-8">
            <h2 className="font-semibold text-4xl text-slate-600 font-lato">Language Should Never be a Barrier.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
            We are Universal in out intent to bring the whole world together in thought through
            {/* <!-- -->*/}<a href= 
            "#" className=
            "text-slate-600 font-lato font-medium" target="_blank"> Lingua</a>. Speak to our Software and Speak to others</p>
            <div className="mt-12">
              <a className=
              "get-started text-white fsont-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-pink-500 active:bg-pink-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
              href=
              "/Translate">
              Translate</a><a href=
              "#"
              className=
              "github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-slate-700 active:bg-slate-600 uppercase text-sm shadow hover:shadow-lg"
              target="_blank">Start Learning</a>
            </div>
          </div>
        </div>
      </div>
      <img className=
      "absolute top-0 b-auto right-0   sm:w-6/12 mt-1 md:mt-12 sm:mt-0 w-10/12 pr-5 max-h-[800px] hidden md:block"
      src=
      "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/ill_header_3.png"
      alt="..." />
    </section>
   </>
  )
}

export default Hero