import React, { useEffect, useState } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import { useDisclosure, Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function AddSeoForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [seo, setSeo] = useState({
    heading: "",
    title: "",
    description: "",
    path: "",
    keywords: "",
    robots: "",
    twitterTitle: "",
    twitterDescription: "",
    graphTitle: "",
    graphDescription: "",
    script: "",
    footerTitle: "",
  });
  const [updateTable, setUpdateTable] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeo({
      ...seo,
      [name]: value,
    });
  };

  const handleSaveSeo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/seo/seos", {
        title: seo.heading,
        page_title: seo.title,
        script: seo.script,
        description: seo.description,
        robots: seo.robots,
        keywords: seo.keywords,
        path: seo.path,
        footer_title: seo.footerTitle,
        footer_description: footer_descript_value,
        twitter: {
          title: seo.twitterTitle,
          description: seo.twitterDescription,
        },
        open_graph: {
          title: seo.graphTitle,
          description: seo.graphDescription,
        },
      });
      setSeo({
        heading: "",
        title: "",
        description: "",
        path: "",
        keywords: "",
        robots: "",
        twitterTitle: "",
        twitterDescription: "",
        graphTitle: "",
        graphDescription: "",
        script: "",
        footerTitle: "",
      });
      setUpdateTable((prev) => !prev);
      navigate("/seo");
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
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  let footer_descript_value = convertToRaw(editorState.getCurrentContent())
    .blocks[0].text;
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <div className="container form-box">
        <form style={{ textAlign: "left" }} onSubmit={handleSaveSeo}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Heading"
                  name="heading"
                  onChange={handleInputChange}
                  value={seo.heading}
                />
              </div>
              <div className="col-md-6">
                <input
                  className="property-input"
                  type="text"
                  placeholder="Title*"
                  name="title"
                  required
                  onChange={handleInputChange}
                  value={seo.title}
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
                  onChange={handleInputChange}
                  value={seo.description}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Path*"
                  name="path"
                  required
                  onChange={handleInputChange}
                  value={seo.path}
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
                  onChange={handleInputChange}
                  value={seo.keywords}
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
                  onChange={handleInputChange}
                  value={seo.robots}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Twitter title"
                  name="twitterTitle"
                  onChange={handleInputChange}
                  value={seo.twitterTitle}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Twitter description"
                  name="twitterDescription"
                  onChange={handleInputChange}
                  value={seo.twitterDescription}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Open graph title"
                  name="graphTitle"
                  onChange={handleInputChange}
                  value={seo.graphTitle}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Open graph description"
                  name="graphDescription"
                  onChange={handleInputChange}
                  value={seo.graphDescription}
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
                  onChange={handleInputChange}
                  value={seo.script}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Footer title"
                  name="footerTitle"
                  onChange={handleInputChange}
                  value={seo.footerTitle}
                />
              </div>
            </div>
            <h6>Footer description</h6>
            <div className="row">
              <div className="col-md-12">
                <Editor
                  // editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={(editorState) =>
                    onEditorStateChange(editorState)
                  }
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
    </div>
  );
}

export default AddSeoForm;
