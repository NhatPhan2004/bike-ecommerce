let baseUrl = "";

export const getBaseUrl = async () => {
  if (baseUrl) return baseUrl;

  try {
    const res = await fetch("/api/config");
    const data = await res.json();
    baseUrl = data.apiBaseUrl;
  } catch (err) {
    baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  }

  return baseUrl;
};
