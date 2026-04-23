import footerimg from "../assets/Footerimgs.svg";
import { fetchMockJson } from "./fetchJson";

const DEFAULT_LOCALIDAD = {
  Localidad: "Bahia Blanca",
  Img: footerimg,
  Link: "https://www.coopeplus.com.ar",
  Latitud: -38.7153823,
  Longitud: -62.2657772,
};

const normalizeText = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

let localidadesPromise;

const getLocalidadesDataset = async () => {
  if (!localidadesPromise) {
    localidadesPromise = fetchMockJson("localidades.json").then(
      (data) => Object.values(data)[0]
    );
  }

  return localidadesPromise;
};

export const searchLocalidades = async ({ select }) => {
  if (!select) {
    return DEFAULT_LOCALIDAD;
  }

  try {
    const localidades = await getLocalidadesDataset();
    const normalizedSelect = normalizeText(select);

    const result = localidades.find(
      (item) => normalizeText(item.Localidad) === normalizedSelect
    );

    return result || DEFAULT_LOCALIDAD;
  } catch (error) {
    console.error("Error en busqueda de localidades:", error);
    localidadesPromise = undefined;
    return DEFAULT_LOCALIDAD;
  }
};
