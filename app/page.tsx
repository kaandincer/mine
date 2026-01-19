'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { SignUpModal, ContactModal } from '@/components/Modal'
import Hero from '@/components/sections/Hero'
import ProblemSolution from '@/components/sections/ProblemSolution'
import HowItWorks from '@/components/sections/HowItWorks'
import Differentiation from '@/components/sections/Differentiation'
import Features from '@/components/sections/Features'
import Vision from '@/components/sections/Vision'
import FAQ from '@/components/sections/FAQ'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  const [tryFreeModalOpen, setTryFreeModalOpen] = useState(false)
  const [bookDemoModalOpen, setBookDemoModalOpen] = useState(false)

  const handleSignInClick = () => {
    // TODO: Connect to authentication system
    console.log('Sign in clicked')
  }

  const handleTryFreeClick = () => {
    setTryFreeModalOpen(true)
  }

  const handleBookDemoClick = () => {
    setBookDemoModalOpen(true)
  }

  const handleHowItWorksClick = () => {
    const element = document.getElementById('how-it-works')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSignInClick={handleSignInClick} />
      
      <main>
        <Hero
          onTryFreeClick={handleTryFreeClick}
          onBookDemoClick={handleBookDemoClick}
        />
        <ProblemSolution onHowItWorksClick={handleHowItWorksClick} />
        <HowItWorks onTryFreeClick={handleTryFreeClick} />
        <Differentiation />
        <Features />
        <Vision onTryFreeClick={handleTryFreeClick} />
        <FAQ />
        <FinalCTA
          onTryFreeClick={handleTryFreeClick}
          onBookDemoClick={handleBookDemoClick}
        />
      </main>

      <Footer onBookDemoClick={handleBookDemoClick} />

      <SignUpModal
        isOpen={tryFreeModalOpen}
        onClose={() => setTryFreeModalOpen(false)}
      />
      <ContactModal
        isOpen={bookDemoModalOpen}
        onClose={() => setBookDemoModalOpen(false)}
      />
    </div>
  )
}

