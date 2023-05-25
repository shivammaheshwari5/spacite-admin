import React, { useEffect, useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const [imageURLS, setImageURLs] = useState([]);
  const inputRef = React.useRef();

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);
    const response = await fetch("/api/image/upload", {
      method: "POST",
      body: formData,
    });

    const res2 = await response.json();
    console.log(res2);
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }
  console.log(images);
  return (
    <div className="App">
      <h1>Upload to server</h1>
      {/* {image.preview && <img  width="100" height="100" />} */}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          //   ref={inputRef}
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
  );
};

export default FileUpload;
