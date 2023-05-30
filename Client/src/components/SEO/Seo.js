import React, { useContext } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addpropertybtn from "../add-new-btn/Addpropertybtn";
import { Link } from "react-router-dom";

function Seo() {

  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Link to="/seo/add-seo">
        <Addpropertybtn />
      </Link>
    </div>
  );
}

export default Seo;
