import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { IoIosAddCircle } from "react-icons/io";
import ImageUpload from "../../ImageUpload";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Multiselect from "multiselect-react-dropdown";
import { AiFillDelete } from "react-icons/ai";
import { postConfig, config } from "../../services/Services";
const initialValue = {
  name: "",
  description: "",
  images: [],
  amenties: "",
  seo: {
    title: "",
    description: "",
    robots: "",
    keywords: "",
    url: "",
    status: false,
    twitter: {
      title: "",
      description: "",
    },
    open_graph: {
      title: "",
      description: "",
    },
  },
  location: {
    address: "",
    country: "",
    state: "",
    city: "",
    micro_location: "",
    latitude: "",
    longitude: "",
  },
  no_of_seats: "",
  hours_of_operation: {
    monday_friday: {
      from: "",
      to: "",
    },
    saturday: {
      from: "",
      to: "",
    },
    sunday: {
      from: "",
      to: "",
    },
  },
  plans: [
    {
      category: "",
      price: "",
      duration: "",
    },
  ],
  brand: {},
  slug: "",
};

const EditWorkSpace = () => {
  const [loading, setLoading] = useState(false);
  const [allplans, setAllPlans] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [updateTable, setUpdateTable] = useState(false);
  const [image, setImage] = useState([]);
  const [progress, setProgress] = useState(0);
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [microlocations, setMicrolocations] = useState([]);
  const [allAmenities, setAllAmenities] = useState([]);
  const [workSpaces, setWorkSpaces] = useState(initialValue);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const {
    name,
    description,
    no_of_seats,
    website_Url,
    images,
    amenties,
    location,
    hours_of_operation,
    plans,
    slug,
    seo,
    brand,
    is_popular,
  } = workSpaces;
  const [open, setOpen] = useState({
    fullOpen1: false,
    isClose1: false,
    fullOpen2: false,
    isClose2: false,
    fullOpen3: false,
    isClose3: false,
  });
  const { fullOpen1, isClose1, fullOpen2, isClose2, fullOpen3, isClose3 } =
    open;
  const [options, setOptions] = useState([
    { name: "01:00 AM" },
    { name: "01:15 AM" },
    { name: "01:30 AM" },
    { name: "01:45 AM" },
    { name: "02:00 AM" },
    { name: "02:15 AM" },
    { name: "02:30 AM" },
    { name: "02:45 AM" },
    { name: "03:00 AM" },
    { name: "03:15 AM" },
    { name: "03:30 AM" },
  ]);
  const [checkedAmenities, setCheckedAmenities] = useState([]);

  const openFullHoursHandler = (e) => {
    if (e.target.checked && e.target.value === "mon-fri") {
      setOpen({ ...open, fullOpen1: true });
    } else if (!e.target.checked && e.target.value === "mon-fri") {
      setOpen({ ...open, fullOpen1: false });
    } else if (e.target.checked && e.target.value === "sat") {
      setOpen({ ...open, fullOpen2: true });
    } else if (!e.target.checked && e.target.value === "sat") {
      setOpen({ ...open, fullOpen2: false });
    } else if (e.target.checked && e.target.value === "sun") {
      setOpen({ ...open, fullOpen3: true });
    } else if (!e.target.checked && e.target.value === "sun") {
      setOpen({ ...open, fullOpen3: false });
    }
  };

  const closeHandler = (e) => {
    if (e.target.checked && e.target.value === "mon-fri-close") {
      setOpen({ ...open, isClose1: true });
    } else if (!e.target.checked && e.target.value === "mon-fri-close") {
      setOpen({ ...open, isClose1: false });
    } else if (e.target.checked && e.target.value === "sat") {
      setOpen({ ...open, isClose2: true });
    } else if (!e.target.checked && e.target.value === "sat") {
      setOpen({ ...open, isClose2: false });
    } else if (e.target.checked && e.target.value === "sun") {
      setOpen({ ...open, isClose3: true });
    } else if (!e.target.checked && e.target.value === "sun") {
      setOpen({ ...open, isClose3: false });
    }
  };
  useEffect(() => {
    if (plans) {
      setAllPlans(plans);
    }
  }, [plans]);
  const createPlans = () => {
    const newRow = {
      id: allplans.length + 1,
      category: "",
      price: "",
      duration: "",
    };
    setAllPlans((prevRows) => [...prevRows, newRow]);
  };

  const removePlan = (id) => {
    setAllPlans((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  const onChangePlanHandler = (e, id) => {
    const { name, value } = e.target;
    setAllPlans((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [name]: value } : row))
    );
  };

  const onChangePlanHandler2 = (e, id) => {
    const { value } = e.target;
    setAllPlans((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, duration: value } : row))
    );
  };

  const handleInputPlanChange = (e, id) => {
    const { name, value } = e.target;
    setAllPlans((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [name]: value } : row))
    );
  };
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleInputChange = (e) => {
    setWorkSpaces({ ...workSpaces, [e.target.name]: e.target.value });
  };
  const handleInputChangeObject = (event, section, property) => {
    const { value } = event.target;
    const updatedState = {
      ...workSpaces,
      [section]: {
        ...workSpaces[section],
        [property]: value,
      },
    };
    setWorkSpaces(updatedState);
  };
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    const [category, subCategory, property] = name.split(".");

    setWorkSpaces((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [subCategory]: {
          ...prevState[category][subCategory],
          [property]: value,
        },
      },
    }));
  };
  const handleEditWorkSpace = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/workSpace/workSpaces/${id}`,
        {
          name: name,
          description: footer_descrip,
          // images: images,
          amenties: checkedAmenities,
          seo: {
            title: seo.title,
            description: seo.description,
            robots: seo.robots,
            keywords: seo.keywords,
            url: seo.url,
            twitter: {
              title: seo.twitter.title,
              description: seo.twitter.description,
            },
            open_graph: {
              title: seo.open_graph.title,
              description: seo.open_graph.description,
            },
          },
          location: {
            address: location.address,
            country: location.country,
            state: location.state,
            city: location.city,
            micro_location: location.micro_location,
            latitude: location.latitude,
            longitude: location.longitude,
          },
          no_of_seats,
          //    hours_of_operation: {
          //      monday_friday: {
          //        from: selectedval1[0].name,
          //        to: selectedval2[0].name,
          //      },
          //      saturday: {
          //        from: selectedval3[0].name,
          //        to: selectedval4[0].name,
          //      },
          //      sunday: {
          //        from: selectedval5[0].name,
          //        to: selectedval6[0].name,
          //      },
          //    },
          plans: allplans,

          // status,
          brand,
          slug,
        },
        postConfig
      );
      setWorkSpaces(data);
      setUpdateTable((prev) => !prev);
      navigate("/coworking-space");
      toast({
        title: "Update Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const footer_descrip = convertToRaw(editorState.getCurrentContent()).blocks[0]
    .text;
  useEffect(() => {
    const contentState = ContentState.createFromText(description || "empty");
    const initialEditorState = EditorState.createWithContent(contentState);
    setEditorState(initialEditorState);
  }, [workSpaces]);

  const getWorkSpacesDataById = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/workSpace/workSpaces/${id}`,
        config
      );

      setWorkSpaces(data);

      getStateByCountry(data.location.country);
      getCityByState(data.location.state);
      getMicrolocationByCity(data.location.city);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCityByState = async (id) => {
    try {
      setLoading(true);
      location.state = id;

      await axios
        .post("/api/city/citybystate", { state_id: location.state }, config)
        .then((result) => {
          setCities(result.data);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getStateByCountry = async (id) => {
    try {
      setLoading(true);
      location.country = id;

      await axios
        .post(
          "/api/state/statesbycountry",
          { country_id: location.country },
          config
        )
        .then((result) => {
          setStates(result.data);
        });
      setLoading(false);
      // setStates(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMicrolocationByCity = async (id) => {
    try {
      setLoading(true);
      location.city = id;

      await axios
        .post(
          "/api/microlocation/microbycity",
          { city_id: location.city },
          config
        )
        .then((result) => {
          setMicrolocations(result.data);
        });
      setLoading(false);
      // setStates(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCountry = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/allCountry/countries", config);
      setLoading(false);
      setCountry(data.country);
    } catch (error) {
      console.log(error);
    }
  };
  const getBrandsData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/brand/brands", config);
      setLoading(false);
      setBrands(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAmenities = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/amenity/amenities", config);
      setLoading(false);
      setAllAmenities(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategory = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "/api/propertyType/propertyTypes",
        config
      );
      setLoading(false);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (amenties) {
      setCheckedAmenities(amenties);
    }
  }, [amenties]);

  const handleCheckboxChange = (event) => {
    const amenityId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the ID to the array if it's checked
      setCheckedAmenities((prevCheckedAmenities) => [
        ...prevCheckedAmenities,
        amenityId,
      ]);
    } else {
      // Remove the ID from the array if it's unchecked
      setCheckedAmenities((prevCheckedAmenities) =>
        prevCheckedAmenities.filter((id) => id !== amenityId)
      );
    }
  };

  useEffect(() => {
    getCountry();
    getBrandsData();
    getAmenities();
    getCategory();
    getWorkSpacesDataById();
  }, [updateTable]);
  const previewFile = (data) => {
    const allimages = image;
    setImage(allimages.concat(data));
  };

  const uploadFile = (files) => {
    const formData = new FormData();
    setProgress(0);
    files.forEach((file) => {
      formData.append("files", file, file.name);
    });
    axios
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <div className="container form-box">
        <form style={{ textAlign: "left" }} onSubmit={handleEditWorkSpace}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div
                  style={{ borderBottom: "1px solid gray", margin: "20px 0" }}
                >
                  <select
                    className="form-select"
                    name="brand"
                    aria-label="Default select example"
                    value={brand}
                    onChange={handleInputChange}
                  >
                    <option>Select a brand</option>
                    {brands?.map((brand) => (
                      <option id={brand._id} key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <input
                  className="property-input"
                  type="text"
                  placeholder="Name*"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                />
              </div>
            </div>
            <h4>Slug Update</h4>
            <div className="row">
              <div className="col-md-12">
                <input
                  className="property-input"
                  type="text"
                  placeholder="Slug"
                  value={slug}
                  name="slug"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <h4>SEO Details</h4>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Title*"
                  className="property-input"
                  required
                  name="seo"
                  value={seo.title}
                  onChange={(event) =>
                    handleInputChangeObject(event, "seo", "title")
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Description*"
                  className="property-input"
                  required
                  name="seo"
                  value={seo.description}
                  onChange={(event) =>
                    handleInputChangeObject(event, "seo", "description")
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Keywords*"
                  name="seo"
                  className="property-input"
                  value={seo.keywords}
                  onChange={(event) =>
                    handleInputChangeObject(event, "seo", "keywords")
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="URL*"
                  className="property-input"
                  name="seo"
                  value={seo.url}
                  onChange={(event) =>
                    handleInputChangeObject(event, "seo", "url")
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div
                  style={{ borderBottom: "1px solid gray", margin: "20px 0" }}
                >
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Robots"
                  name="seo"
                  value={seo.robots}
                  onChange={(event) =>
                    handleInputChangeObject(event, "seo", "robots")
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Twitter title"
                  name="seo.twitter.title"
                  value={seo.twitter.title}
                  onChange={handleInputChange2}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  name="seo.twitter.description"
                  placeholder="Twitter description"
                  value={seo.twitter.description}
                  onChange={handleInputChange2}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Open graph title"
                  name="seo.open_graph.title"
                  value={seo.open_graph.title}
                  onChange={handleInputChange2}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Open graph description"
                  name="seo.open_graph.description"
                  value={seo.open_graph.description}
                  onChange={handleInputChange2}
                />
              </div>
            </div>

            <h4>Location</h4>
            <div className="row">
              <div className="col-md-12">
                <textarea
                  cols="100"
                  rows="2"
                  className="property-input"
                  placeholder="Address*"
                  name="address"
                  value={location.address}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="col-md-3">
                <div
                  style={{ borderBottom: "1px solid gray", margin: "20px 0" }}
                >
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={location.country}
                    onChange={(event) =>
                      handleInputChangeObject(event, "location", "country")
                    }
                    name="location.country"
                    required
                  >
                    <option>Select a country*</option>
                    {country?.map((countryElem) => (
                      <option
                        id={countryElem._id}
                        key={countryElem._id}
                        value={countryElem._id}
                      >
                        {countryElem.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  style={{ borderBottom: "1px solid gray", margin: "20px 0" }}
                >
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={location.state}
                    name="location.state"
                    onChange={(event) =>
                      handleInputChangeObject(event, "location", "state")
                    }
                    required
                  >
                    <option>Select a state*</option>
                    {states?.map((stateElem) => (
                      <option
                        id={stateElem._id}
                        key={stateElem._id}
                        value={stateElem._id}
                      >
                        {stateElem.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  style={{ borderBottom: "1px solid gray", margin: "20px 0" }}
                >
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={location.city}
                    name="location.city"
                    onChange={(event) =>
                      handleInputChangeObject(event, "location", "city")
                    }
                    required
                  >
                    <option>Select a city*</option>
                    {cities?.map((cityElem) => (
                      <option
                        id={cityElem._id}
                        key={cityElem._id}
                        value={cityElem._id}
                      >
                        {cityElem.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div
                  style={{ borderBottom: "1px solid gray", margin: "20px 0" }}
                >
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="location.micro_location"
                    value={location.micro_location}
                    onChange={(event) =>
                      handleInputChangeObject(
                        event,
                        "location",
                        "micro_location"
                      )
                    }
                    required
                  >
                    <option>Select a microlocation*</option>
                    {microlocations?.map((microLocation) => (
                      <option
                        id={microLocation._id}
                        key={microLocation._id}
                        value={microLocation._id}
                      >
                        {microLocation.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Lattitude*"
                  className="property-input"
                  name="location"
                  value={location.latitude}
                  onChange={(event) =>
                    handleInputChangeObject(event, "location", "latitude")
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Longitude*"
                  className="property-input"
                  value={location.longitude}
                  name="location"
                  onChange={(event) =>
                    handleInputChangeObject(event, "location", "longitude")
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Postel code"
                  name="postalCode"
                  value={location.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <h4>Amenities</h4>
            <div className="row">
              <div className="form-check">
                <div className="row">
                  <div className="form-check">
                    {allAmenities?.map((amenity) => (
                      <div key={amenity._id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={amenity._id}
                          id={`amenity-${amenity._id}`}
                          name="amenity"
                          checked={checkedAmenities.includes(amenity._id)}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`amenity-${amenity._id}`}
                        >
                          {amenity.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <h4>Images</h4>
            <div className="row">
              <ImageUpload
                images={image}
                setImages={setImage}
                progress={progress}
                setProgress={setProgress}
                uploadFile={uploadFile}
              />
            </div>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="No. of seats*"
                  className="property-input"
                  name="no_of_seats"
                  value={no_of_seats}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <h4>Hours of operation</h4>

            <div className="row">
              <div className="col-md-3">Monday-Friday</div>
              {fullOpen1 === false && isClose1 === false && (
                <div className="col-md-2">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <Multiselect
                      options={options}
                      displayValue="name"
                      singleSelect
                      placeholder="From*"
                      //   onSelect={handleSelect1}
                      //   onRemove={handleSelect1}
                    />
                  </div>
                </div>
              )}
              {fullOpen1 === false && isClose1 === false && (
                <div className="col-md-2">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <Multiselect
                      options={options}
                      displayValue="name"
                      singleSelect
                      placeholder="To*"
                      //   onSelect={handleSelect2}
                      //   onRemove={handleSelect2}
                    />
                  </div>
                </div>
              )}
              {isClose1 === false && (
                <div className="col-md-3" style={{ paddingTop: "8px" }}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="mon-fri"
                      id="flexCheckDefault"
                      onChange={openFullHoursHandler}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Open 24 Hours
                    </label>
                  </div>
                </div>
              )}
              {fullOpen1 === false && (
                <div className="col-md-2" style={{ paddingTop: "8px" }}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="mon-fri-close"
                      id="flexCheckDefault"
                      onChange={closeHandler}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Closed
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-md-2">Saturday</div>
              {fullOpen2 === false && isClose2 === false && (
                <div className="col-md-2">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <Multiselect
                      options={options}
                      //   onSelect={handleSelect3}
                      //   onRemove={handleSelect3}
                      displayValue="name"
                      singleSelect
                      placeholder="From*"
                    />
                  </div>
                </div>
              )}
              {fullOpen2 === false && isClose2 === false && (
                <div className="col-md-2">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <Multiselect
                      options={options}
                      //   onSelect={handleSelect4}
                      //   onRemove={handleSelect4}
                      displayValue="name"
                      singleSelect
                      placeholder="To*"
                    />
                  </div>
                </div>
              )}
              {isClose2 === false && (
                <div className="col-md-3" style={{ paddingTop: "8px" }}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="sat"
                      id="flexCheckDefault"
                      onChange={openFullHoursHandler}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Open 24 Hours
                    </label>
                  </div>
                </div>
              )}
              {fullOpen2 === false && (
                <div className="col-md-2" style={{ paddingTop: "8px" }}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="sat"
                      id="flexCheckDefault"
                      onChange={closeHandler}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Closed
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-md-2">Sunday</div>
              {fullOpen3 === false && isClose3 === false && (
                <div className="col-md-2">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <Multiselect
                      options={options}
                      //   onSelect={handleSelect5}
                      //   onRemove={handleSelect5}
                      displayValue="name"
                      singleSelect
                      placeholder="From*"
                    />
                  </div>
                </div>
              )}
              {fullOpen3 === false && isClose3 === false && (
                <div className="col-md-2">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <Multiselect
                      options={options}
                      displayValue="name"
                      //   onSelect={handleSelect6}
                      //   onRemove={handleSelect6}
                      singleSelect
                      placeholder="To*"
                    />
                  </div>
                </div>
              )}
              {isClose3 === false && (
                <div className="col-md-3" style={{ paddingTop: "8px" }}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Open 24 Hours"
                      id="flexCheckDefault"
                      onChange={openFullHoursHandler}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Open 24 Hours
                    </label>
                  </div>
                </div>
              )}
              {fullOpen3 === false && (
                <div className="col-md-2" style={{ paddingTop: "8px" }}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Closed"
                      id="flexCheckDefault"
                      onChange={closeHandler}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Closed
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="d-flex w-50 justify-content-between align-items-center">
              <h4>Plans</h4>
              <IoIosAddCircle
                onClick={createPlans}
                className="icon"
                style={{ cursor: "pointer" }}
              />
            </div>
            {allplans.map((row) => (
              <div className="row" key={row.id}>
                <div className="col-md-3">
                  <div
                    style={{ borderBottom: "1px solid gray", margin: "20px 0" }}
                  >
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="category"
                      value={row.category}
                      onChange={(e) => onChangePlanHandler(e, row.id)}
                      required
                    >
                      <option>Select Category*</option>
                      {categories?.map((category) => (
                        <option
                          id={category._id}
                          key={category._id}
                          value={category._id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div
                    style={{ borderBottom: "1px solid gray", margin: "20px 0" }}
                  >
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => onChangePlanHandler2(e, row.id)}
                      value={row.duration}
                    >
                      <option>Duration</option>
                      <option value="Month">Month</option>
                      <option value="Day">Day</option>
                      <option value="Year">Year</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    onChange={(e) => handleInputPlanChange(e, row.id)}
                    name="price"
                    value={row.price}
                    className="property-input"
                    placeholder="Price*"
                    required
                  />
                </div>
                <div className="col-md-3 d-flex align-items-center">
                  <AiFillDelete
                    className="icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => removePlan(row.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="form-footer">
            <button type="submit" className="saveproperty-btn">
              Save
            </button>
            <button className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkSpace;
