import React, { useContext, useEffect, useState } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addnewbtn from "../add-new-btn/Addnewbtn";
import { AppContext } from "../../context/context";
import { Modal, Button } from "react-bootstrap";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { AiTwotoneDelete } from "react-icons/ai";

function Country() {
  const myModal = useContext(AppContext);
  const [countryfield, setCountryfield] = useState({
    name: "",
    description: "",
    dialCode: "",
    isoCode: "",
  });
  const [country, setCountry] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
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
        dial_code: countryfield.dialCode,
        iso_code: countryfield.isoCode,
      });
      setCountryfield("");
      setUpdateTable((prev) => !prev);
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

  const getCountry = async () => {
    try {
      const { data } = await axios.get("/api/allCountry/countries");
      console.log(data.country);
      setCountry(data.country);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCountry = async (id) => {
    try {
      axios.delete(`/api/allCountry/delete/${id}`).then((res) => {
        console.log(res);
        setUpdateTable((prev) => !prev);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCountry = async (id) => {
    try {
      const { data } = await axios.put(`/api/allCountry/country/${id}`, {
        name: countryfield.name,
        countryId: id,
      });
      setCountry(data);
      setUpdateTable((prev) => !prev);
    } catch (error) {}
  };

  useEffect(() => {
    getCountry();
  }, [updateTable]);
  return (
    <>
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
      <TableContainer variant="striped" colorScheme="teal">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Dial Code</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {country.map((countries) => (
              <Tr key={countries._id} id={countries._id}>
                <Td>{countries.name}</Td>
                <Td>{countries.dial_code}</Td>
                <Td>Edit</Td>
                <Td onClick={() => handleDeleteCountry(countries._id)}>
                  <AiTwotoneDelete />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Country;
