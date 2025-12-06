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
  const [signUpModalOpen, setSignUpModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)

  const handleSignUpClick = () => {
    setSignUpModalOpen(true)
  }

  const handleContactClick = () => {
    setContactModalOpen(true)
  }

  const handleHowItWorksClick = () => {
    const element = document.getElementById('how-it-works')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        onSignUpClick={handleSignUpClick}
        onContactClick={handleContactClick}
      />
      
      <main>
        <Hero
          onSignUpClick={handleSignUpClick}
          onContactClick={handleContactClick}
        />
        <ProblemSolution onHowItWorksClick={handleHowItWorksClick} />
        <HowItWorks onSignUpClick={handleSignUpClick} />
        <Differentiation />
        <Features />
        <Vision onSignUpClick={handleSignUpClick} />
        <FAQ />
        <FinalCTA
          onSignUpClick={handleSignUpClick}
          onContactClick={handleContactClick}
        />
      </main>

      <Footer onContactClick={handleContactClick} />

      <SignUpModal
        isOpen={signUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
      />
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  )
}

