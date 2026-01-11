import React from 'react'
import { FaCalendarAlt,FaChevronRight,FaPhone, FaUserDoctor,FaUser, FaClock } from 'react-icons/fa';

const bookappointment = () => {
    const [activeStep, setActiveStep] = React.useState(1);
    const[formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: 'General Checkup',
    });
    const services= [
      'General Checkup',
      'Regular Consultation',
      'Healthy Diet Plan',
      'Immunisation and Vaccination',
      'Take Medication as Prescribed',

     ];
     const availableTimes = [
        '09:00 AM','10:00 AM','11:00 AM','12:00 PM',
        '01:00 PM','02:00 PM','03:00 PM', '04:00 PM','05:00 PM',
     ];
     const handlleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({...prev, [name]: value}));
     };
     const nextStep = () => setActiveStep(prev => prev + 1);
      const prevStep = () => setActiveStep(prev => prev - 1);
  return (
    <div id='Book' className='scroll-mt-20 min-h-screen bg-gradient-to-br from-sky-50 to-sky-50 py-12 px-4'>
      <div className='max-w-4xl '>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-3'>Book Your Appointment</h1>
          <p className='text-lg  text-gray-600'>Fill in the details below to schedule your appointment</p>
        </div>
        <div className='mb-12'>
          <div className='relative'>
            <div className='absolute top-1/2 left-0 right-0 h-2 bg-gray-100 rounded-full z-0'></div>
            <div className='absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-10 transition-all duration-500 duration-500' style={{ width: `${(activeStep - 1) * 25}%` }}></div>
            <div className='flex justify-between relative z-20'>
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className='flex flex items-center justify-center cursor-pointer' 
                onClick={()=> activeStep > step && setActiveStep(step)}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${activeStep >= step ? 'bg-gradient-to-br from-sky-500 to-purple-500 text-white shadow-lg' 
                  : 'bg-white text-gray-600 border-2 border-gray-300'}
                  transition-all duration-300 font-bold mb-2`}>
                    { activeStep > step ? (
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox= '0 0 24 24' >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                      </svg>
                    ) : (step
                    )}
                </div>
                <span className={`text-sm font-medium ${activeStep >= step ? 'text-sky-600' : 'text-gray-400'} transition-colors`}>{['Your Info', 'Schedule', 'Service', 'Confirm'][step - 1]}</span>
                </div>
              ))};
            </div>
          </div>
        </div>
        <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
          {activeStep === 1 &&(
            <div className='p-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
                <FaUser className='mr-3 text-sky-500' />Personal Information</h2>
              <div className='space-y-6'>
                <div className='relative'>
                  {/* <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label> */}
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handlleInputChange}
                    className='w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 
                    focus:border-sky-500 outline-none transition'
                  />
                  <FaUser className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                </div>
                <div className='relative'>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handlleInputChange}
                    className='w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 
                    focus:border-sky-500 outline-none transition'
                  />
                  <FaUser className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                </div>
                <div>
                  <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handlleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                   <FaUser className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                </div>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className='p-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
                <FaCalendarAlt className='mr-3 text-sky-500' />Select Date & Time</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='relative'>
                  {/* <label htmlFor='date' className='block text-sm font-medium text-gray-700 mb-1'>Date</label> */}
                  <input
                    type='date'
                    id='date'
                    name='date'
                    value={formData.date}
                    onChange={handlleInputChange}
                    className='w-full p-4 py-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 
                    focus:border-sky-500 outline-none transition'
                    required
                    min={new Date().toISOString().split('T')[0]}/>
                   <FaCalendarAlt className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'/>
                </div>
                <div className='relative'>
                  <label htmlFor='time' className='block text-sm font-medium text-gray-700 mb-1'>Time</label>
                  <select
                    type='time'
                    id='time'
                    name='time'
                    value={formData.time}
                    onChange={handlleInputChange}
                    className='w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 
                    focus:border-sky-500 outline-none appearance-none transition'
                    required>
                      <option value ="" >Select a time</option>
                      {
                        availableTimes.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                        </select>
                        <FaClock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'/>
                        <FaChevronRight className = 'absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400'/>
                </div>
                <div className='relative md:col-span-2'>
                        <select
                        name="service"
                        value={formData.service}
                        onChange={handlleInputChange}
                        className='w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 
                        focus:border-sky-500 outline-none appearance-none transition'required>
                          {services.map(service => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                        <FaCaretDown className='absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400'/>
                </div>
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div className='p-8 text-center'>
              <div className='inline-flex item-center justify-center bg-sky-100 p-6 rounded-full mb-6'>
                <FaUserDoctor className= 'text-4xl text-sky-500'/>
              </div>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>Confirm Your Appointment</h2>
              <div className='bg-sky-50 rounded-xl p-6 mb-8 text-left max-w-md mx-auto'>
                <div className='flex justify-between py-2 border-2 border-sky-100'>
                  <span className='text-gray-600'>Name</span>
                  <span className='font-medium'>{formData.name}</span>
                </div>
                <div className='flex justify-between py-2 border-2 border-sky-100'>
                  <span className='text-gray-600'>Phone:</span>
                  <span className='font-medium'>{formData.Phone}</span>
                </div>
                <div className='flex justify-between py-2 border-2 border-sky-100'>
                  <span className='text-gray-600'>Date:</span>
                  <span className='font-medium'>{formData.Date}</span>
                </div>
                <div className='flex justify-between py-2 border-2 border-sky-100'>
                  <span className='text-gray-600'>Time:</span>
                  <span className='font-medium'>{formData.time}</span>
                </div>
                <div className='flex justify-between py-2 border-2 border-sky-100'>
                  <span className='text-gray-600'>Service:</span>
                  <span className='font-medium'>{formData.service}</span>
                </div>
              </div>
              <button className='w-full max-w-xs py-4 bg-gradient-to-r from-sky-500 to-sky-500 text-white 
              font-bold rounded-xl shadow-lg hover:xl transition-all transform hover:scale-105'>Confirm & Book Appointment</button>
        </div>
          )}
          <div className='px-8 pb-8 flex justify-between'>
            {activeStep > 1 && (
              <button
                onClick={prevStep}
                className='px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition'
              >
                Back
              </button>
            )}
            {activeStep < 3 && (
              <button
                onClick={nextStep}
                className='px-6 py-3 bg-sky-500 text-white rounded-lg hover:from-sky-600 hover:to-sky-600 transition flex 
                items-center'>
                Next<FaChevronRight className='ml-2'/>
              </button>
            )}
          </div>
       </div>
      </div>

     </div>
  );
};
export default bookappointment