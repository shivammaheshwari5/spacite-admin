import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

function AddDays() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  return (
    <div className="container">
      {days.map((day, i) => {
        return (
          <div className="row" key={i}>
            <div className="col-md-3">{day}</div>
            <div className="col-md-2">
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
            </div>
            <div className="col-md-2">
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
            </div>
            <div className="col-md-3" style={{ paddingTop: "29px" }}>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Open 24 Hours
                </label>
              </div>
            </div>
            <div className="col-md-2" style={{ paddingTop: "29px" }}>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Close
                </label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AddDays;
