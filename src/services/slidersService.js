import { fetchMockJson } from "./fetchJson";

const searchSliderAsync = async () => {
  try {
    const data = await fetchMockJson("slider.json");
    const arr = Object.values(data)[0];
    return arr;
  } catch (e) {
    throw new Error("Error searching: " + e.message);
  }
};

export default searchSliderAsync
