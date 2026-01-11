import { Calendar } from 'lucide-react'
import React from 'react'
import heroImg from '../assets/hero.png'

const Hero = () => {
  return (
    <section id= 'home' className="scroll-m-20 bg-sky-50 py-16">
        <div className="container mx-auto px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        <div className='max-w-xl text-center lg:text-left space-y-6'>
            <h1 className='text-xl sm:text-4xl lg:text-5xl font-bold text-sky-900 leading-tight'>Stay Healthy with 
              Dr. Sanat's Homeopathy Clinic</h1>
            <p className='text-gray-700 text-md sm:text-lg'>Experience personalized care and holistic healing at 
              Dr. Sanat's Homeopathy Clinic. Book your appointment today!</p>
            <a href="#book" className="inline-block bg-sky-600 text-white px-3 py-1 sm:px-6 sm:py-3 rounded-xl 
            hover:bg-sky-700 transition font-base font-medium">
            <Calendar className="w-5 h-5 text-sky-600 mx-auto lg:mx-0"/>
            Book Appointment</a>
        </div>
        <div className='flex justify-center'>
            <img src={heroImg} alt="Homeopathy Clinic" className='w-80 lg:w-[429px] rounded-4xl'/>

        </div>
    </div>
    </section>
  );
  };
export default Hero