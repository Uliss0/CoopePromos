import React, { useMemo, useState } from 'react';

export default function SearchBar({ value, onChange, onSubmit, toggleMap, isChecked, suggestionsData = [], onSelectSuggestion }) {
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => {
    const q = String(value || '').trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const seen = new Set();
    const out = [];

    for (const item of suggestionsData) {
      if (out.length >= 6) break;
      const name = (item?.nombre || item?.name || '') + '';
      const rubro = (item?.rubro || '') + '';
      const direccion = (item?.direccion || item?.direccion_corta || '') + '';
      const combined = `${name} ${rubro} ${direccion}`.toLowerCase();
      if (combined.includes(q)) {
        const label = name || rubro || direccion || 'Comercio';
        if (!seen.has(label)) {
          seen.add(label);
          out.push({ label, raw: item });
        }
      }
    }

    return out;
  }, [value, suggestionsData]);

  const handleSelect = (s) => {
    if (onSelectSuggestion) onSelectSuggestion(s.raw);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <form className="form flex items-center space-x-4" onSubmit={onSubmit} aria-label="Busqueda">
        <div className="relative w-full flex items-center">
          <input
            type="search"
            className="rounded-l-2xl p-2 w-full text-sm text-gray-900 bg-white border border-gray-200 focus:ring-primary focus:border-primary placeholder-gray-400"
            placeholder="Buscar comercio, rubro o dirección"
            onChange={onChange}
            value={value}
            name="query"
            autoComplete="off"
            aria-label="Buscar comercios"
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
          />
          <button
            type="submit"
            className="rounded-r-2xl p-2.5 text-sm font-medium h-full text-white bg-primary border border-primary hover:opacity-90 focus:outline-none transition"
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
              onChange={toggleMap}
            />
            <span className="hidden">Mapa</span>
            <div className="peer h-4 w-11 rounded-full border bg-gray-300 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:ring-primary"></div>
          </label>
          <label className="text-xs" htmlFor="switch3">
            Mapa
          </label>
        </div>
      </form>

      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-200 shadow-md mt-2 rounded-md overflow-hidden z-50">
          {suggestions.map((s, idx) => (
            <li
              key={`${s.label}-${idx}`}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onMouseDown={() => handleSelect(s)}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

