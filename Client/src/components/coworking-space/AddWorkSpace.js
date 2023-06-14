import React, { useState, useEffect, Fragment } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import { useNavigate } from "react-router-dom";
import { postConfig } from "../../services/Services";
import Select from "react-dropdown-select";

import {
  getAmenities,
  getBrandsData,
  getCategory,
  getCityByState,
  getCountry,
  getMicrolocationByCity,
  getStateByCountry,
  uploadFile,
} from "./WorkSpaceService";
import { FaUpload } from "react-icons/fa";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";

function AddWorkSpace() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const toast = useToast();
  const [updateTable, setUpdateTable] = useState(false);
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [microlocations, setMicrolocations] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [duration, setDuration] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [formData, setFormData] = useState({
    montofriFrom: "",
    montofriTo: "",
    satFrom: "",
    satTo: "",
    sunFrom: "",
    sunTo: "",
  });

  const navigate = useNavigate();

  const [checkedAmenities, setCheckedAmenities] = useState([]);

  const [microlocationId, setMicrolocationId] = useState(null);
  const [fileName, setFileName] = useState([]);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [coSpace, setCoSpace] = useState({
    brand: "",
    name: "",
    slug: "",
    title: "",
    description: "",
    url: "",
    keywords: "",
    robots: "",
    twitterTitle: "",
    twitterDescription: "",
    graphTitle: "",
    graphDescription: "",
    address: "",
    country: "",
    state: "",
    city: "",
    microLocation: "",
    longitude: "",
    lattitude: "",
    postalCode: "",
    amenity: "",
    images: [],
    seats: "",
    price: "",
    category: "",
  });

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
  const options = [
    { id: 1, name: "01:00 AM" },
    { id: 2, name: "01:15 AM" },
    { id: 3, name: "01:30 AM" },
    { id: 4, name: "01:45 AM" },
    { id: 5, name: "02:00 AM" },
    { id: 6, name: "02:15 AM" },
    { id: 7, name: "02:30 AM" },
    { id: 8, name: "02:45 AM" },
    { id: 9, name: "03:00 AM" },
    { id: 10, name: "03:15 AM" },
    { id: 11, name: "03:30 AM" },
  ];

  const openFullHoursHandler = (e) => {
    const value = e.target.value;

    if (value === "mon-fri" || value === "mon-fri-close") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        montofriFrom: value === "mon-fri" ? "" : prevFormData.montofriFrom,
        montofriTo: value === "mon-fri" ? "" : prevFormData.montofriTo,
      }));
    } else if (value === "sat") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        satFrom: prevFormData.satFrom === value ? "" : prevFormData.satFrom,
        satTo: prevFormData.satTo === value ? "" : prevFormData.satTo,
      }));
    } else if (value === "sun") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        sunFrom: prevFormData.sunFrom === value ? "" : prevFormData.sunFrom,
        sunTo: prevFormData.sunTo === value ? "" : prevFormData.sunTo,
      }));
    }

    if (value === "mon-fri") {
      setOpen({ ...open, fullOpen1: !open.fullOpen1 });
    } else if (value === "sat") {
      setOpen({ ...open, fullOpen2: !open.fullOpen2 });
    } else if (value === "sun") {
      setOpen({ ...open, fullOpen3: !open.fullOpen3 });
    }
  };

  const closeHandler = (e) => {
    const value = e.target.value;

    if (value === "mon-fri-close") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        montofriFrom: "",
        montofriTo: "",
      }));
      setOpen({ ...open, isClose1: !open.isClose1 });
    } else if (value === "sat") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        satFrom: "",
        satTo: "",
      }));
      setOpen({ ...open, isClose2: !open.isClose2 });
    } else if (value === "sun") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        sunFrom: "",
        sunTo: "",
      }));
      setOpen({ ...open, isClose3: !open.isClose3 });
    }
  };

  const createPlans = () => {
    const newRow = {
      id: plans.length + 1,
      category: "",
      price: "",
      duration: "",
    };
    setPlans((prevRows) => [...prevRows, newRow]);
  };

  const removePlan = (id) => {
    setPlans((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  const onChangePlanHandler = (e, id) => {
    const { name, value } = e.target;
    setPlans((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [name]: value } : row))
    );
  };

  const onChangePlanHandler2 = (e, id) => {
    const { value } = e.target;
    setPlans((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, duration: value } : row))
    );
  };

  const handleInputPlanChange = (e, id) => {
    const { name, value } = e.target;
    setPlans((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [name]: value } : row))
    );
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  let footer_descript_value = convertToRaw(editorState.getCurrentContent())
    .blocks[0].text;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoSpace({
      ...coSpace,
      [name]: value,
    });
  };
  const handleFetchCity = async () => {
    await getCityByState(stateId, setLoading, setCities);
  };
  const handleFetchStates = async () => {
    await getStateByCountry(countryId, setLoading, setStates);
  };
  const handleFetchMicrolocation = async () => {
    await getMicrolocationByCity(cityId, setLoading, setMicrolocations);
  };

  const handleFetchCountry = async () => {
    await getCountry(setLoading, setCountry);
  };

  const handleFetchBrands = async () => {
    await getBrandsData(setLoading, setBrands);
  };
  const handleFetchAmenity = async () => {
    await getAmenities(setLoading, setAmenities);
  };
  const handleFetchCategory = async () => {
    await getCategory(setLoading, setCategories);
  };
  const onChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    const { name, value } = e.target;

    let updatedCoSpace = {
      ...coSpace,
      [name]: value,
    };

    if (name === "country") {
      setCountryId(option);
    } else if (name === "state") {
      setStateId(option);
      setCoSpace({
        ...updatedCoSpace,
      });
    } else if (name === "city") {
      setCityId(option);
      setCoSpace({
        ...updatedCoSpace,
      });
    } else if (name === "microLocation") {
      setMicrolocationId(option);
      setCoSpace({
        ...updatedCoSpace,
      });
    } else if (name === "brand") {
      setBrandId(option);
      setCoSpace({
        ...updatedCoSpace,
      });
    }

    setCoSpace(updatedCoSpace);
  };

  const previewFile = (data) => {
    setImages((prevImages) => [...prevImages, ...data]);
  };
  const handleUploadFile = async (files) => {
    await uploadFile(files, setProgress, setIsUploaded, previewFile);
  };
  const handleSaveWorkSpace = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/workSpace/workSpaces",
        {
          name: coSpace.name,
          description: footer_descript_value,
          images: imageData,
          amenties: checkedAmenities,
          seo: {
            title: coSpace.title,
            description: coSpace.description,
            robots: coSpace.robots,
            keywords: coSpace.keywords,
            url: coSpace.url,
            status: false,
            twitter: {
              title: coSpace.twitterTitle,
              description: coSpace.twitterDescription,
            },
            open_graph: {
              title: coSpace.graphTitle,
              description: coSpace.graphDescription,
            },
          },
          location: {
            address: coSpace.address,
            country: countryId,
            state: stateId,
            city: cityId,
            micro_location: microlocationId,
            latitude: coSpace.lattitude,
            longitude: coSpace.longitude,
          },
          no_of_seats: coSpace.seats,
          hours_of_operation: {
            monday_friday: {
              from: formData.montofriFrom,
              to: formData.montofriTo,
              is_closed: open.isClose1,
              is_open_24: open.fullOpen1,
            },
            saturday: {
              from: formData.satFrom,
              to: formData.satTo,
              is_closed: open.isClose2,
              is_open_24: open.fullOpen2,
            },
            sunday: {
              from: formData.sunFrom,
              to: formData.sunTo,
              is_closed: open.isClose3,
              is_open_24: open.fullOpen3,
            },
          },
          plans,

          // status,
          brand: brandId,
          slug: coSpace.slug,
        },
        postConfig
      );
      setCoSpace({
        brand: "",
        name: "",
        slug: "",
        title: "",
        description: "",
        url: "",
        keywords: "",
        robots: "",
        twitterTitle: "",
        twitterDescription: "",
        graphTitle: "",
        graphDescription: "",
        address: "",
        country: "",
        state: "",
        city: "",
        microLocation: "",
        longitude: "",
        lattitude: "",
        postalCode: "",
        amenity: "",
        images: [],
        seats: "",
      });
      setUpdateTable((prev) => !prev);
      navigate("/coworking-space");
      toast({
        title: "Saved Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Saved the Space",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleCheckboxChange = (event) => {
    const checkedAmenityId = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedAmenities((prevCheckedAmenities) => [
        ...prevCheckedAmenities,
        checkedAmenityId,
      ]);
    } else {
      setCheckedAmenities((prevCheckedAmenities) =>
        prevCheckedAmenities.filter((id) => id !== checkedAmenityId)
      );
    }
  };
  const handleSelect = (selectedOption, field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: selectedOption.value,
    }));
  };
  const removePreviewImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  const handleInputByClick = (e) => {
    const files = Array.from(e.target.files);
    handleUploadFile(files);
    const fileNames = files.map((file) => file.name);
    setFileName(fileNames);
  };
  useEffect(() => {
    handleFetchCountry();
    handleFetchBrands();
    handleFetchAmenity();
    handleFetchCategory();
  }, []);
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const combinedArray = images.map((image, index) => ({
      image,
      name: fileName[index],
      alt: fileName[index],
    }));
    setImageData([...combinedArray]);
  }, [images, fileName]);
  const handleAltChange = (event, index) => {
    const updatedArray = [...imageData]; // Create a copy of the mergedArray
    updatedArray[index].alt = event.target.value; // Update the alt value at the specified index

    setImageData(updatedArray);
  };
  console.log(formData);
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <div className="container form-box">
        <form style={{ textAlign: "left" }} onSubmit={handleSaveWorkSpace}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-6">
                <div
                  style={{
                    borderBottom: "1px solid #8080806b",
                    margin: "20px 0 5px",
                  }}
                >
                  <select
                    className="form-select property-input"
                    name="brand"
                    aria-label="Default select example"
                    value={coSpace.brand}
                    onChange={onChangeHandler}
                  >
                    <option>Select a brand</option>
                    {brands?.map((brand) => (
                      <option id={brand._id} key={brand._id} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  class="form-floating border_field"
                  style={{ marginTop: "6px" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Name*"
                    name="name"
                    value={coSpace.name}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInput">Name</label>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <h4 className="property_form_h4">Property Description</h4>
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
            <div className="row mb-5">
              <h4 className="property_form_h4">Slug Update</h4>
              <div className="col-md-12">
                <div class="form-floating border_field">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputSlug"
                    placeholder="Slug"
                    name="slug"
                    value={coSpace.slug}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputSlug">Slug</label>
                </div>
              </div>
            </div>
            <div className="row">
              <h4 className="property_form_h4">SEO Details</h4>
              <div className="col-md-6">
                <div class="form-floating border_field">
                  <textarea
                    type="text"
                    className="form-control"
                    id="floatingInputDescription"
                    placeholder="Description"
                    name="description"
                    value={coSpace.description}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputDescription">Description</label>
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-floating border_field">
                  <textarea
                    type="text"
                    className="form-control"
                    id="floatingInputRobots"
                    placeholder="Robots"
                    name="robots"
                    value={coSpace.robots}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputRobots">Robots</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div class="form-floating border_field">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputTitle"
                    placeholder="Title"
                    name="title"
                    value={coSpace.title}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInput">Title</label>
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-floating border_field">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputKeywords"
                    placeholder="Keywords"
                    name="keywords"
                    value={coSpace.keywords}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInput">Keywords</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div class="form-floating border_field">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputTwitter"
                    placeholder="Twitter Title"
                    name="twitterTitle"
                    value={coSpace.twitterTitle}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputTwitter">Twitter Title</label>
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-floating border_field">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputOgTitle"
                    placeholder="Open Graph Title"
                    name="graphTitle"
                    value={coSpace.graphTitle}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputOgTitle">Open Graph Title</label>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-6">
                <div class="form-floating border_field">
                  <textarea
                    type="text"
                    className="form-control"
                    id="floatingInputTwitDesc"
                    placeholder="Twitter Description"
                    name="twitterDescription"
                    value={coSpace.twitterDescription}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputTwitDesc">Twitter Description</label>
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-floating border_field">
                  <textarea
                    type="text"
                    className="form-control"
                    id="floatingInputOgDesc"
                    placeholder="Open Graph Description"
                    name="graphDescription"
                    value={coSpace.graphDescription}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputOgDesc">
                    Open Graph Description
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <h4 className="property_form_h4">Location</h4>
              <div className="col-md-6">
                <div class="form-floating border_field">
                  <textarea
                    type="text"
                    className="form-control"
                    id="floatingInputAddress"
                    placeholder="Address*"
                    name="address"
                    value={coSpace.address}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputAddress">Address*</label>
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
                    value={coSpace.country}
                    onChange={onChangeHandler}
                    name="country"
                    onClick={handleFetchStates}
                    required
                  >
                    <option>Select a country*</option>
                    {country?.map((countryElem) => (
                      <option
                        id={countryElem._id}
                        key={countryElem._id}
                        value={countryElem.name}
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
                    value={coSpace.state}
                    name="state"
                    onChange={onChangeHandler}
                    onClick={handleFetchCity}
                    required
                  >
                    <option>Select a state*</option>
                    {states?.map((stateElem) => (
                      <option
                        id={stateElem._id}
                        key={stateElem._id}
                        value={stateElem.name}
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
                    value={coSpace.city}
                    onChange={onChangeHandler}
                    onClick={handleFetchMicrolocation}
                    name="city"
                    required
                  >
                    <option>Select a city*</option>
                    {cities?.map((cityElem) => (
                      <option
                        id={cityElem._id}
                        key={cityElem._id}
                        value={cityElem.name}
                      >
                        {cityElem.name}
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
                    name="microLocation"
                    value={coSpace.microLocation}
                    onChange={onChangeHandler}
                    required
                  >
                    <option>Select a microlocation*</option>
                    {microlocations?.map((microLocation) => (
                      <option
                        id={microLocation._id}
                        key={microLocation._id}
                        value={microLocation.name}
                      >
                        {microLocation.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-3">
                <div class="form-floating border_field">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputLatti"
                    placeholder="Lattitude"
                    name="lattitude"
                    value={coSpace.lattitude}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputLatti">Lattitude</label>
                </div>
              </div>
              <div className="col-md-3">
                <div class="form-floating border_field">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputLongi"
                    placeholder="Longitude"
                    name="longitude"
                    value={coSpace.longitude}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputLongi">Longitude</label>
                </div>
              </div>
              <div className="col-md-3">
                <div class="form-floating border_field">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputPostal"
                    placeholder="Postal Code"
                    name="postalCode"
                    value={coSpace.postalCode}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputPostal">Postal Code</label>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <h4 className="property_form_h4">Amenities</h4>
              <div className="form-check" style={{ marginLeft: "9px" }}>
                {amenities?.map((amenity) => (
                  <div key={amenity._id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={amenity._id}
                      id="flexCheckDefault"
                      name="amenity"
                      onChange={handleCheckboxChange}
                      style={{ marginLeft: "-13px", marginRight: "8px" }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {amenity.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="row mb-5">
              <h4 className="property_form_h4">Images</h4>
              <div className="container">
                {/* <div>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    onChange={handleInputByClick}
                  />
                </div> */}
                <label class="file">
                  <input
                    type="file"
                    id="file-input"
                    multiple
                    aria-label="File browser example"
                    onChange={handleInputByClick}
                  />
                </label>

                {progress ? (
                  <div>
                    <p className="mx-auto">
                      <strong>Uploading Progress</strong>
                    </p>
                    <div className="progress mx-auto">
                      <div
                        id="progress-bar"
                        className="progress-bar progress-bar-striped bg-info"
                        role="progressbar"
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${progress}%` }}
                      >
                        {progress}%
                      </div>
                    </div>
                  </div>
                ) : isUploaded ? (
                  <h5>Uploaded</h5>
                ) : (
                  ""
                )}
                <div id="preview" className="mt-3 d-flex align-items-center">
                  <div
                    className="table-box"
                    style={{
                      width: "100%",
                      marginTop: "0px",
                      marginBottom: "0px",
                    }}
                  >
                    <h3>Images</h3>
                    <TableContainer variant="striped" color="teal">
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Order No.</Th>
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th>Alt1</Th>

                            <Th>Delete</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {imageData?.map((img, index) => (
                            <Fragment key={index}>
                              <Tr>
                                <Td>{index + 1}</Td>
                                <Td>
                                  <img
                                    src={img.image}
                                    alt="media"
                                    width="80px"
                                  />
                                </Td>
                                <Td>{img.name}</Td>
                                <Td>
                                  <input
                                    type="text"
                                    style={{ color: "#000" }}
                                    value={img.alt}
                                    onChange={(event) =>
                                      handleAltChange(event, index)
                                    }
                                  />
                                </Td>

                                <Td>
                                  <AiFillDelete
                                    onClick={() => removePreviewImage(index)}
                                    className="icon"
                                    style={{ color: "red" }}
                                  />
                                </Td>
                              </Tr>
                            </Fragment>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-3">
                <div class="form-floating border_field">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputSeats"
                    placeholder="No. Of Seats"
                    name="seats"
                    value={coSpace.seats}
                    onChange={handleInputChange}
                  />
                  <label for="floatingInputSeats">No. Of Seats</label>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <h4 className="property_form_h4">Hours Of Operation</h4>
              <div className="col-md-3">Monday-Friday</div>
              {fullOpen1 === false && isClose1 === false && (
                <div className="col-md-2">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <select
                      value={formData.montofriFrom}
                      onChange={(e) => handleSelect(e.target, "montofriFrom")}
                    >
                      <option value="">From*</option>
                      {options.map((option) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {fullOpen1 === false && isClose1 === false && (
                <div className="col-md-2">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <select
                      value={formData.montofriTo}
                      onChange={(e) => handleSelect(e.target, "montofriTo")}
                    >
                      <option value="">From*</option>
                      {options.map((option) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
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
                    <select
                      value={formData.satFrom}
                      onChange={(e) => handleSelect(e.target, "satFrom")}
                    >
                      <option value="">From*</option>
                      {options.map((option) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {fullOpen2 === false && isClose2 === false && (
                <div className="col-md-2">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <select
                      value={formData.satTo}
                      onChange={(e) => handleSelect(e.target, "satTo")}
                    >
                      <option value="">From*</option>
                      {options.map((option) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
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
                    <select
                      value={formData.sunFrom}
                      onChange={(e) => handleSelect(e.target, "sunFrom")}
                    >
                      <option value="">From*</option>
                      {options.map((option) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {fullOpen3 === false && isClose3 === false && (
                <div className="col-md-2">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <select
                      value={formData.sunTo}
                      onChange={(e) => handleSelect(e.target, "sunTo")}
                    >
                      <option value="">From*</option>
                      {options.map((option) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {isClose3 === false && (
                <div className="col-md-3" style={{ paddingTop: "8px" }}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="sun"
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
                      value="sun"
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
              <h4 className="property_form_h4">Plans</h4>
              <IoIosAddCircle
                onClick={createPlans}
                className="icon"
                style={{ cursor: "pointer" }}
              />
            </div>
            {plans.map((row, id) => (
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
                  <div class="form-floating border_field">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputPrice"
                      placeholder="Price*"
                      name="price"
                      value={coSpace.price}
                      onChange={(e) => handleInputPlanChange(e, row.id)}
                      required
                    />
                    <label for="floatingInputPrice">Price*</label>
                  </div>
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
}

export default AddWorkSpace;
