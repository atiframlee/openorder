import React, { useEffect, useRef } from 'react';
import './Home.css'
import {IconBuildingStore,IconMapPin} from '@tabler/icons-react'
import { motion } from 'framer-motion';
import CompAHeaderMenu from './CompAHeaderMenu/HeaderMenu';
import CompBHeaderGrid from './CompBHeaderGrid/CompBHeaderGrid';
import CompCBanner from './CompCBanner/CompCBanner';
import Items from './CompDItems/Items'

function Home() {
  const homeRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedScrollPos = sessionStorage.getItem('homeScrollPos')
      if (savedScrollPos && homeRef.current) {
        homeRef.current.scrollTop = parseInt(savedScrollPos)
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (homeRef.current) {
        sessionStorage.setItem('homeScrollPos', homeRef.current.scrollTop.toString())
      }
    }

    const scrollContainer = homeRef.current
    scrollContainer?.addEventListener('scroll', handleScroll)

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <motion.div
      ref={homeRef}
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <CompAHeaderMenu />
      <CompBHeaderGrid />
      <CompCBanner />
      <p className="vendorList"><IconBuildingStore size={16} className='vendor'/> Vendor's around you..</p>
      <Items/>
    </motion.div>
  )
}

export default Home;