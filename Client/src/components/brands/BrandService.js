import axios from "axios";
import { config } from "../../services/Services";

export const getBrandsDataById = async (setLoading, setBrands, id) => {
  try {
    setLoading(true);
    const { data } = await axios.get(`/api/brand/brands/${id}`, config);
    setLoading(false);
    setBrands(data);
  } catch (error) {
    console.log(error);
  }
};

export const getCity = async (setAllCity) => {
  try {
    const { data } = await axios.get("/api/city/cities", config);
    setAllCity(data);
  } catch (error) {
    console.log(error);
  }
};
