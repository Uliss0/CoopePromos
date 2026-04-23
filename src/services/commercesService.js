import { fetchMockJson } from "./fetchJson";

let commercesPromise;

const normalizeText = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const mapCommerce = (commerce) => ({
  id: commerce.ID,
  nomComercio: commerce.NomComercio,
  localidad: commerce.Localidad,
  rubro: commerce.Rubro,
  direccion: commerce.Direccion,
  dto: commerce.Dto,
  provincia: commerce.Provincia,
  lat: commerce.Latitud,
  lng: commerce.Longitud,
  telefono: commerce.NroTel,
  prefijo: commerce.Prefijo,
  img: commerce.Img,
  key: JSON.stringify({
    id: commerce.ID,
    nomComercio: commerce.NomComercio,
    localidad: commerce.Localidad,
    rubro: commerce.Rubro,
    direccion: commerce.Direccion,
    dto: commerce.Dto,
    lat: commerce.Latitud,
    lng: commerce.Longitud,
    telefono: commerce.NroTel,
    prefijo: commerce.Prefijo,
  }),
});

const getCommercesDataset = async () => {
  if (!commercesPromise) {
    commercesPromise = fetchMockJson("comercios.json").then(
      (data) => Object.values(data)[0]
    );
  }

  return commercesPromise;
};

export const searchCommerces = async ({
  search = "",
  select = "",
  selectR = "",
  filtrar10 = true,
  filtrar15 = true,
  filtrar20 = true,
}) => {
  try {
    const commerces = await getCommercesDataset();
    const normalizedSearch = normalizeText(search);
    const searchTokens = normalizedSearch.split(/\s+/).filter(Boolean);
    const normalizedSelect = normalizeText(select);
    const normalizedRubro = normalizeText(selectR);

    let filteredCommerces = commerces;

    if (normalizedSelect) {
      filteredCommerces = filteredCommerces.filter(
        (item) => normalizeText(item.Localidad) === normalizedSelect
      );
    }

    if (normalizedRubro) {
      filteredCommerces = filteredCommerces.filter(
        (item) => normalizeText(item.Rubro) === normalizedRubro
      );
    }

    if (!filtrar10) {
      filteredCommerces = filteredCommerces.filter((item) => item.Dto !== 10);
    }

    if (!filtrar15) {
      filteredCommerces = filteredCommerces.filter((item) => item.Dto !== 15);
    }

    if (!filtrar20) {
      filteredCommerces = filteredCommerces.filter((item) => item.Dto !== 20);
    }

    if (searchTokens.length > 0) {
      filteredCommerces = filteredCommerces.filter((item) => {
        const searchableText = normalizeText(
          [
            item.NomComercio,
            item.Rubro,
            item.Direccion,
            item.Localidad,
            item.Provincia,
          ]
            .filter(Boolean)
            .join(" ")
        );

        return searchTokens.every((token) => searchableText.includes(token));
      });
    }

    return filteredCommerces.map(mapCommerce);
  } catch (e) {
    commercesPromise = undefined;
    throw new Error("Error searching");
  }
};
