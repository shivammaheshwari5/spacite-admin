import React, { useState, Fragment, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
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
  useToast,
} from "@chakra-ui/react";

const ImageUpload = ({
  images,
  setImages,
  progress,
  setProgress,
  uploadFile,
  isUploaded,
}) => {
  const [fileName, setFileName] = useState([]);
  const removePreviewImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    uploadFile(Array.from(files));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleInputByClick = (e) => {
    const files = Array.from(e.target.files);
    uploadFile(files);
    const fileNames = files.map((file) => file.name);
    setFileName(fileNames);
  };

  useEffect(() => {
    const drop_region_container = document.getElementById(
      "drop-region-container"
    );
    const input = document.getElementById("file-input");
    ["dragenter", "dragover"].forEach((eventName) => {
      drop_region_container.addEventListener(eventName, () => {
        drop_region_container.classList.add("highlight");
      });
    });
    ["dragleave", "drop"].forEach((eventName) => {
      drop_region_container.addEventListener(eventName, () => {
        drop_region_container.classList.remove("highlight");
      });
    });

    // click to upload
    drop_region_container.addEventListener("click", () => {
      input.click();
    });
  }, []);
  return (
    <div className="App">
      <div className="container">
        <div
          id="drop-region-container"
          className="drop-region-container mx-auto img-drop-box"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div id="drop-region" className="drop-region text-center">
            <div className="d-flex">
              <label
                htmlFor="file-upload"
                className="file-upload-label d-inline-block"
              >
                <FaUpload
                  style={{
                    color: "red",
                    width: "30px",
                    height: "30px",
                    display: "inline-block",
                  }}
                />
                Drag and Drop
              </label>
              <input
                id="file-input"
                type="file"
                style={{ display: "none" }}
                multiple
                onChange={handleInputByClick}
              />
            </div>
          </div>
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

        <div id="preview" className="mt-3 d-flex align-items-center">
          {images?.map((img, index) => (
            <Fragment key={index}>
              <img src={img} alt="media" width="50%" />
              <div className="w-50 text-center">
                <AiFillDelete
                  onClick={removePreviewImage}
                  className="icon"
                  style={{ color: "red" }}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
