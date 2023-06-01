import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import EditorConvertToHTML from "../SEO/EditorConvertToHTML";
import Multiselect from "multiselect-react-dropdown";
import AddDays from "./AddDays";

function Addpropertyform() {
  const [propertyType, setPropertyType] = useState("Select property type");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  // const [showDiffrentDays, setShowDiffrentDays] = useState(false);
  // const [satOpen, setSatOpen] = useState(false);
  // const [sunOpen, setSunOpen] = useState(false);
  // const [fullOpen, setFullOpen] = useState(false);
  // const [isClose, setIsClose] = useState(false);
  const [open, setOpen] = useState({satOpen: false, sunOpen: false, fullOpen1: false, isClose1: false, showDiffrentDays: false, fullOpen2: false, isClose2: false, fullOpen3: false, isClose3: false,})
  const {satOpen, sunOpen, fullOpen1, isClose1, fullOpen2, isClose2, fullOpen3, isClose3, showDiffrentDays} = open
  const [options, setOptions] = useState([
    { name: "01:00 AM" },
    { name: "01:15 AM" },
    { name: "01:30 AM" },
    { name: "01:45 AM" },
    { name: "02:00 AM" },
    { name: "02:15 AM" },
    { name: "02:30 AM" },
    { name: "02:45 AM" },
    { name: "03:00 AM" },
    { name: "03:15 AM" },
    { name: "03:30 AM" },
  ]);

  const diffrentDaysHandler = () => {
    if (showDiffrentDays === true) {
      setOpen({...open, showDiffrentDays: false});
    } else {
      setOpen({...open, showDiffrentDays: true});
    }
  };

  const satOpenHandler = (e) => {
    if (showDiffrentDays === false) {
      if (e.target.checked) {
        setOpen({...open, satOpen: true});
      } else {
        setOpen({...open, satOpen: false, fullOpen2: false, isClose2: false});
      }
    }
    console.log(e.target.value);
  };

  const sunOpenHandler = (e) => {
      if (e.target.checked) {
        setOpen({...open, sunOpen: true});
      } else {
        setOpen({...open, sunOpen: false, fullOpen3: false, isClose3: false});
      }
  }

  const openFullHoursHandler = (e) => {
    if(e.target.checked && e.target.value === "mon-fri"){
      setOpen({...open, fullOpen1: true});
    }else if(!e.target.checked && e.target.value === "mon-fri"){
      setOpen({...open, fullOpen1: false});
    }else if(e.target.checked && e.target.value === "sat"){
      setOpen({...open, fullOpen2: true});
    }else if(!e.target.checked && e.target.value === "sat"){
      setOpen({...open, fullOpen2: false});
    }else if(e.target.checked && e.target.value === "sun"){
      setOpen({...open, fullOpen3: true});
    }else if(!e.target.checked && e.target.value === "sun"){
      setOpen({...open, fullOpen3: false});
    }
  }

  const closeHandler = (e) => {
    if(e.target.checked && e.target.value === "mon-fri-close") {
      setOpen({...open, isClose1: true});
    }else if(!e.target.checked && e.target.value === "mon-fri-close") {
      setOpen({...open, isClose1: false});
    }else if(e.target.checked && e.target.value === "sat") {
      setOpen({...open, isClose2: true});
    }else if(!e.target.checked && e.target.value === "sat") {
      setOpen({...open, isClose2: false});
    }else if(e.target.checked && e.target.value === "sun") {
      setOpen({...open, isClose3: true});
    }else if(!e.target.checked && e.target.value === "sun") {
      setOpen({...open, isClose3: false});
    }
  }

  const toast = useToast();
  const onchangeHandler = (e) => {
    setPropertyType(e.target.value);
    // console.log(e.target.value);
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

  const fileUpload = async (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      // data.append("upload_preset", "chat-anyone");
      // data.append("cloud_name", "dnkzjdhja");
      // fetch("https://api.cloudinary.com/v1_1/dnkzjdhja/image/upload", {
      //   method: "post",
      //   body: data,
      // })
      axios
        .post("/upload", { body: data })
        .then((res) => {
          setPic(res.Location);
          console.log(res.Location);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
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
                  <option>Select a brand</option>
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
            <div className="col-md-12">{/* <EditorConvertToHTML /> */}</div>
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
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Twitter title"
                className="property-input"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Twitter description"
                className="property-input"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Open graph title"
                className="property-input"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Open graph description"
                className="property-input"
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
          <div className="row">
            <input
              type="file"
              onChange={(e) => fileUpload(e.target.files[0])}
              accept="image/*"
            />
          </div>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="No. of seats*"
                className="property-input"
                required
              />
            </div>
          </div>
          <h4>Hours of operation</h4>
          <div className="row">
            <div className="col-md-3">
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onClick={diffrentDaysHandler}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Diffrent(6 days)
                </label>
              </div>
            </div>
            <div className="col-md-3">
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="saturday open"
                  id="flexCheckDefault"
                  onChange={satOpenHandler}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Saturday Open
                </label>
              </div>
            </div>
            <div className="col-md-3">
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onChange={sunOpenHandler}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Sunday Open
                </label>
              </div>
            </div>
          </div>
          {showDiffrentDays ? (
            <AddDays fullOpen={fullOpen1} isClose={isClose1}/>
          ) : (
            <div className="row">
              <div className="col-md-3">Monday-Friday</div>
              {fullOpen1 === false && isClose1 === false && <div className="col-md-2">
                <div style={{ borderBottom: "1px solid gray" }}>
                  <Multiselect
                    options={options} // Options to display in the dropdown
                    // selectedValues={selectedValue}
                    // onSelect={onSelect}
                    // onRemove={onRemove}
                    displayValue="name"
                    singleSelect
                    placeholder="From*"
                  />
                </div>
              </div>}
              {fullOpen1 === false && isClose1 === false && <div className="col-md-2">
                <div style={{ borderBottom: "1px solid gray" }}>
                  <Multiselect
                    options={options} // Options to display in the dropdown
                    // selectedValues={selectedValue}
                    // onSelect={onSelect}
                    // onRemove={onRemove}
                    displayValue="name"
                    singleSelect
                    placeholder="To*"
                  />
                </div>
              </div>}
              {isClose1 === false && <div className="col-md-3" style={{ paddingTop: "8px" }}>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="mon-fri"
                    id="flexCheckDefault"
                    onChange={openFullHoursHandler}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Open 24 Hours
                  </label>
                </div>
              </div>}
              {fullOpen1 === false && <div className="col-md-2" style={{ paddingTop: "8px" }}>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="mon-fri-close"
                    id="flexCheckDefault"
                    onChange={closeHandler}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Closed
                  </label>
                </div>
              </div>}
            </div>
          )}

          {satOpen && (
            <div className="row">
              <div className="col-md-3">Saturday</div>
              {fullOpen2 === false && isClose2 === false && <div className="col-md-2">
                <div style={{ borderBottom: "1px solid gray" }}>
                  <Multiselect
                    options={options} // Options to display in the dropdown
                    // selectedValues={selectedValue}
                    // onSelect={onSelect}
                    // onRemove={onRemove}
                    displayValue="name"
                    singleSelect
                    placeholder="From*"
                  />
                </div>
              </div>}
              {fullOpen2 === false && isClose2 === false && <div className="col-md-2">
                <div style={{ borderBottom: "1px solid gray" }}>
                  <Multiselect
                    options={options} // Options to display in the dropdown
                    // selectedValues={selectedValue}
                    // onSelect={onSelect}
                    // onRemove={onRemove}
                    displayValue="name"
                    singleSelect
                    placeholder="To*"
                  />
                </div>
                </div>}
              {isClose2 === false && <div className="col-md-3" style={{ paddingTop: "8px" }}>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="sat"
                    id="flexCheckDefault"
                    onChange={openFullHoursHandler}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Open 24 Hours
                  </label>
                </div>
              </div>}
              {fullOpen2 === false && <div className="col-md-2" style={{ paddingTop: "8px" }}>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="sat"
                    id="flexCheckDefault"
                    onChange={closeHandler}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Closed
                  </label>
                </div>
              </div>}
            </div>
          )}

          {sunOpen &&  (
            <div className="row">
              <div className="col-md-3">Sunday</div>
              {fullOpen3 === false && isClose3 === false && <div className="col-md-2">
                <div style={{ borderBottom: "1px solid gray" }}>
                  <Multiselect
                    options={options} // Options to display in the dropdown
                    // selectedValues={selectedValue}
                    // onSelect={onSelect}
                    // onRemove={onRemove}
                    displayValue="name"
                    singleSelect
                    placeholder="From*"
                  />
                </div>
              </div>}
              {fullOpen3 === false && isClose3 === false && <div className="col-md-2">
                <div style={{ borderBottom: "1px solid gray" }}>
                  <Multiselect
                    options={options} // Options to display in the dropdown
                    // selectedValues={selectedValue}
                    // onSelect={onSelect}
                    // onRemove={onRemove}
                    displayValue="name"
                    singleSelect
                    placeholder="To*"
                  />
                </div>
              </div>}
              {isClose3 === false && <div className="col-md-3" style={{ paddingTop: "8px" }}>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="sun"
                    id="flexCheckDefault"
                    onChange={openFullHoursHandler}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Open 24 Hours
                  </label>
                </div>
              </div>}
              {fullOpen3 === false && <div className="col-md-2" style={{ paddingTop: "8px" }}>
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="sun"
                    id="flexCheckDefault"
                    onChange={closeHandler}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Closed
                  </label>
                </div>
              </div>}
            </div>
          )}

          <div className="d-flex w-50 justify-content-between align-items-center">
              <h4>Plans</h4>
            <IoIosAddCircle
              onClick={createPlans}
              className="icon"
              style={{ cursor: "pointer" }}
            />
          </div>

          {plans?.map((id) => {
            return (
              <div className="row" key={id}>
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
                      <option>Category</option>
                      <option value="1BHK">1BHK</option>
                      <option value="2BHK">2BHK</option>
                      <option value="3BHK">3BHK</option>
                    </select>
                  </div>
                </div>
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
                      <option>Duration</option>
                      <option value="1BHK">Month</option>
                      <option value="2BHK">Day</option>
                      <option value="3BHK">Year</option>
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
