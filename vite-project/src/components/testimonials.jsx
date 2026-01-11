import React from 'react'
import { FaArrowLeft, FaChevronLeft, FaQuoteLeft } from 'react-icons/fa';

const testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const testimonials = [
        {
        id:1,
        name: 'Chetan Dubey',
        role: 'Patient',
        content: "Dr. Sanat's homeopathy treatments have transformed my health. I feel rejuvenated and grateful for the personalized care I received.",
        rating:5,
        Image:'https://randomuser.me/api/portraits/men/32.jpg',
        },
         {
        id:2,
        name: 'Ravi Dwevedi',
        role: 'Patient',
        content: " Dr. Sanat is a compassionate and skilled homeopath. His treatments have significantly improved my well-being, and I highly recommend his clinic to anyone seeking holistic health solutions.",
        rating:4.5,
        Image:'https://randomuser.me/api/portraits/men/32.jpg',
        },
         {
        id:3,
        name: 'Akhil Pachori',
        role: 'Patient',
        content: "I had been struggling with chronic health issues for years until I visited Dr. Sanat's Homeopathy Clinic. His holistic approach and effective treatments have made a remarkable difference in my life.",
        rating:4,
        Image:'https://randomuser.me/api/portraits/men/32.jpg',
        },
         {
        id:4,
        name: 'Ajay Mishra',
        role: 'Patient',
        content: "healthcare experience at Dr. Sanat's clinic is exceptional. The personalized attention and natural remedies have helped me achieve better health without any side effects.",
        rating:5,
        Image:'https://randomuser.me/api/portraits/men/32.jpg',
        }
    ];
    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === testimonials.length -1 ? 0 : prevIndex +1
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? testimonials.length -1 : prevIndex -1
        );
    }
  return (
    <section id="Testimonials" className="scroll-mt-20 relative py-16 bg-gradient-to-r from-blue-50 to-sky-50 
    overflow-hidden">
        <div className='absolute inset-0 opacity-10'>
            <div className='absolute inset-x-0 left-0 w-1/2 bg-sky-300'></div>
            <div className='absolute inset-x-0 right-0 w-1/2 bg-blue-300'></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-800">Patient Testimonials</h2>
                <p className="mt-4 text-xl text-gray-600">Hear what our patients have to say about their experiences
                     at Dr.Sanat Homeopathy Clinic.</p>
            </div>
            <div className='relative'>
                <div className='flex transition-transform duration-500 ease-in-out'
                style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                    {testimonials.map((testimonial,index) => (
                        <div key={testimonial.id} className='w-full flex-shrink-0 px-4'>
                            <div className='bg-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center'>
                                <div className='relative'>
                                    <img className='w-40 h-40 rounded-fullobject-cover border-4 border-sky-100 
                                    shadow-lg'
                                     src={testimonial.image}
                                     alt={testimonial.name}
                                      />
                                    <div className='absolute -bottom-3 left-1/2 transform-translate-x-1/2 bg-sky-500
                                       text-white px-4 py-1 rounded-full text-sm font-medium'>
                                        {testimonial.role}
                                    </div>
                                </div>
                             </div>
                            <div className='md:w-2/3 md:pl-12'>
                            <div className='relative'>
                            <FaQuoteLeft className='text-sky-200 text-2xl md:text-3xl absolute -top-2 -left- md:-left-10'/>
                                <p className='text-lg text-gray-700 mb-6 relative z-10'>
                                    {testimonial.content}
                                </p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-sky-800'>{testimonial.name}
                                        {testimonial.name}
                                    </h3>
                                    <div className='flex mt-1'>
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={`text-lg ${i< testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className='hidden md:flex space-x-2'>
                                    <button onClick={prevTestimonial} className='bg-sky-100 text-sky-700 p-2
                                     rounded-full hover:bg-sky-200 transition-colors'>
                                        <FaChevronLeft />
                                    </button>
                                    <button onClick={nextTestimonial} className='bg-sky-100 text-sky-700 p-2
                                     rounded-full hover:bg-sky-200 transition-colors'>
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                <div className='flex justify-center mt-8 space-x-4 md:hidden'>
                    {testimonials.map((_, index) => (
                        <button key={index} onClick={() => setCurrentIndex(index)} 
                        className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-sky-500 w-6' 
                            : 'bg-gray-300'}`}aria-label={`Go to testimonial ${index + 1}`}></button>
                    ))}
                </div>
            </div>
            <div className='mt-16 text-center'>
                <button className='px-8 py-3 bg-sky-600 text-white rounded-full font-medium hover:bg-sky-700
                transition-xolors duration-300 shadow-lg hover:shadow-xl'>
                    Share Your Experience
                </button>
            </div>
        </div>
        </section>
  );
};

export default testimonials