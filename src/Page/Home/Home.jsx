import React, { useEffect, useRef } from 'react';
import './Home.css'
import { motion } from 'framer-motion';
import CompAHeaderMenu from '../../components/Home/HeaderMenu';
import CompBHeaderGrid from '../../components/Home/HeaderGrid';
import CompCBanner from '../../components/Home/Banner';
import Items from '../../components/Home/Items';

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
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <CompAHeaderMenu />
      <CompBHeaderGrid />
      <CompCBanner />
      <Items />
    </motion.div>
  )
}

export default Home;