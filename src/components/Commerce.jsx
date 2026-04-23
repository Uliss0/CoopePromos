import "../App.css";
import "./Commerce.css";
import {
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCommerces } from "../hooks/useCommerces.js";
import { useCheckbox } from "../context/CheckContext.js";
import { Commerces } from "./Card.jsx";
import Footer from "./Footer.jsx";
import { CommercesContext } from "../context/CommercesContext.js";
import { searchLocalidades } from "../services/localitiesService.js";
import { IoFilter } from "react-icons/io5";
import ScrollToTop from "./buttons/ScrollToTop.jsx";
import { UbicacionContext } from "../context/UbicacionContext.js";
import Spinner from "./Spinner.jsx";

const DEFAULT_LOCATION = {
  lat: -38.7153823,
  lng: -62.2657772,
  zoom: 15,
};

const sortByLabel = (items) =>
  [...items].sort((left, right) => left.localeCompare(right, "es"));

function Commerce() {
  const { setUbicacion } = useContext(UbicacionContext);
  const { setComercios } = useContext(CommercesContext);
  const { isChecked, toggleCheckbox } = useCheckbox();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [select, setSelect] = useState("");
  const [selectR, setSelectR] = useState("");
  const [sort, setSort] = useState(false);
  const [mostrarDiv, setMostrarDiv] = useState(false);
  const [filtrar10, setFiltrar10] = useState(true);
  const [filtrar15, setFiltrar15] = useState(true);
  const [filtrar20, setFiltrar20] = useState(true);
  const [catalogCommerces, setCatalogCommerces] = useState([]);

  const deferredSearch = useDeferredValue(search);
  const { commerces, loading, getCommerces } = useCommerces({ sort });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(deferredSearch.trim());
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [deferredSearch]);

  const activeFilters = useMemo(
    () => ({
      search: debouncedSearch,
      select,
      selectR,
      filtrar10,
      filtrar15,
      filtrar20,
    }),
    [debouncedSearch, select, selectR, filtrar10, filtrar15, filtrar20]
  );

  useEffect(() => {
    getCommerces(activeFilters);
  }, [activeFilters, getCommerces]);

  useEffect(() => {
    setComercios(commerces);
  }, [commerces, setComercios]);

  useEffect(() => {
    const hasNoFilters =
      !debouncedSearch && !select && !selectR && filtrar10 && filtrar15 && filtrar20;

    if (hasNoFilters && commerces.length > 0) {
      setCatalogCommerces(commerces);
    }
  }, [commerces, debouncedSearch, select, selectR, filtrar10, filtrar15, filtrar20]);

  useEffect(() => {
    let ignore = false;

    const fetchAndSetLocation = async () => {
      const localidadCentral = await searchLocalidades({ select });

      if (ignore) {
        return;
      }

      const hasCoordinates =
        localidadCentral?.Latitud !== undefined &&
        localidadCentral?.Longitud !== undefined;

      if (!hasCoordinates) {
        setUbicacion(DEFAULT_LOCATION);
        return;
      }

      setUbicacion({
        lat: localidadCentral.Latitud,
        lng: localidadCentral.Longitud,
        zoom: 15,
      });
    };

    fetchAndSetLocation();

    return () => {
      ignore = true;
    };
  }, [select, setUbicacion]);

  const commerceCatalog = catalogCommerces.length > 0 ? catalogCommerces : commerces;

  const localidades = useMemo(() => {
    const uniqueLocalidades = new Set(
      commerceCatalog.map((commerce) => commerce.localidad).filter(Boolean)
    );

    return sortByLabel([...uniqueLocalidades]);
  }, [commerceCatalog]);

  const rubrosFiltrados = useMemo(() => {
    const rubros = commerceCatalog
      .filter((commerce) => !select || commerce.localidad === select)
      .map((commerce) => commerce.rubro)
      .filter(Boolean);

    return sortByLabel([...new Set(rubros)]);
  }, [commerceCatalog, select]);

  const has20Discount = useMemo(
    () => commerceCatalog.some((item) => item.dto === 20),
    [commerceCatalog]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextSearch = search.trim();
    setDebouncedSearch(nextSearch);
    getCommerces({
      search: nextSearch,
      select,
      selectR,
      filtrar10,
      filtrar15,
      filtrar20,
    });
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSelect = (event) => {
    const newSelect = event.target.value;
    setSelect(newSelect);
    setSelectR("");
  };

  const handleSelectRubro = (event) => {
    setSelectR(event.target.value);
  };

  const toggleDiscountFilter = (discount) => {
    if (discount === 10) {
      setFiltrar10((current) => !current);
      return;
    }

    if (discount === 15) {
      setFiltrar15((current) => !current);
      return;
    }

    setFiltrar20((current) => !current);
  };

  return (
    <div>
      <ScrollToTop />
      <div className="page">
        <header className="w-full">
          <div className="xs:m-8 xxs:m-2 xl:mr-96 xl:ml-72 rounded-xl">
            <form
              className="form flex items-center space-x-4"
              onSubmit={handleSubmit}
              id="formlist"
            >
              <div className="relative w-full flex items-center">
                <input
                  type="search"
                  id="search-dropdown"
                  className="rounded-l-2xl p-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-400 dark:placeholder-gray-500 dark:text-gray-700 dark:focus:border-blue-500"
                  placeholder="Buscar comercio, rubro o dirección"
                  onChange={handleChange}
                  value={search}
                  name="query"
                  autoComplete="off"
                  aria-label="Buscar comercios"
                />
                <button
                  type="submit"
                  className="rounded-r-2xl p-2.5 text-sm font-medium h-full text-white bg-[#4273b4] border border-[#4273b4] hover:bg-blue-800 focus:outline-none dark:bg-[#4273b4] dark:hover:bg-blue-700"
                  aria-label="Buscar"
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
                    checked={!isChecked}
                    onChange={toggleCheckbox}
                  />
                  <span className="hidden">Mapa</span>
                  <div className="peer h-4 w-11 rounded-full border bg-gray-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#4273b4] peer-checked:after:translate-x-full peer-focus:ring-blue-300"></div>
                </label>
                <label className="text-xs" htmlFor="switch3">
                  Mapa
                </label>
              </div>
            </form>

            <div className="flex justify-center">
              <button
                onClick={() => setMostrarDiv((current) => !current)}
                className="mt-4 p-2 bg-[#4273b4] text-white rounded-lg flex"
                type="button"
              >
                {select ? `${select} - Filtros` : "Seleccione su Localidad Aqui"}{" "}
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
                <div className="mb-4 mt-10">
                  <select
                    name="localidad"
                    id="localidad"
                    className="block w-full bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:placeholder-gray-400 dark:text-gray-800 dark:hover:bg-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer p-1"
                    value={select}
                    onChange={handleSelect}
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
                  <select
                    id="rubro"
                    name="rubro"
                    onChange={handleSelectRubro}
                    value={selectR}
                    className="block w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:placeholder-gray-400 dark:text-gray-800 dark:hover:bg-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer p-1"
                    disabled={!select}
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
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        id="switch1"
                        type="checkbox"
                        className="peer sr-only"
                        checked={filtrar10}
                        onChange={() => toggleDiscountFilter(10)}
                      />
                      <span className="hidden">10% descuento</span>
                      <div className="peer h-4 w-11 rounded-full border bg-gray-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#4273b4] peer-checked:after:translate-x-full peer-focus:ring-blue-300"></div>
                    </label>
                    <div>
                      <label className="text-xs" htmlFor="switch1">
                        10% Dto
                      </label>
                    </div>
                  </div>
                  <div className="p-2" id="check15">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        id="switch2"
                        type="checkbox"
                        className="peer sr-only"
                        checked={filtrar15}
                        onChange={() => toggleDiscountFilter(15)}
                      />
                      <span className="hidden">15% descuento</span>
                      <div className="peer h-4 w-11 rounded-full border bg-gray-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#4273b4] peer-checked:after:translate-x-full peer-focus:ring-blue-300"></div>
                    </label>
                    <div>
                      <label className="text-xs" htmlFor="switch2">
                        15% Dto
                      </label>
                    </div>
                  </div>
                  {has20Discount && (
                    <div className="p-2" id="check20">
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          id="switch20"
                          type="checkbox"
                          className="peer sr-only"
                          checked={filtrar20}
                          onChange={() => toggleDiscountFilter(20)}
                        />
                        <span className="hidden">20% descuento</span>
                        <div className="peer h-4 w-11 rounded-full border bg-gray-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#4273b4] peer-checked:after:translate-x-full peer-focus:ring-blue-300"></div>
                      </label>
                      <div>
                        <label className="text-xs" htmlFor="switch20">
                          20% Dto
                        </label>
                      </div>
                    </div>
                  )}
                  <div className="p-2" id="checkOrden">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        id="switch4"
                        type="checkbox"
                        className="peer sr-only"
                        onChange={() => setSort((current) => !current)}
                        checked={sort}
                      />
                      <span className="hidden">Ordenar alfabéticamente</span>
                      <div className="peer h-4 w-11 rounded-full border bg-gray-400 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#4273b4] peer-checked:after:translate-x-full peer-focus:ring-blue-300"></div>
                    </label>
                    <div>
                      <label className="text-xs" htmlFor="switch4">
                        Ordenar
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setMostrarDiv(false)}
                  className="p-2 bg-[#4273b4] rounded-lg text-white"
                  type="button"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </header>

        <main>
          {loading ? <Spinner /> : <Commerces commerces={commerces} />}
          <Footer select={select} />
        </main>
      </div>
    </div>
  );
}

export default Commerce;
