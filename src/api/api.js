import axios from "axios";
const fetchRecipes = async () => {
  try {
    const response = await axios.get(
      "https://api.npoint.io/32399b015cfb1d04b83e"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
const fetchVideoScreens = async () => {
  try {
    const response = await axios.get(
      "https://api.npoint.io/b26981ec31637bf1e65b"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching video screens:", error);
    throw error;
  }
};

export { fetchRecipes, fetchVideoScreens };
