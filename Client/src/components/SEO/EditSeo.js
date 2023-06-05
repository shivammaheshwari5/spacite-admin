import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
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

const initialValue = {
  page_title: "",
  title: "",
  description: "",
  twitter: { title: "", description: "" },
  open_graph: { title: "", description: "" },
  path: "",
  keywords: "",
  robots: "",
  twitterTitle: "",
  twitterDescription: "",
  graphTitle: "",
  graphDescription: "",
  script: "",
  footer_title: "",
};

const EditSeo = () => {
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [seos, setSeos] = useState(initialValue);
  const {
    title,
    page_title,
    description,
    path,
    keywords,
    robots,
    script,
    twitter,
    open_graph,
    footer_title,
    footer_description,
  } = seos;
  const [updateTable, setUpdateTable] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setSeos({ ...seos, [e.target.name]: e.target.value });
  };
  const handleInputChangeObject = (event, section, property) => {
    const { value } = event.target;
    const updatedState = {
      ...seos,
      [section]: {
        ...seos[section],
        [property]: value,
      },
    };
    setSeos(updatedState);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const footer_descrip = convertToRaw(editorState.getCurrentContent()).blocks[0]
    .text;

  const handleEditSeo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/seo/seos/${id}`, {
        id,
        title,
        page_title,
        script,
        description,
        robots,
        keywords,
        path,
        footer_title,
        footer_description: footer_descrip,
        twitter,
        open_graph,
      });
      setSeos(data);
      setUpdateTable((prev) => !prev);
      navigate("/seo");
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
  useEffect(() => {
    const contentState = ContentState.createFromText(
      footer_description || "Empty"
    );
    const initialEditorState = EditorState.createWithContent(contentState);
    setEditorState(initialEditorState);
  }, [seos]);
  const getSeoDataById = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/seo/seos/${id}`);
      setLoading(false);
      setSeos(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSeoDataById();
  }, [updateTable]);
  console.log(footer_description);
  console.log(twitter.title);
  return (
    <>
      <div className="container form-box">
        <form style={{ textAlign: "left" }} onSubmit={handleEditSeo}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Heading"
                  name="page_title"
                  onChange={(e) => handleInputChange(e)}
                  value={page_title}
                />
              </div>
              <div className="col-md-6">
                <input
                  className="property-input"
                  type="text"
                  placeholder="Title*"
                  name="title"
                  required
                  onChange={(e) => handleInputChange(e)}
                  value={title}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  className="property-input"
                  type="text"
                  placeholder="Description"
                  name="description"
                  onChange={(e) => handleInputChange(e)}
                  value={description}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Path*"
                  name="path"
                  required
                  onChange={(e) => handleInputChange(e)}
                  value={path}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
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
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Keywords*"
                  name="keywords"
                  className="property-input"
                  onChange={(e) => handleInputChange(e)}
                  value={keywords}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Robots"
                  name="robots"
                  onChange={(e) => handleInputChange(e)}
                  value={robots}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Twitter title"
                  name="twitter"
                  onChange={(event) =>
                    handleInputChangeObject(event, "twitter", "title")
                  }
                  value={twitter.title}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Twitter description"
                  name="twitter"
                  onChange={(event) =>
                    handleInputChangeObject(event, "twitter", "description")
                  }
                  value={twitter.description}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Open graph title"
                  name="open_graph"
                  onChange={(event) =>
                    handleInputChangeObject(event, "open_graph", "title")
                  }
                  value={open_graph.title}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Open graph description"
                  name="open_graph"
                  onChange={(event) =>
                    handleInputChangeObject(event, "open_graph", "description")
                  }
                  value={open_graph.description}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <textarea
                  cols="100"
                  rows="4"
                  className="property-input"
                  placeholder="Script tag"
                  name="script"
                  required
                  onChange={(e) => handleInputChange(e)}
                  value={script}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Footer title"
                  name="footer_title"
                  onChange={(e) => handleInputChange(e)}
                  value={footer_title}
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
              Update
            </button>
            <button className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditSeo;
