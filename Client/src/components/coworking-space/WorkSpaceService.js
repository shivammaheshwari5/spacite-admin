import axios from "axios";
import { config } from "../../services/Services";

export const getStateByCountry = async (countryId, setLoading, setStates) => {
  try {
    setLoading(true);

    const result = await axios.post(
      "/api/state/statesbycountry",
      { country_id: countryId },
      config
    );
    console.log("result", result);
    setStates(result.data);

    setLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};
export const getCityByState = async (stateId, setLoading, setCities) => {
  try {
    setLoading(true);

    await axios
      .post("/api/city/citybystate", { state_id: stateId }, config)
      .then((result) => {
        setCities(result.data);
      });
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const getMicrolocationByCity = async (
  cityId,
  setLoading,
  setMicrolocations
) => {
  try {
    setLoading(true);

    await axios
      .post("/api/microlocation/microbycity", { city_id: cityId }, config)
      .then((result) => {
        setMicrolocations(result.data);
      });
    setLoading(false);
    // setStates(data);
  } catch (error) {
    console.log(error);
  }
};

export const getCountry = async (setLoading, setCountry) => {
  try {
    setLoading(true);

    const { data } = await axios.get("/api/allCountry/countries", config);
    setLoading(false);
    setCountry(data.country);
  } catch (error) {
    console.log(error);
  }
};

export const getBrandsData = async (setLoading, setBrands) => {
  try {
    setLoading(true);
    const { data } = await axios.get("/api/brand/brands", config);
    setLoading(false);
    setBrands(data);
  } catch (error) {
    console.log(error);
  }
};
export const getAmenities = async (setLoading, setAmenities) => {
  try {
    setLoading(true);

    const { data } = await axios.get("/api/amenity/amenities", config);
    setLoading(false);
    setAmenities(data);
  } catch (error) {
    console.log(error);
  }
};
export const getCategory = async (setLoading, setCategories) => {
  try {
    setLoading(true);

    const { data } = await axios.get("/api/propertyType/propertyTypes", config);
    setLoading(false);
    setCategories(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (
  files,
  setProgress,
  setIsUploaded,
  previewFile
) => {
  const formData = new FormData();
  setProgress(0);
  files.forEach((file) => {
    formData.append("files", file, file.name);
  });
  await axios
    .post("/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        setProgress(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      },
    })
    .then((res) => {
      previewFile(res.data);
      setTimeout(() => {
        setProgress(0);
      }, 3000);
      setIsUploaded(true);
    })
    .catch((err) => {
      console.log(err);
    });
};
