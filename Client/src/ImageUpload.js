import React, { useState, Fragment, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ImageUpload = ({
  images,
  setImages,
  progress,
  setProgress,
  uploadFile,
}) => {
  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removePreviewImage = (e) => {
    const index = e.target.getAttribute("index");
    const allimages = [];
    allimages.splice(index, 1);
    setImages(allimages);
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
    uploadFile(Array.from(e.target.files));
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
  console.log(images);

  return (
    <div className="App">
      <div className="container">
        <div
          id="drop-region-container"
          className="drop-region-container mx-auto"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div id="drop-region" className="drop-region text-center">
            <img id="download-btn" src="/Download.png" width="80" alt="" />
            <h2>Drag and Drop or Click to Upload</h2>
            <input
              id="file-input"
              type="file"
              multiple
              onChange={handleInputByClick}
            />
          </div>
        </div>
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

        <div id="preview" className="mx-auto">
          {images?.map((img, index) => (
            <Fragment key={index}>
              <img src={img} alt="" />
              <button
                className="btn btn-danger btn-block mx-auto"
                onClick={removePreviewImage}
              >
                Delete
              </button>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
