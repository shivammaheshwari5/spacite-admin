import React, { useContext, useState } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addnewbtn from "../add-new-btn/Addnewbtn";
import { AppContext } from "../../context/context";
import { Modal, Button } from "react-bootstrap";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

function Country() {
  const myModal = useContext(AppContext);
  const [countryfield, setCountryfield] = useState({
    name: "",
    description: "",
    dialCode: "",
    isoCode: "",
  });
  const [country, setCountry] = useState([]);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCountryfield({
      ...countryfield,
      [name]: value,
    });
  };
  const handleSaveCountry = async () => {
    if ((!countryfield.name, !countryfield.dialCode)) {
      toast({
        title: "Please Fill all The Fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const { data } = await axios.post("/api/allCountry/country", {
        name: countryfield.name,
        description: countryfield.description,
        dialCode: countryfield.dialCode,
        isoCode: countryfield.isoCode,
      });
      setCountryfield("");
      console.log(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Addnewbtn />
      <div>
        <Modal show={myModal.showModal} onHide={myModal.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Country</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={countryfield.name}
              onChange={handleInputChange}
              placeholder="Name"
              name="name"
            />
            <input
              type="text"
              value={countryfield.description}
              onChange={handleInputChange}
              placeholder="Description"
              name="description"
            />
            <input
              type="text"
              value={countryfield.dialCode}
              onChange={handleInputChange}
              placeholder="Dial Code"
              name="dialCode"
            />
            <input
              type="text"
              value={countryfield.isoCode}
              onChange={handleInputChange}
              placeholder="Iso Code"
              name="isoCode"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={myModal.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveCountry}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Country;
