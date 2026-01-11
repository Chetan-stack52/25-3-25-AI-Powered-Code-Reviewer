import { Icon } from 'lucide-react'
import React from 'react'
import { GiDoctorFace, Gimed, GiMedicalPackAlt, GiMedicinePills } from 'react-icons/gi'
import {motion} from 'framer-motion'

const services = [
{
    Icon:<GiDoctorFace className='w-10 h-10 text-sky-600'/>,
    title: 'Patient Introduction',
    description: 'Receive thorough evaluations and personalized treatment plans from Dr. Sanat, tailored to your unique health needs.'
},

{
    Icon:<gidiseases className='w-10 h-10 text-sky-600'/>,
    title: 'Comprehensive Diseases Examination',
    description: 'Receive thorough evaluations and personalized treatment plans from Dr. Sanat, tailored to your unique health needs.'
},

{
    Icon:<GiDoctorFace className='w-10 h-10 text-sky-600'/>,
    title: 'Professionals Homeopathic Consultations',
    description: 'Receive thorough evaluations and personalized treatment plans from Dr. Sanat, tailored to your unique health needs.'
},

{
    Icon:<GiMedicalPackAlt className='w-10 h-10 text-sky-600'/>,
    title: 'Personalized Treatment Plans',
    description: 'Receive thorough evaluations and personalized treatment plans from Dr. Sanat, tailored to your unique health needs.'
},
{
    Icon:<GiMedicinePills className='w-10 h-10 text-sky-600'/>,
    title: 'Advanced & Safe Remedies',
    description: 'Receive thorough evaluations and personalized treatment plans from Dr. Sanat, tailored to your unique health needs.'
},
]

const Services = () => {
  return (
    <section className='scroll-m-20 py-24 bg-gradient-to-br from white to-sky-50' id='services'>
    <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>Our Medical Services</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>We provide comprehensive healthcare services tailored to your needs.</p>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {Services.map((service, index) => (
            <motiondiv key={index} className='bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all border border-sky-100
             hover:border-sky-300'>
                whilehover={{scale:1.05}}
                transition={{type:'spring', stiffness:300}} 
                <div className='mb-4'>{service.Icon}</div>
                    <h3 className='text-xl font-semibold text-gray-800 mb-2'>{service.title}</h3>
                    <p className='text-gray-600'>{service.description}</p>
                <div className="flex item-center justify-center mt-4">{service.icon}</div>
                    <h3 className='text-lg font-semibold text-sky-800 mb-2 text-center'>{service.title}</h3>  
                    <p className='text-gray-600 text-sm text-center'>{service.description}</p>
            </motiondiv>
          ))}
        </div>
    </div>
    </section>
  )
}

export default Services