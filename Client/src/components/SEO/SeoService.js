import axios from "axios";
import { config } from "../../services/Services";

export const getSeoDataById = async (setLoading, setSeos, id) => {
  try {
    setLoading(true);
    const { data } = await axios.get(`/api/seo/seos/${id}`, config);
    setLoading(false);
    setSeos(data);
  } catch (error) {
    console.log(error);
  }
};

export const getSeoData = async (setLoading, setSeos) => {
  try {
    setLoading(true);
    const { data } = await axios.get("/api/seo/seos", config);
    setLoading(false);
    setSeos(data);
  } catch (error) {
    console.log(error);
  }
};
