import React from 'react';
import { IoFilter } from 'react-icons/io5';

export default function FiltersPanel({
  mostrarDiv,
  setMostrarDiv,
  select,
  localidades,
  handleSelect,
  selectR,
  rubrosFiltrados,
  handleSelectRubro,
  filtrar10,
  filtrar15,
  filtrar20,
  toggleDiscountFilter,
  has20Discount,
  sort,
  setSort,
}) {
  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => setMostrarDiv((current) => !current)}
          className="mt-4 p-2 bg-primary text-white rounded-lg flex items-center gap-2"
          type="button"
        >
          {select ? `${select} - Filtros` : 'Seleccione su Localidad Aqui'}
          <IoFilter className="min-w-[20px] text-white" />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white border-l shadow-lg z-40 transition-transform transform ${
          mostrarDiv ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <div className="mb-4 mt-6">
            <select
              name="localidad"
              id="localidad"
              className="block w-full bg-gray-50 rounded-lg focus:ring-primary focus:border-primary cursor-pointer p-2"
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
              className="block w-full bg-gray-50 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary cursor-pointer p-2"
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

          <div className="bg-gray-50 flex flex-col items-start rounded-lg p-3 mb-4 gap-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={filtrar10}
                onChange={() => toggleDiscountFilter(10)}
                className="h-4 w-4"
              />
              <span className="text-sm">10% Dto</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={filtrar15}
                onChange={() => toggleDiscountFilter(15)}
                className="h-4 w-4"
              />
              <span className="text-sm">15% Dto</span>
            </label>
            {has20Discount && (
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={filtrar20}
                  onChange={() => toggleDiscountFilter(20)}
                  className="h-4 w-4"
                />
                <span className="text-sm">20% Dto</span>
              </label>
            )}
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={sort}
                onChange={() => setSort((current) => !current)}
                className="h-4 w-4"
              />
              <span className="text-sm">Ordenar</span>
            </label>
          </div>

          <button
            onClick={() => setMostrarDiv(false)}
            className="p-2 bg-primary rounded-lg text-white w-full"
            type="button"
          >
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
}
