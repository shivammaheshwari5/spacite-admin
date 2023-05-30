import React from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import EditorConvertToHTML from './EditorConvertToHTML';

function AddSeoForm() {
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <div className="container form-box">
        <form style={{ textAlign: "left" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Heading"
                />
              </div>
              <div className="col-md-6">
                <input
                  className="property-input"
                  type="text"
                  placeholder="Title*"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  className="property-input"
                  type="text"
                  placeholder="Description"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Path*"
                  required
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
                  className="property-input"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Robots"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Twitter title"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Twitter description"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Open graph title"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="property-input"
                  placeholder="Open graph description"
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
                  required
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <input type="text" className="property-input" placeholder="Footer title" />
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

export default AddSeoForm;
