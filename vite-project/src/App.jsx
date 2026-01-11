import React from 'react'
import Headers from './components/header.jsx'
import Hero from './components/hero.jsx'
import Services from './components/Services.jsx'
import About from './components/about.jsx'
import Tips from './components/tips.jsx'
import BookAppointment from './components/bookappointment.jsx'
import Testimonials from './components/testimonials.jsx'
import Footer from './components/footer.jsx'

const App = () => {
  return (
    <div>
      <Headers/>
      <Hero/>
      <Services/>
      <About/>
      <Tips/>
      <BookAppointment/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default App