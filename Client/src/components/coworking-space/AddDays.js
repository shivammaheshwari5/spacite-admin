import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

function AddDays() {
  const [condition, setCondition] = useState(true);
  const [closedDays, setClosedDays] = useState([]);
  const [openDays, setOpenDays] = useState([]);

  const days = [
    { id: 1, name: "Monday", condition: true },
    { id: 2, name: "Tuesday", condition: true },
    { id: 3, name: "Wednesday", condition: true },
    { id: 4, name: "Thursday", condition: true },
    { id: 5, name: "Friday", condition: true },
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

  const handleClosedDay = (dayId) => {
    if (closedDays.includes(dayId)) {
      setClosedDays(closedDays.filter((day) => day !== dayId));
    } else {
      setClosedDays([...closedDays, dayId]);
    }
  };
  const handleOpenDay = (dayId) => {
    if (openDays.includes(dayId)) {
      setOpenDays(openDays.filter((day) => day !== dayId));
    } else {
      setOpenDays([...openDays, dayId]);
    }
  };

  return (
    <div className="container">
      {days.map((day) => (
        <div className="row" key={day.id}>
          <div className="col-md-2">{day.name}</div>
          {day.condition === condition &&
            !closedDays.includes(day.id) &&
            day.condition === condition &&
            !openDays.includes(day.id) && (
              <div className="col-md-4">
                <div className="row">
                <div className="col-md-6">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <Multiselect
                      options={options}
                      displayValue="name"
                      singleSelect
                      placeholder="From*"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{ borderBottom: "1px solid gray" }}>
                    <Multiselect
                      options={options}
                      displayValue="name"
                      singleSelect
                      placeholder="To*"
                    />
                  </div>
                </div>
                </div>
              </div>
            )}
          {day.condition === condition && !closedDays.includes(day.id) && (
            <div className="col-md-3" style={{ paddingTop: "8px" }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={day}
                  onClick={() => handleOpenDay(day.id)}
                  id={`open${day.id}`}
                />
                <label className="form-check-label" htmlFor={`open${day.id}`}>
                  Open 24 Hours
                </label>
              </div>
            </div>
          )}
          {day.condition === condition && !openDays.includes(day.id) && (
            <div className="col-md-2" style={{ paddingTop: "8px" }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onClick={() => handleClosedDay(day.id)}
                  id={`close${day.id}`}
                />
                <label className="form-check-label" htmlFor={`close${day.id}`}>
                  Closed
                </label>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AddDays;
