import "../App.css";
import "./Commerce.css";
import { useState, useCallback, useRef, useContext, useEffect } from "react";
import { useCommerces } from "../hooks/useCommerces.js";
import { useCheckbox } from "../context/CheckContext.js";
import { Commerces } from "./Commerces.jsx";
import Footer from "./Footer.jsx";
import debounce from "just-debounce-it";
import { UbicacionContext } from "../context/UbicacionContext";
import { CommercesContext } from '../context/CommercesContext';
import { searchLocalidades } from "../services/localities.js";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, ] = useState(null);

  return { search, updateSearch, error };
}

function useSelect() {
  const [select, updateSelect] = useState("");
  return { select, updateSelect };
}

function useSelectR() {
  const [selectR, updateSelectR] = useState("");
  return { selectR, updateSelectR };
}

function Commerce() {
  const { setUbicacion } = useContext(UbicacionContext);
  const { setComercios } = useContext(CommercesContext);
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { select, updateSelect } = useSelect();
  const { selectR, updateSelectR } = useSelectR();
  const [mostrarDiv, setMostrarDiv] = useState(false);
  const [filtrar10, setFiltrar10] = useState(true);
  const [filtrar15, setFiltrar15] = useState(true);
  const [filtrar20, setFiltrar20] = useState(true);
  const { commerces, loading, getCommerces } = useCommerces({
    search,
    select,
    selectR,
    sort,
    filtrar10,
    filtrar15,
    filtrar20,
  });

  let refselect = useRef("");
  let refselectR = useRef("");
  
  

  const debouncedGetCommerces = useCallback(
    debounce((search) => {
      getCommerces({
        search: search,
        select: refselect.current,
        selectR: refselectR.current,
        filtrar10: ref10.current,
        filtrar15: ref15.current,
        filtrar20: ref20.current,
      });
    }, 300),
    [getCommerces]
    
  );

  //Manejador del submit del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    debouncedGetCommerces({
      search: search,
      select: refselect.current,
      selectR: refselectR.current,
      filtrar10: ref10.current,
      filtrar15: ref15.current,
      filtrar20: ref20.current,
    });
  };

  //Manejador del select -  parte del buscador
  const handleSelect = (event) => {
    const newSelect = event.target.value;
    refselect.current = newSelect;
    updateSelect(newSelect);
    updateSelectR("");
    getCommerces({
      search: search,
      select: newSelect,
      selectR: "",
      filtrar10: ref10.current,
      filtrar15: ref15.current,
      filtrar20: ref20.current,
    });

    //control muestra el mapa por localidad
    const localidadCentral = searchLocalidades({ select: newSelect });
    const ubicacion = {
      lat: localidadCentral.Latitud,
      lng: localidadCentral.Longitud,
      zoom: 15,
    };
    setUbicacion(ubicacion);
  };

  // ordenar / checkbox
  const handleSort = () => {
    setSort(!sort);
  };

  //Manejador del cambio de búsqueda
  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetCommerces(newSearch, refselect.current, refselectR.current,ref10.current,ref15.current,ref20.current
      );
  };

  const { isChecked, toggleCheckbox } = useCheckbox();
  const handleMapCheckboxChange = () => {
    toggleCheckbox();
  };

  //controlando dropdownRubro
  const handleSelectRubro = (event) => {
    const selectR = event.target.value;
    updateSelectR(selectR);
    refselectR.current = selectR;
    getCommerces({
      search: search,
      select: refselect.current,
      selectR: refselectR.current,
      sort: sort,
      filtrar10: ref10.current,
      filtrar15: ref15.current,
      filtrar20: ref20.current,
    });
  };

  //boton que muestra filtros
  const filtrosClick = () => {
    setMostrarDiv(!mostrarDiv);
  };

  //#region precarga de datos
  const [localidades, setLocalidades] = useState([]);
  const [, setRubros] = useState([]);
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState(null);
  const [rubrosFiltrados, setRubrosFiltrados] = useState([]);
  const isFirstInput = useRef(true);
  const commercesRef = useRef([]);
  //Trae todos los datos
  useEffect(() => {
    if (isFirstInput.current) {
      getCommerces({ search: "", select: "", selectR: "" ,
      
      filtrar10: ref10.current,
      filtrar15: ref15.current,
      filtrar20: ref20.current,});
      isFirstInput.current = false;

      return;
    }
  }, []);

  //Carga las localidades que tengan comercios
  useEffect(() => {
    if (
      isFirstInput.current === false &&
      commerces !== undefined &&
      localidades.length === 0 &&
      commerces.length > 0
    ) {
      // todas las localidades únicas de los comercios
      const localidadesUnicas = [
        ...new Set(commerces.map((comercio) => comercio.localidad)),
      ];
      setLocalidades(localidadesUnicas);
      commercesRef.current = commerces;

      
    }
  }, [commerces]);

  useEffect(() => {
    if((commerces.length>0)&&(commerces.current !== commerces)){
      setComercios(commerces);
    }
  },[setComercios,commerces]);

  //Carga los rubros de cada localidad

  useEffect(() => {
    if (localidadSeleccionada !== null) {
      const rubrosEnLocalidad = commercesRef.current
        .filter((comercio) => comercio.localidad === localidadSeleccionada)
        .map((comercio) => comercio.rubro);
      const rubrosUnicos = [...new Set(rubrosEnLocalidad)];
      setRubros(rubrosUnicos); // Aquí se guardan todos los rubros
      setRubrosFiltrados(rubrosUnicos); // Y aquí los rubros filtrados
    }
  }, [localidadSeleccionada, commerces]);

  //#endregion

  //#region filtros
  //filtros %%
  
  let ref10=useRef(true);
  let ref15=useRef(true);
  let ref20=useRef(true);

  const handleFiltrar10 = () => {
    const updatedFiltrar10 = !filtrar10;
    setFiltrar10(updatedFiltrar10);
    ref10.current = updatedFiltrar10;
    getCommerces({
      search: search,
      select: refselect.current,
      selectR: refselectR.current,
      sort: sort,
      filtrar10: updatedFiltrar10,
      filtrar15: ref15.current,
      filtrar20: ref20.current,
    });
  };
  
  const handleFiltrar15 = () => {
    const updatedFiltrar15 = !filtrar15;
    setFiltrar15(updatedFiltrar15);
    ref15.current = updatedFiltrar15;
    getCommerces({
      search: search,
      select: refselect.current,
      selectR: refselectR.current,
      sort: sort,
      filtrar10: ref10.current,
      filtrar15:updatedFiltrar15,
      filtrar20: ref20.current,
    });
  };
  const handleFiltrar20 = () => {
    const updatedFiltrar20 = !filtrar20;
    setFiltrar20(updatedFiltrar20);
    ref20.current = updatedFiltrar20;
    getCommerces({
      search: search,
      select: refselect.current,
      selectR: refselectR.current,
      sort: sort,
      filtrar10: ref10.current,
      filtrar15: ref15.current,
      filtrar20: updatedFiltrar20,
    });
  };

  const enableFilter20=()=>{
    let existeValor = commerces.some((item) => item.dto ===20);
   
     return !existeValor
  };
