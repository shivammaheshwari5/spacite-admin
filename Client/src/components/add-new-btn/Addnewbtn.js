import React, { useState } from "react";
import { BsBookmarkPlus } from "react-icons/bs";
import "./Addnewbtn.css";
import { Modal, Button } from "react-bootstrap";

function Addnewbtn() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div style={{float: "right"}}>
        <Button variant="primary" className="addnew-btn" onClick={handleShow}>
          <BsBookmarkPlus />
          ADD NEW
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Addnewbtn;
