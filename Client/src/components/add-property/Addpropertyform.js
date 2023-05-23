import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";

function Addpropertyform() {
  const [propertyType, setPropertyType] = useState("Select property type");
  const [plans, setPlans] = useState([]);
  const onchangeHandler = (e) => {
    setPropertyType(e.target.value);
    console.log(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  const createPlans = () => {
    const addPlans = [...plans, []];
    setPlans(addPlans);
  };

  const removePlan = (id) => {
    const deletePlan = [...plans];
    deletePlan.splice(id, 1);
    setPlans(deletePlan);
  };

  return (
    <div className="container form-box">
      <form style={{ textAlign: "left" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div style={{ borderBottom: "1px solid gray", margin: "20px 0" }}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option>Select a builder</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <input
                className="property-input"
                type="text"
                placeholder="Name*"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <input
                className="property-input"
                type="text"
                placeholder="Website url"
              />
            </div>
            <div className="col-md-6">
              <div style={{ borderBottom: "1px solid gray", margin: "20px 0" }}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  required
                  value={propertyType}
                  onChange={onchangeHandler}
                >
                  <option>Select property type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>
          </div>
          <h4>Slug Update</h4>
          <div className="row">
            <div className="col-md-12">
              <input
                className="property-input"
                type="text"
                placeholder="Slug"
              />
            </div>
          </div>
          <h4>SEO Details</h4>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                className="property-input"
                placeholder="Title"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="property-input"
                placeholder="Description"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="property-input"
                placeholder="Robots"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                className="property-input"
                placeholder="Keywords"
              />
            </div>
            <div className="col-md-3">
              <input type="text" className="property-input" placeholder="Url" />
            </div>
            <div className="col-md-3">
              <div style={{ borderBottom: "1px solid gray", margin: "20px 0" }}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option>Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
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
                required
              ></textarea>
            </div>
            <div className="col-md-3">
              <div style={{ borderBottom: "1px solid gray", margin: "20px 0" }}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option>Select a country*</option>
                  <option value="India">India</option>
                  <option value="Ukraine">Ukraine</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div style={{ borderBottom: "1px solid gray", margin: "20px 0" }}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option>Select a state*</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div style={{ borderBottom: "1px solid gray", margin: "20px 0" }}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option>Select a city*</option>
                  <option value="Haryana">Gurugram</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Uttar Pradesh">Noida</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div style={{ borderBottom: "1px solid gray", margin: "20px 0" }}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option>Select a microlocation*</option>
                  <option value="Haryana">Sector 48</option>
                  <option value="Delhi">Sector 46</option>
                  <option value="Uttar Pradesh">Sector 49</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Lattitude*"
                className="property-input"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Longitude*"
                className="property-input"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                className="property-input"
                placeholder="Postel code"
              />
            </div>
          </div>
          <h4>Amenities</h4>
          <div className="row">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Parking
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Lift
              </label>
            </div>
          </div>
          <h4>Images</h4>
          <div className="row"></div>
          <div className="d-flex w-50 justify-content-between align-items-center">
            {propertyType === "Commercial" ? (
              <h4>Commercial Plans</h4>
            ) : (
              <h4>Residential Plans</h4>
            )}
            <IoIosAddCircle
              onClick={createPlans}
              className="icon"
              style={{ cursor: "pointer" }}
            />
          </div>

          {plans?.map((id, data) => {
            return (
              <div className="row">
                <div className="col-md-3">
                  <div
                    style={{
                      borderBottom: "1px solid gray",
                      margin: "20px 0",
                    }}
                  >
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option>Select type</option>
                      <option value="1BHK">1BHK</option>
                      <option value="2BHK">2BHK</option>
                      <option value="3BHK">BHK</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    onChange={handleChange}
                    className="property-input"
                    placeholder="Price*"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    onChange={handleChange}
                    className="property-input"
                    placeholder="Area*"
                    required
                  />
                </div>
                <div className="col-md-3 d-flex align-items-center">
                  <AiFillDelete
                    className="icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => removePlan(id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="form-footer">
          <button type="submit" className="saveproperty-btn">
            Save
          </button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Addpropertyform;
