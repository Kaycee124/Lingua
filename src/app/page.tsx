import Image from 'next/image';
import NavBar from './Components/Header';
import Hero from './Components/Hero';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  pt-0 ">
      <NavBar />
      <Hero />
      
  

     
    </main>
  )
}
