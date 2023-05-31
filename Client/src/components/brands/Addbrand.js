import React, { useState } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import EditorConvertToHTML from "../SEO/EditorConvertToHTML";
import Multiselect from "multiselect-react-dropdown";

function Addbrand() {
  const [options, setOptions] = useState([
    { name: "Option 1️", id: 1 },
    { name: "Option 2️", id: 2 },
  ]);
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <div className="container form-box">
        <form style={{ textAlign: "left" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Name*"
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  className="property-input"
                  type="text"
                  placeholder="Description*"
                  required
                />
              </div>
              <div className="col-md-3">
                <h5 style={{ marginTop: "25px" }}>Logo Upload</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <input
                  className="property-input"
                  type="text"
                  placeholder="Order*"
                />
              </div>
              <div className="col-md-3">
                <div class="form-check mt-4">
                  <input
                    className="form-check-input"
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Should Show on Home
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  style={{ borderBottom: "1px solid gray", margin: "20px 0" }}
                >
                  <Multiselect
                    options={options} // Options to display in the dropdown
                    // selectedValues={selectedValue}
                    // onSelect={onSelect}
                    // onRemove={onRemove}
                    displayValue="name"
                    placeholder="Select Cities"
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
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Description*"
                  className="property-input"
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Keywords*"
                  className="property-input"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="URL*"
                  className="property-input"
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
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Twitter title"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Twitter description"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Open graph title"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Open graph description"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Footer title"
                />
              </div>
            </div>
            <h6>Footer description</h6>
            <div className="row">
              <div className="col-md-12">
                <EditorConvertToHTML />
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

export default Addbrand;
