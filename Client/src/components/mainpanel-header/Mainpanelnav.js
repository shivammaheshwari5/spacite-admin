import React, { useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Mainpanelnav.css";
import { useNavigate } from "react-router-dom";

function Mainpanelnav() {
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const navigate = useNavigate();
  let url = window.location.href;
  let splitUrl = url.split("/");
  let title = splitUrl[splitUrl.length - 1];
  if (title === "") {
    title = "Commercial Properties";
  }
  const logoutHandle = () => {
    localStorage.removeItem("userInfo");
    navigate("/", { replace: true });
  };
  const showLogoutButton = () => {
    if (showLogoutBtn === false) {
      setShowLogoutBtn(true);
    } else {
      setShowLogoutBtn(false);
    }
  };

  // const logoutHandler = () => {
  //   localStorage.setItem('isLoggedin', false)
  //   loginApp.setIsLogin(false);
  // }

  return (
    <div>
      <div className="mainpanel-nav d-flex justify-content-between">
        <p style={{ fontSize: "21px", textTransform: "capitalize" }}>
          {title.replace("-", " ")}
        </p>
        <FaUserCircle className="mainpanel-icon" onClick={showLogoutButton} />
      </div>
      <div
        className="logoutbtn"
        onClick={logoutHandle}
        style={
          showLogoutBtn ? { visibility: "visible" } : { visibility: "hidden" }
        }
      >
        Logout
      </div>
    </div>
  );
}

export default Mainpanelnav;
