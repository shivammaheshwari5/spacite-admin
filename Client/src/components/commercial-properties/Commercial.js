import React, { useContext } from "react";
import "./Commercial.css";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addnewbtn from "../add-new-btn/Addnewbtn";
import { GpState } from "../../context/context";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Addpropertybtn from "../add-new-btn/Addpropertybtn";

function Commercial() {
  const { handleClose, showModal } = GpState();

  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Link to="/commercial-properties/add-commercial-property">
        <Addpropertybtn />
      </Link>
    </div>
  );
}

export default Commercial;
