import React, { useState } from 'react';
import logo from '../assets/logo-coopeplus.png';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="p-5 bg-[#4273b4] shadow md:flex md:items-center md:justify-between fixed w-full z-50 text-white font-Sarala">
        <div className="flex justify-between items-center">
          <a href="index.html" className="text-2xl  cursor-pointer">
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
          className={`md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-[#4273b4] w-full left-0 md:w-auto md:py-0 py-0 md:pl-0 pl-7 md:opacity-100 ${
            menuOpen ? 'opacity-100 top-[80px]' : 'opacity-0 top-[-400px]'
          } transition-all ease-in duration-500`}
        >
          
          <li className="mx-4 my-6 md:my-0 hover:scale-105">
            <a href="#" className="text-xl    font-medium ">
              Centros de Atencion
            </a>
          </li>
          <li className="mx-4 my-6 md:my-0 hover:scale-105">
            <a href="#" className="text-xl   font-medium hover:">
              Preguntas frecuentes
            </a>
          </li>
          
          <li className="mx-4 my-6 md:my-0 hover:scale-105">
            <a href="#" className="text-xl   font-medium ">
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
