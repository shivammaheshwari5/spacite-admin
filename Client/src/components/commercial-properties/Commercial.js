import React, { useContext } from "react";
import "./Commercial.css";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addnewbtn from "../add-new-btn/Addnewbtn";
import { GpState } from "../../context/context";
import { Modal, Button } from "react-bootstrap";

function Commercial() {
  const { handleClose, showModal } = GpState();

  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Addnewbtn />
      <div>
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
      </div>
    </div>
  );
}

export default Commercial;