//#endregion


return (
    <div className="page">
      <header className="   w-full">
        <div className="  p-6 xs:m-8 xxs:m-2   rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.29),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
          <form
            className="form flex  md:flex-col sm:flex-col xs:flex-col xxs:flex-col xxs:items-stretch "
            onSubmit={handleSubmit}
            id="formlist"
          >
            {localidades.length > 0 && (
              <select
                name="localidad"
                id="localidad"
                className="bg-gray-50 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-auto p-2.5 dark:bg-gray-300  dark:placeholder-gray-400 dark:text-gray-800 dark:hover:bg-gray-200 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={select}
                onChange={(e) => {
                  setLocalidadSeleccionada(e.target.value);
                  handleSelect(e);
                }}
              >
                <option value="">Localidad</option>
                {localidades.map((localidad) => (
                  <option key={localidad} value={localidad}>
                    {localidad}
                  </option>
                ))}
              </select>
            )}

            {/*input+dropdown rubro */}
            <div className=" relative w-auto pt-3">
              <div className="flex">
                <select
                  id="rubro"
                  name="rubro"
                  onChange={handleSelectRubro}
                  value={selectR}
                  className=" z-0 min-w-auto max-w-auto text-sm inline-flex items-center  max-w-auto font-normal text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-100 dark:bg-gray-300  dark:focus:ring-gray-700 dark:text-gray-800 "
                >
                  <option value="" className="">
                    Rubro
                  </option>
                  {rubrosFiltrados.map((rubro) => (
                    <option key={rubro} value={rubro} className="">
                      {rubro}
                    </option>
                  ))}
                </select>

                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-10 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-s-gray-400   dark:placeholder-gray-500 dark:text-gray-700 dark:focus:border-blue-500"
                    placeholder="Buscar Comercio"
                    onChange={handleChange}
                    value={search}
                    name="query"
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#4273b4] rounded-e-lg border border-[#4273b4] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#4273b4] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/*endrubros */}
            {/*filtros */}
            <div className=" transition-all ease-in-out duration-500 pt-2">
              <div
                className={`min-h-[50px] min-w-full  transition-all ease-in-out duration-500 -z-50  rounded-lg  text-dark ${
                  mostrarDiv
                    ? "opacity-100 translate-y-0 z-10"
                    : "opacity-0 -translate-y-full select-none -z-10 invisible hidden" //quitar hidden para tener animacion
                }`}
              >
                <div className=" grid grid-flow-col  gap-2">
                  <div
                    className="p-2 transition-all ease-in-out duration-500"
                    id="check10"
                  >
                    <label className="relative inline-flex cursor-pointer items-center ">
                      <input
                        id="switch1"
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked={filtrar10}
                        onChange={handleFiltrar10}
                      />
                      <label htmlFor="switch1" className="hidden"></label>
                      <div className="peer h-4 w-11 rounded-full border bg-gray-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#4273b4] peer-checked:after:translate-x-full peer-focus:ring-blue-300 "></div>
                    </label>
                    <div>
                      <label className="text-xs ">10% Dto</label>
                    </div>
                  </div>
                  <div className="p-2" id="check15">
                    <label className="relative inline-flex cursor-pointer items-center ">
                      <input
                        id="switch2"
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked={filtrar15}
                        onChange={handleFiltrar15}
                      />
                      <label htmlFor="switch2" className="hidden"></label>
                      <div className="peer h-4 w-11 rounded-full border bg-gray-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#4273b4] peer-checked:after:translate-x-full peer-focus:ring-blue-300 "></div>
                    </label>
                    <div>
                      <label className="text-xs ">15% Dto</label>
                    </div>
                  </div>
                  {enableFilter20() ? (
                          ""
                        ) : ( 
                          <div className="p-2" id="check20">
                    <label className="relative inline-flex cursor-pointer items-center ">
                      <input
                        id="switch20"
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked={filtrar20}
                        onChange={handleFiltrar20}
                      />
                      <label htmlFor="switch20" className="hidden"></label>
                      <div className="peer h-4 w-11 rounded-full border bg-gray-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#4273b4] peer-checked:after:translate-x-full peer-focus:ring-blue-300 "></div>
                    </label>
                    <div>
                      <label className="text-xs ">20% Dto</label>
                    </div>
                  </div>
                          )}

                  

                  <div className="p-2" id="checkmap">
                    <label className="relative inline-flex cursor-pointer items-center ">
                      <input
                        id="switch3"
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked={!isChecked}
                        onChange={handleMapCheckboxChange}
                      />
                      <label htmlFor="switch3" className="hidden"></label>
                      <div className="peer h-4 w-11 rounded-full border bg-gray-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#4273b4] peer-checked:after:translate-x-full peer-focus:ring-blue-300 "></div>
                    </label>
                    <div>
                      <label className="text-xs ">Mapa</label>
                    </div>
                  </div>

                  <div className="p-2" id="checkOrden">
                    <label className="relative inline-flex cursor-pointer items-center ">
                      <input
                        id="switch4"
                        type="checkbox"
                        className="peer sr-only"
                        onChange={handleSort}
                        checked={sort}
                      />
                      <label htmlFor="switch4" className="hidden"></label>
                      <div className="peer h-4 w-11 rounded-full border bg-gray-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#4273b4] peer-checked:after:translate-x-full peer-focus:ring-blue-300 "></div>
                    </label>
                    <div>
                      <label className="text-xs ">Ordenar</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center pt-1">
                <button
                  onClick={filtrosClick}
                  className="min-h-fit min-w-fit grid items-center  z-0 rounded-2xl bg-[#4273b4] shadow-[0_2px_15px_-3px_rgba(66, 115, 180,0.20),0_10px_20px_-2px_rgba(66, 115, 180,0.04)]"
                >
                  {mostrarDiv ? (
                    <FiChevronUp className="min-h-[30px] min-w-[30px] text-white " />
                  ) : (
                    <FiChevronDown className="min-h-[30px] min-w-[30px] text-white " />
                  )}

                  <p className="text-sm"> </p>
                </button>
              </div>
              <p className="text-center text-xs">Filtros</p>
            </div>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </header>

      <main className="">
        {loading ? <p>Cargando...</p> : <Commerces commerces={commerces} />}

        <Footer select={refselect.current} />
        
      </main>
    </div>
  );
}

export default Commerce;
