import React from 'react';
import { BsBookmarkPlus } from "react-icons/bs";
import "./Addnewbtn.css";
import { Button } from "react-bootstrap";

function Addpropertybtn() {
  return (
    <>
        <div style={{float: "right"}}>
        <Button variant="primary" className="addnew-btn">
          <BsBookmarkPlus />
          ADD NEW
        </Button>
      </div>
    </>
  )
}

export default Addpropertybtn