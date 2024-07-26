import { Link } from 'react-scroll';

const CardButton = ({ onClick }) => {
  return (
    <Link to="mapPosition" smooth={true} duration={100}>
      <button 
        type='submit' 
        onClick={onClick}
        className='m-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center'
      >
        Mostrar en Mapa
      </button>
    </Link>
  );
};

  export default CardButton;
  