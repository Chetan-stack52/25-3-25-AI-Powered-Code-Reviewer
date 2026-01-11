import React from 'react'
import { GiNightSleep } from "react-icons/gi";
import { usestate } from 'react'
import { CiStopwatch } from 'react-icons/ci';
import { MdOutlineFoodbank } from 'react-icons/md';
import { MdOutlineSportsGymnastics } from "react-icons/md";


const tips = () => {
    const {activeTip, setActiveTip} = useState(0);

    const tips = [
        {
            title: "Healthy Diet",
            content: "Maintain a balanced diet rich in fruits, vegetables, and whole grains to support overall health.",
            icon: <mdMdOutlineFoodbank className="w-8 h-8 text-sky-500"/>    
        },
         {
            title: "Take medication on time",
            content: "Maintain a balanced diet rich in fruits, vegetables, and whole grains to support overall health.",
            icon: <CiStopwatch className="w-8 h-8 text-blue-500"/>    
        }, {
            title: "Quality sleep",
            content: "Maintain a balanced diet rich in fruits, vegetables, and whole grains to support overall health.",
            icon: <GiNightSleep className="w-8 h-8 text-amber-500"/>    
        }, {
            title: "Regular fitness and exercise",
            content: "Maintain a balanced diet rich in fruits, vegetables, and whole grains to support overall health.",
            icon: <MdOutlineSportsGymnastics className="w-8 h-8 text-emerald-500"/>    
        },
    ];
  return (
    <section id="Tips" className="scroll-mt-20 max-w-6xl mx-auto px-4 py-16 bg-gray-50">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-800 mb-4">Health Tips</h2>
            <p className="text-lgtext-gray-600 max-w-2xl mx-auto">Here are some essential health tips to improve your well-being and lifestyle.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-8'>
            {tips.map((tip, index)=>(
                <button key={index} onClick={()=>setActiveTip(index)} className={`bg-white rounded-xl 
                shadow-md p-4 hover:shadow-lg transition-shadow duration-300 ${activeTip === index 
                ? 'bg-white lg:shadow border-b-4 ring-2 ring-sky-500'
                : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <div className="mb-2">{tip.icon}</div>
                        <h3 className="font-medium text-gray-800 text-sm md:text-base">{tip.title}</h3>
                    </button>
            ))}
        </div>
        <div className="bg-gradient-to-r from-sky-50 to-blue-199 rounded-2xl p-8 shadow-sm">
            <div className='flex flex-col md:flex-row items-center gap-6'>
                <div className='flex-shrink-0 bg-white p-6 rounded-xl shadow-md'>
                    {tips[activeTip].icon}
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{tips[activeTip].title}</h3>
                    <p className='text-gray-600 text-lg leading-relaxed'>{tips[activeTip].content}</p>
                </div>
            </div>
            </div>
            <div className='mt-8 flex justify-center'>
                <div className='flex space-x-2'>
                    {tips.map((_, index) => (
                        <button key={index} onClick={() => setActiveTip(index)} 
                        className={`w-3 h-3 rounded-full transition-all ${activeTip === index ? 'bg-sky-500 w-6' 
                            : 'bg-gray-300'}`}aria-label={`Go to tip${index + 1}`}></button>
                    ))}
                </div>
            </div>
    </section>
  );
};

export default tips