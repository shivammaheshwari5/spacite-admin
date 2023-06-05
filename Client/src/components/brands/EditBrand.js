import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import Select from "react-dropdown-select";
import ImageUpload from "../../ImageUpload";

const initialValue = {
  name: "",
  description: "",
  order: "",
  image: "",
  seo: {
    title: "",
    description: "",
    footer_title: "",
    footer_description: "",
    robots: "",
    keywords: "",
    url: "",
    twitter: {
      title: "",
      description: "",
    },
    open_graph: {
      title: "",
      description: "",
    },
  },
  cities: [],
};

const EditBrand = () => {
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [brands, setBrands] = useState(initialValue);
  const {
    name,
    description,
    order,
    image,
    seo,
    cities,
    type,
    slug,
    should_show_on_home,
  } = brands;
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setBrands({ ...brands, [e.target.name]: e.target.value });
  };
  const handleInputChangeObject = (event, section, property) => {
    const { value } = event.target;
    const updatedState = {
      ...brands,
      [section]: {
        ...brands[section],
        [property]: value,
      },
    };
    setBrands(updatedState);
  };
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    const [category, subCategory, property] = name.split(".");

    setBrands((prevState) => ({
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

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const footer_descrip = convertToRaw(editorState.getCurrentContent()).blocks[0]
    .text;

  const handleEditBrands = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/brand/brands/${id}`, {
        name,
        description,
        order,
        image: images[0],
        seo: {
          title: seo.title,
          description: seo.description,
          footer_title: seo.footer_title,
          footer_description: footer_descrip,
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
        cities: selectedOptions,
        type,
        slug,
        should_show_on_home,
      });
      setBrands(data);
      setUpdateTable((prev) => !prev);
      navigate("/brands");
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

  const getBrandsDataById = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/brand/brands/${id}`);
      setLoading(false);
      setBrands(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const contentState = ContentState.createFromText(
      seo.footer_description || "empty"
    );
    const initialEditorState = EditorState.createWithContent(contentState);
    setEditorState(initialEditorState);
  }, [brands]);
  const getCity = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/city/cities");
      setLoading(false);
      setAllCity(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCity();
    getBrandsDataById();
  }, [updateTable]);
  const handleDropdownChange = (selectedValues) => {
    const ids = selectedValues.map((option) => option._id);
    setSelectedOptions(ids);
  };
  const previewFile = (data) => {
    const allimages = images;
    setImages(allimages.concat(data));
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
    console.log("sshiva");
  };

  console.log(footer_descrip);
  return (
    <>
      <div className="container form-box">
        <form style={{ textAlign: "left" }} onSubmit={handleEditBrands}>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Name*"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  className="property-input"
                  type="text"
                  placeholder="Description*"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <h5 style={{ marginTop: "25px" }}>Logo Upload</h5>
                <ImageUpload
                  images={images}
                  setImages={setImages}
                  progress={progress}
                  setProgress={setProgress}
                  uploadFile={uploadFile}
                />
                <img src={image} alt="image" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <input
                  className="property-input"
                  type="text"
                  placeholder="Order*"
                  name="order"
                  value={order}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Should Show on Home
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  style={{ borderBottom: "1px solid gray", margin: "20px 0" }}
                >
                  <Select
                    options={allCity}
                    multi
                    onChange={handleDropdownChange}
                    values={cities}
                    labelField="name"
                    valueField="_id"
                  />
                </div>
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
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Footer title"
                  value={seo.footer_title}
                  name="seo"
                  onChange={(event) =>
                    handleInputChangeObject(event, "seo", "footer_title")
                  }
                />
              </div>
            </div>
            <h6>Footer description</h6>
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
          </div>
          <div className="form-footer">
            <button type="submit" className="saveproperty-btn">
              Save
            </button>
            <button className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBrand;
