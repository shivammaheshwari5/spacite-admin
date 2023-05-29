import React from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addpropertybtn from "../add-new-btn/Addpropertybtn";
import { Link } from "react-router-dom";

function CoworkingSpace() {
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Link to="/coworking-space/add-coworking-space">
        <Addpropertybtn />
      </Link>
    </div>
  );
}

export default CoworkingSpace;
