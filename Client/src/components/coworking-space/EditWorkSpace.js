import React, { useState, useEffect, Fragment } from "react";
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
import Loader from "../loader/Loader";
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
import {
  uploadFile,
  getCityByState,
  getStateByCountry,
  getCountry,
  getMicrolocationByCity,
  getAmenities,
  getBrandsData,
  getCategory,
} from "./WorkSpaceService";
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
  const [allimage, setAllImage] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
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
  const [fileName, setFileName] = useState([]);
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
  const options = [
    { id: 1, name: "09:00 AM" },
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
    { id: 11, name: "07:00 PM" },
  ];
  const [checkedAmenities, setCheckedAmenities] = useState([]);
  const [apiValues, setApiValues] = useState({
    isOpen: true,
    isOpenSat: false,
    isOpenSun: false,
  });

  const toggleHoursHandler = (event, day, allday) => {
    const isChecked = event.target.checked;
    setApiValues((prevState) => ({
      ...prevState,
      [day]: isChecked,
    }));
    if (isChecked) {
      setWorkSpaces((prevState) => ({
        ...prevState,
        hours_of_operation: {
          ...prevState.hours_of_operation,
          [allday]: { from: "", to: "" },
        },
      }));
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
          images: mergedArray,
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
          hours_of_operation: {
            monday_friday: {
              from: hours_of_operation.monday_friday.from,
              to: hours_of_operation.monday_friday.to,
              is_open_24: apiValues.isOpen,
            },
            saturday: {
              from: hours_of_operation.saturday.from,
              to: hours_of_operation.saturday.to,
              is_open_24: apiValues.isOpenSat,
            },
            sunday: {
              from: hours_of_operation.sunday.from,
              to: hours_of_operation.sunday.to,
              is_open_24: apiValues.isOpenSun,
            },
          },
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
      setApiValues({
        isOpen: data.hours_of_operation.monday_friday.is_open_24,
        isOpenSat: data.hours_of_operation.saturday.is_open_24,
        isOpenSun: data.hours_of_operation.sunday.is_open_24,
      });
      handleFetchStates(data.location.country);
      handleFetchCity(data.location.state);
      handleFetchMicrolocation(data.location.city);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchCity = async (id) => {
    location.state = id;
    await getCityByState(location.state, setLoading, setCities);
  };
  const handleFetchStates = async (id) => {
    location.country = id;
    await getStateByCountry(location.country, setLoading, setStates);
  };
  const handleFetchMicrolocation = async (id) => {
    location.city = id;
    await getMicrolocationByCity(location.city, setLoading, setMicrolocations);
  };
  const handleFetchCountry = async () => {
    await getCountry(setLoading, setCountry);
  };
  const handleFetchBrands = async () => {
    await getBrandsData(setLoading, setBrands);
  };
  const handleFetchAmenity = async () => {
    await getAmenities(setLoading, setAllAmenities);
  };
  const handleFetchCategory = async () => {
    await getCategory(setLoading, setCategories);
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
    handleFetchCountry();
    handleFetchBrands();
    handleFetchAmenity();
    handleFetchCategory();
    getWorkSpacesDataById();
  }, [updateTable]);
  const previewFile = (data) => {
    setAllImage((prevImages) => [...prevImages, ...data]);
  };
  const handleUploadFile = async (files) => {
    await uploadFile(files, setProgress, setIsUploaded, previewFile);
  };
  const [mergedArray, setMergedArray] = useState([]);
  const handleInputByClick = (e) => {
    const files = Array.from(e.target.files);
    handleUploadFile(files);
    const fileNames = files.map((file) => file.name);
    setFileName((prev) => [...prev, ...fileNames]);
  };
  useEffect(() => {
    const combinedArray = allimage.map((image, index) => ({
      image,
      name: fileName[index],
      alt: fileName[index],
    }));
    setMergedArray([...images, ...combinedArray]);
  }, [allimage, fileName, images]);

  const removePreviewImage = (index) => {
    const updatedArray = [...mergedArray]; // Create a copy of the mergedArray
    updatedArray.splice(index, 1); // Remove the element at the specified index

    setMergedArray(updatedArray);
  };
  const handleAltChange = (event, index) => {
    const updatedArray = [...mergedArray]; // Create a copy of the mergedArray
    updatedArray[index].alt = event.target.value; // Update the alt value at the specified index

    setMergedArray(updatedArray);
  };

  // if (loading) {
  //   return (
  //     <div>
  //       <Loader />
  //     </div>
  //   ); // Render a loading state while fetching data
  // }

  console.log(workSpaces);
  console.log(
    hours_of_operation.monday_friday.from,
    hours_of_operation.monday_friday.to
  );
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <div className="container form-box">
        <form style={{ textAlign: "left" }} onSubmit={handleEditWorkSpace}>
          <div className="container">
            <div className="row">
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
            </div>
            <div className="row">
              <div className="col-md-12">
                <h4>About Property</h4>
              </div>
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
                  name="location"
                  onChange={(event) =>
                    handleInputChangeObject(event, "location", "address")
                  }
                  value={location.address}
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
                    onClick={(event) => handleFetchStates(event.target.value)}
                    name="location"
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
                    name="location"
                    onChange={(event) =>
                      handleInputChangeObject(event, "location", "state")
                    }
                    onClick={(event) => handleFetchCity(event.target.value)}
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
                    name="location"
                    onChange={(event) =>
                      handleInputChangeObject(event, "location", "city")
                    }
                    onClick={(event) =>
                      handleFetchMicrolocation(event.target.value)
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
                    name="location"
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
              <div className="container">
                <div>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    onChange={handleInputByClick}
                  />
                </div>

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
              </div>
              <div id="preview" className="mt-3 d-flex align-items-center">
                <div className="table-box" style={{ width: "100%" }}>
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
                        {mergedArray?.map((img, index) => (
                          <Fragment key={index}>
                            <Tr>
                              <Td>{index + 1}</Td>
                              <Td>
                                <img src={img.image} alt="media" width="80px" />
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
              <div className="col-md-2" style={{ paddingTop: "8px" }}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="mon-fri"
                    id="flexCheckDefault"
                    onChange={(event) => toggleHoursHandler(event, "isOpen")}
                    checked={apiValues.isOpen}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Open
                  </label>
                </div>
              </div>
              {apiValues.isOpen && (
                <>
                  <div className="col-md-2">
                    <div style={{ borderBottom: "1px solid gray" }}>
                      <select
                        value={hours_of_operation.monday_friday.from}
                        name="hours_of_operation.monday_friday.from"
                        onChange={handleInputChange2}
                      >
                        <option value="">From*</option>
                        {options.map((option, i) => (
                          <option key={i} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div style={{ borderBottom: "1px solid gray" }}>
                      <select
                        value={hours_of_operation.monday_friday.to}
                        onChange={handleInputChange2}
                        name="hours_of_operation.monday_friday.to"
                      >
                        <option value="">To*</option>
                        {options.map((option, i) => (
                          <option key={i} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="row">
              <div className="col-md-3">Saturday</div>
              <div className="col-md-2" style={{ paddingTop: "8px" }}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="sat"
                    id="flexCheckDefault"
                    onChange={(event) => toggleHoursHandler(event, "isOpenSat")}
                    checked={apiValues.isOpenSat}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Open
                  </label>
                </div>
              </div>
              {apiValues.isOpenSat && (
                <>
                  <div className="col-md-2">
                    <div style={{ borderBottom: "1px solid gray" }}>
                      <select
                        value={hours_of_operation.saturday.from}
                        name="hours_of_operation.saturday.from"
                        onChange={handleInputChange2}
                      >
                        <option value="">From*</option>
                        {options.map((option, i) => (
                          <option key={i} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div style={{ borderBottom: "1px solid gray" }}>
                      <select
                        value={hours_of_operation.saturday.to}
                        onChange={handleInputChange2}
                        name="hours_of_operation.saturday.to"
                      >
                        <option value="">To*</option>
                        {options.map((option, i) => (
                          <option key={i} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="row">
              <div className="col-md-3">Sunday</div>
              <div className="col-md-2" style={{ paddingTop: "8px" }}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="sun"
                    id="flexCheckDefault"
                    onChange={(event) => toggleHoursHandler(event, "isOpenSun")}
                    checked={apiValues.isOpenSun}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Open
                  </label>
                </div>
              </div>
              {apiValues.isOpenSun && (
                <>
                  <div className="col-md-2">
                    <div style={{ borderBottom: "1px solid gray" }}>
                      <select
                        value={hours_of_operation.sunday.from}
                        name="hours_of_operation.sunday.from"
                        onChange={handleInputChange2}
                      >
                        <option value="">From*</option>
                        {options.map((option, i) => (
                          <option key={i} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div style={{ borderBottom: "1px solid gray" }}>
                      <select
                        value={hours_of_operation.sunday.to}
                        onChange={handleInputChange2}
                        name="hours_of_operation.sunday.to"
                      >
                        <option value="">To*</option>
                        {options.map((option, i) => (
                          <option key={i} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* <div className="row">
              <div className="col-md-3">Sunday</div>
              {!apiValues.isSunClosed && (
                <>
                  <div className="col-md-2">
                    {!apiValues.isOpen24Sun && (
                      <div style={{ borderBottom: "1px solid gray" }}>
                        <select
                          value={hours_of_operation.sunday.from}
                          name="hours_of_operation.sunday.from"
                          onChange={handleInputChange2}
                        >
                          <option value="">From*</option>
                          {options.map((option) => (
                            <option key={option.id} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="col-md-2">
                    {!apiValues.isOpen24Sun && (
                      <div style={{ borderBottom: "1px solid gray" }}>
                        <select
                          value={hours_of_operation.sunday.to}
                          onChange={handleInputChange2}
                          name="hours_of_operation.sunday.to"
                        >
                          <option value="">To*</option>
                          {options.map((option) => (
                            <option key={option.id} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="col-md-3" style={{ paddingTop: "8px" }}>
                {!apiValues.isSunClosed && (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="sun"
                      id="flexCheckSun"
                      onChange={(event) =>
                        toggleHoursHandler(event, "isOpen24Sun")
                      }
                      checked={apiValues.isOpen24Sun}
                    />
                    <label className="form-check-label" htmlFor="flexCheckSun">
                      Open 24 Hours
                    </label>
                  </div>
                )}
              </div>

              <div className="col-md-2" style={{ paddingTop: "8px" }}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="sun-close"
                    id="flexCheckSun"
                    onChange={(event) =>
                      toggleHoursHandler(event, "isSunClosed")
                    }
                    checked={apiValues.isSunClosed}
                  />
                  <label className="form-check-label" htmlFor="flexCheckSun">
                    Closed
                  </label>
                </div>
              </div>
            </div> */}

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
