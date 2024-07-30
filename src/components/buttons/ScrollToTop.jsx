import React, { useState, useEffect } from 'react';
import {  animateScroll as scroll } from 'react-scroll';
import "./ScrollToTop.css";
import { IoMdArrowRoundUp } from "react-icons/io";

function ScrollToTop() {
    const [showButton, setShowButton] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > window.innerHeight) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const options = {
      duration: 200,
      smooth: true,
    };
  
    const scrollToTop = () => {
      scroll.scrollTo(600, options);
    };
  
    return (
      <button
        className="scroll-to-top "
        id='scroll-to-top'
        onClick={scrollToTop}
        style={{ display: showButton ? 'block' : 'none' }}
      >
        <IoMdArrowRoundUp size={27}  className="top-arrow" />
      </button>
    );
  }
  
  export default ScrollToTop