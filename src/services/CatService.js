export const getCats = async (signal) => {
  const response = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=6",
    { signal }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cat images");
  }
  return response.json();
};
