import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

function AddDays() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
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

  const [open, setOpen] = useState({open1: false, open2: false, open3: false, open4: false, open5: false, open6: false, close1: false, close2: false, close3: false, close4: false, close5: false, close6: false});

  const getDayKey = (e, id) => {
    if (id === 0 && e.target.checked){
      setOpen({...open, open1: true})
    }else {
      setOpen({...open, open1: false})
    }
    console.log(id, e.target.checked);
  }

  return (
    <div className="container">
      {days.map((day, i) => {
        return (
          <div className="row" key={i}>
            <div className="col-md-3">{day}</div>
            {!open.open1 && <div className="col-md-2">
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
            <div className="col-md-3" style={{ paddingTop: "8px" }}>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={day}
                  id="flexCheckDefault"
                  onChange={(e) => getDayKey(e,i)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Open 24 Hours
                </label>
              </div>
            </div>
            <div className="col-md-2" style={{ paddingTop: "8px" }}>
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={i}
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
