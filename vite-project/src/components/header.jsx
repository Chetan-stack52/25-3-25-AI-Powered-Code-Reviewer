import { Hospital, Menu, PhoneCall, X } from 'lucide-react';            
import React, { useState} from 'react';


    const navlist = [
    { href: '#Home ',  label: 'Home'},
    { href: '#Services ',  label: 'Services'},
    { href: '#About ',  label: 'About'},
    { href: '#Tips ',  label: 'Tips'},
    { href: '#Book ',  label: 'Book'},
    { href: '#Portfolio ',  label: 'Portfolio'},
    ];       
 const header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="scroll-mt-20 bg-white shadow-md sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        <div className="flex items-center space-x-2">
            <Hospital className="w-8  h-8  text-sky-600" />
            <span className="text-xl font-bold text-sky-800">Dr.Sanat Homeopathy Clinic</span>
        </div>
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            {navlist.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-sky-600 transition">
                    {link.label}
                </a>
            ))}
        </nav>
        <div className="md:hidden md:flex items-center space-x-2">
            <PhoneCall className=" text-sky-600" />
            <a href= "#" className= "bg-sky-600 text-white px-4 py-2 rounded-xl hover:bg-sky-700 transition text-sm">+1234567890</a>
        </div>
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen?<X  className="text-sky-700"/>:<Menu className="text-sky-700"/>}
            </button>
        </div>
    </div>

    {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-3
        text-gray-700 font-medium">
            {navlist.map((link) => (
                <a key={link.href} href={link.href} className="block hover:text-sky-600 transition"
                onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                </a>
            ))}
        </div>
    )}
</header>
    );
};
  
export default header