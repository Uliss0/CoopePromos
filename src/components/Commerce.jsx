import "../App.css";
import "./Commerce.css";
import { useState, useCallback, useRef, useContext, useEffect } from "react";
import { useCommerces } from "../hooks/useCommerces.js";
import { useCheckbox } from "../context/CheckContext.js";
import { Commerces } from "./Card.jsx";
import Footer from "./Footer.jsx";
import debounce from "just-debounce-it";
import { CommercesContext } from "../context/CommercesContext.js";
import { searchLocalidades } from "../services/localitiesService.js";
import { IoFilter } from "react-icons/io5";
import ScrollToTop from "./buttons/ScrollToTop.jsx";
import { UbicacionContext } from "../context/UbicacionContext.js";
import Spinner from "./Spinner.jsx";


function useSearch() {
  const [search, updateSearch] = useState("");
  const [error] = useState(null);

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
  };
  useEffect(() => {
    const fetchAndSetLocation = async () => {
      const localidadCentral = await searchLocalidades({ select });
      const ubicacion = {
        lat: localidadCentral.Latitud,
        lng: localidadCentral.Longitud,
        zoom: 15,
      };

      setUbicacion(ubicacion);
    };

    fetchAndSetLocation();
  }, [select, setUbicacion]);

  // ordenar / checkbox
  const handleSort = () => {
    setSort(!sort);
  };

  //Manejador del cambio de búsqueda
  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetCommerces(
      newSearch,
      refselect.current,
      refselectR.current,
      ref10.current,
      ref15.current,
      ref20.current
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
      getCommerces({
        search: "",
        select: "",
        selectR: "",

        filtrar10: ref10.current,
        filtrar15: ref15.current,
        filtrar20: ref20.current,
      });
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
    if (commerces.length > 0 && commerces.current !== commerces) {
      setComercios(commerces);
    }
  }, [setComercios, commerces]);

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

  let ref10 = useRef(true);
  let ref15 = useRef(true);
  let ref20 = useRef(true);

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
      filtrar15: updatedFiltrar15,
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

  let previo = useRef(0);
  const enableFilter20 = () => {
    let existeValor = commerces.some((item) => item.dto === 20);
    if (previo.current !== 0 || existeValor) {
      previo.current = 1;
      return false;
    }

    return !existeValor;
  };
  //#endregion

  return (
    <div>
      <ScrollToTop />
      <div className="page">
        <header className="   w-full">
        
          <div className=" xs:m-8 xxs:m-2 xl:mr-96 xl:ml-72  rounded-xl">
            <form
              className="form flex items-center space-x-4"
              onSubmit={handleSubmit}
              id="formlist"
            >
              <div className="relative w-full flex items-center">
                <input
                  type="search"
                  id="search-dropdown"
                  className=" rounded-l-2xl p-2  w-full  text-sm text-gray-900 bg-gray-50  border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-400 dark:placeholder-gray-500 dark:text-gray-700 dark:focus:border-blue-500"
                  placeholder="Buscar Comercio"
                  onChange={handleChange}
                  value={search}
                  name="query"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="rounded-r-2xl p-2.5  text-sm font-medium h-full text-white bg-[#4273b4] border border-[#4273b4] hover:bg-blue-800  focus:outline-none  dark:bg-[#4273b4] dark:hover:bg-blue-700 "
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
              <div className="flex items-center space-x-2" id="checkmap">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    id="switch3"
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked={!isChecked}
                    onChange={handleMapCheckboxChange}
                  />
                  <label htmlFor="switch3" className="hidden"></label>
                  <div className="peer h-4 w-11 rounded-full border bg-gray-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#4273b4] peer-checked:after:translate-x-full peer-focus:ring-blue-300"></div>
                </label>
                <label className="text-xs">Mapa</label>
              </div>
            </form>

            <div className=" flex justify-center ">
              <button
                onClick={filtrosClick}
                className="mt-4 p-2 bg-[#4273b4] text-white rounded-lg flex"
              >
                {localidadSeleccionada
                  ? localidadSeleccionada + " - Filtros"
                  : "Seleccione su Localidad Aqui"}{" "}
                <IoFilter className="min-w-[30px] text-white mt-1" />
              </button>
            </div>
            <div
              className={`fixed top-0 right-0 w-64 h-full bg-gray-300 shadow-lg z-40 transition-transform transform ${
                mostrarDiv ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Filtros</h2>
                {/* Aquí van tus filtros */}
                <div className="mb-4 mt-10">
                  <label className="block mb-2"></label>
                  <select
                    name="localidad"
                    id="localidad"
                    className="block w-full bg-gray-50  rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200  dark:placeholder-gray-400 dark:text-gray-800 dark:hover:bg-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer p-1 "
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
                </div>
                <div className="mb-4">
                  <label className="block mb-2"></label>
                  <select
                    id="rubro"
                    name="rubro"
                    onChange={handleSelectRubro}
                    value={selectR}
                    className="block w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:placeholder-gray-400 dark:text-gray-800 dark:hover:bg-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer p-1"
                  >
                    <option value="">Rubro</option>
                    {rubrosFiltrados.map((rubro) => (
                      <option key={rubro} value={rubro}>
                        {rubro}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bg-gray-200 flex flex-col items-center justify-center rounded-lg p-2 mb-4">
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
                <button
                  onClick={filtrosClick}
                  className=" p-2 bg-[#4273b4] rounded-lg text-white"
                >
                  Cerrar
                </button>
              </div>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </header>

        <main className="">
          {loading ? <Spinner/> : <Commerces commerces={commerces} />}

          <Footer select={refselect.current} />
        </main>
      </div>
      
    </div>
  );
}

export default Commerce;
