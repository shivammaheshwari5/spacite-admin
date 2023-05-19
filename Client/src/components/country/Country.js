import React, { useContext } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addnewbtn from "../add-new-btn/Addnewbtn";
import { AppContext } from "../../context/context";
import { Modal, Button } from "react-bootstrap";

function Country() {
  const myModal = useContext(AppContext);

  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Addnewbtn />
      <div>
        <Modal show={myModal.showModal} onHide={myModal.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Country</Modal.Title>
          </Modal.Header>
          <form action="">
          <Modal.Body>
              <input
                className="modal-input"
                type="text"
                placeholder="Name*"
                required
              />
              <input
                className="modal-input"
                type="text"
                placeholder="Description"
              />
              <input
                className="modal-input"
                type="text"
                placeholder="Dial Code*"
                required
              />
              <input
                className="modal-input"
                type="text"
                placeholder="Iso Code"
              />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={myModal.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Country;
