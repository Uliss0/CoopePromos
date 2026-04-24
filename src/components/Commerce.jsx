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
import SearchBar from "./SearchBar.jsx";
import FiltersPanel from "./FiltersPanel.jsx";

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

  const handleSelectSuggestion = (item) => {
    const next = item?.nombre || item?.name || "";
    setSearch(next);
    setDebouncedSearch(next.trim());
    getCommerces({
      search: next.trim(),
      select,
      selectR,
      filtrar10,
      filtrar15,
      filtrar20,
    });
  };

  return (
    <div>
      <ScrollToTop />
      <div className="page">
        <header className="w-full">
          <div className="xs:m-8 xxs:m-2 xl:mr-96 xl:ml-72 rounded-xl">
            <SearchBar
              value={search}
              onChange={handleChange}
              onSubmit={handleSubmit}
              toggleMap={toggleCheckbox}
              isChecked={isChecked}
              suggestionsData={commerces}
              onSelectSuggestion={handleSelectSuggestion}
            />

            <FiltersPanel
              mostrarDiv={mostrarDiv}
              setMostrarDiv={setMostrarDiv}
              select={select}
              localidades={localidades}
              handleSelect={handleSelect}
              selectR={selectR}
              rubrosFiltrados={rubrosFiltrados}
              handleSelectRubro={handleSelectRubro}
              filtrar10={filtrar10}
              filtrar15={filtrar15}
              filtrar20={filtrar20}
              toggleDiscountFilter={toggleDiscountFilter}
              has20Discount={has20Discount}
              sort={sort}
              setSort={setSort}
            />
          </div>
        </header>

        <main>
          <Commerces commerces={commerces} loading={loading} />
          <Footer select={select} />
        </main>
      </div>
    </div>
  );
}

export default Commerce;
