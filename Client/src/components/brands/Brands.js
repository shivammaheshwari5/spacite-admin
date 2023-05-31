import React from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import { Link } from "react-router-dom";
import Addbrand from "./Addbrand";
import Addpropertybtn from "../add-new-btn/Addpropertybtn";

const Brands = () => {

  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Link to="/brands/add-brand">
        <Addpropertybtn />
      </Link>
    </div>
  );
};

export default Brands;
