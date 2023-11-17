import React,  { useState, useEffect}from 'react';
//import Nav from '../components/Nav';
import logo from '../assets/logo-coopeplus.png';


export const navVariants={
  hidden:{
    clipPath:'circle(5.8% at 58% 0%)',
    opacity:0,
      transition:{
        type:'spring',
        delay:0.2,
        stiffness:300,
        damping:140
      }
  },show:{
    opacity:1,
    clipPath:'circle(130% at 50% 0)',
    transition:{
      type:'spring',
      
      stiffness:80,
      
    }
  }
}


const Header = () => {
const [isActive, setIsActive] = useState(false);
//const [nav,setNav]=useState(false);
useEffect(() => {
  window.addEventListener('scroll', () => {
    window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
  });
});
  return( 
  <header
   id='header_nav'
   className='bg-[#585ae4] fixed w-full max-w-[1800px]
  z-50 '>
    <div

    className='container mx-auto p-2'>
      <div className='flex justify-between items-center 
       lg:px-0 relative text-white '>
        {/*menu button */}
        
        {/*logo */}
        <div
        >
          <a href='#home'>
            {/* if header is active make logo smaller*/}
            <img
            className={`${
              isActive ? 'w-[190px] h-[50px] transition-all duration-200 ' 
              : 'w-[200px] h-[60px]  transition-all duration-200   scale-105'}`}
              src={logo}
              alt=''
              />
          </a>
          
          </div>
        {/*social icons*/} 
       
        {/*nav */}
        
      </div>
    </div>
    </header>
  );
};

export default Header;
