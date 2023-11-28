import React, { useState, useEffect } from 'react';
import logo from '../assets/logo-coopeplus.png';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const[isActive, setIsActive] = useState(false); 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
    window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    });

  },[]);

  

  return (
    <>
      <nav id='header' 
      className={`${
        isActive 
        ? 'h-[4rem]  shadow-lg'
        : 'h-[5rem] ' 
      } 
        fixed bg-[#4273b4]  p-5
        w-full mx-auto transition-all duration-500 
        shadow md:flex md:items-center md:justify-between z-40 text-white font-sara
        `}
      >
      
        <div className="flex justify-between items-center">
          <a href="https://www.coopeplus.com.ar/" target='_blank' rel='noreferrer' className="text-2xl  cursor-pointer">
            <img src={logo} className="h-10 inline" alt="" /> 
          </a>
          <span
            className="text-3xl cursor-pointer md:hidden mx-2 block"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <ion-icon name="close"></ion-icon>
            ) : (
              <ion-icon name="menu"></ion-icon>
              
            )}
          </span>
        </div>
        <ul
          className={`md:flex md:items-center z-[-10] md:z-auto md:static absolute bg-[#4273b4] w-full left-0 md:w-auto md:py-0 py-0 md:pl-0 pl-7 md:opacity-100 ${
            menuOpen ? 'opacity-100 top-[60px]' : 'opacity-0 top-[-400px]'
          } transition-all ease-in duration-500`}
        >
          
          <li className="mx-4 my-6 md:my-0 hover:scale-105">
            <a href="https://www.coopeplus.com.ar/Home/Cats" target='_blank' rel='noreferrer' className="text-xl    ">
              Centros de Atencion
            </a>
          </li>
          
          
          <li className="mx-4 my-6 md:my-0 hover:scale-105">
            <a href="https://www.coopeplus.com.ar/Account/LoginUsuario" target='_blank' rel='noreferrer' className="text-xl   ">
              Centro de Consultas Online
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
