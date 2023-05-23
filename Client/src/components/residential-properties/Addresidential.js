import React from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addpropertyform from "../add-property/Addpropertyform";

function Addresidential() {
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Addpropertyform />
    </div>
  );
}

export default Addresidential;
