const REMOTE_BASE_URL =
  "https://www.coopeplus.com.ar/contenidos/LandingPage/lp_map/mocks";

const LOCAL_BASE_URL = "/mocks";

const fetchJsonFromUrl = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network response was not ok for ${url}`);
  }

  return response.json();
};

export const fetchMockJson = async (fileName) => {
  const localUrl = `${LOCAL_BASE_URL}/${fileName}`;

  try {
    return await fetchJsonFromUrl(localUrl);
  } catch (localError) {
    const remoteUrl = `${REMOTE_BASE_URL}/${fileName}`;

    try {
      return await fetchJsonFromUrl(remoteUrl);
    } catch (remoteError) {
      throw new Error(
        `No se pudo cargar ${fileName} ni desde ${localUrl} ni desde ${remoteUrl}`
      );
    }
  }
};
