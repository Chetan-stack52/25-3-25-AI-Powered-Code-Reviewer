import React from 'react'

const about = () => {
  return (
    <section id='about' className="scroll-m-20 py-20 bg-sky-50">
      <div className="container mx-auto px-4 flex flex-col-reverse items-center gap-12 ">
       <div className='w-full lg:w-1/2 flex justify-center'>
        <img src={about.Img} alt="About" className='w-80 lg:w-[429px] rounded-full shadow-md'/>
       </div>
        <div className='w-full lg:w-1/2 space-y-6 text-center lg:text-left'>
        <div className='flex items-center justify-center lg:justify-start space-x-2'>
            <FaUserMd className='w-8 h-8 text-sky-600'/>
            <h2 className="text-3xl font-bold text-sky-900 mb-4">About Dr. Sanat Homeopathic Clinic</h2>
        </div>
        <p className='text-gray-700 text-lg leading-relaxed'>At Dr. Sanat Homeopathic Clinic, we are 
            dedicated to providing holistic and personalized healthcare solutions. Our experienced team
             of homeopathic practitioners focuses on treating the root cause of ailments, promoting 
             overall well-being and natural healing.</p>
        <p className='text-gray-700 text-lg leading-relaxed'>With a patient-centric approach, we ensure 
            that each individual receives tailored treatment plans that align with their unique health needs.
             Experience compassionate care and effective homeopathic remedies at Dr. Sanat Homeopathic Clinic.</p>
        </div>
        </div>
    </section>
  );
};

export default about