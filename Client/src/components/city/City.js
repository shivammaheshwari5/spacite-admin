import React, { useState, useEffect } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import { BsBookmarkPlus } from "react-icons/bs";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { GpState } from "../../context/context";
import Delete from "../delete/Delete";

function City() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [cityfield, setCityfield] = useState({
    name: "",
    country: "",
    state: "",
    description: "",
  });
  const [states, setStates] = useState([]);
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const { user, country, setCountry } = GpState();
  const toast = useToast();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCityfield({
      ...cityfield,
      [name]: value,
    });
  };

  const handleSaveCity = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/city/cities",
        {
          name: cityfield.name,
          description: cityfield.description,
          country: countryId,
          state: stateId,
        },
        config
      );
      setCityfield({
        name: "",
        description: "",
        country: "",
        state: "",
      });
      setUpdateTable((prev) => !prev);
      onClose();
      toast({
        title: "Saved Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
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
  const getCity = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/city/cities", config);
      setLoading(false);
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getState = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/state/states", config);
      setLoading(false);
      setStates(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCountry = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/allCountry/countries", config);
      setLoading(false);
      setCountry(data.country);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCity = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.delete(`/api/city/delete/${id}`, config);
      setUpdateTable((prev) => !prev);
      toast({
        title: "Deleted Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    getState();
    getCountry();
    getCity();
  }, [updateTable]);
  const onChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    const { name, value } = e.target;
    setCityfield({
      ...cityfield,
      [name]: value,
    });
    setCountryId(option);
  };
  const onChangeHandlerState = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    const { name, value } = e.target;
    setCityfield({
      ...cityfield,
      [name]: value,
    });
    setStateId(option);
  };
  return (
    <>
      <div className="mx-5 mt-3">
        <Mainpanelnav />
        <Button className="addnew-btn" onClick={onOpen}>
          <BsBookmarkPlus />
          ADD NEW
        </Button>
        <div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New City</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <select
                  name="country"
                  value={cityfield.country}
                  onChange={onChangeHandler}
                >
                  <option>Select Country</option>
                  {country?.map((countryElem) => (
                    <option
                      id={countryElem._id}
                      key={countryElem._id}
                      value={countryElem.name}
                    >
                      {countryElem.name}
                    </option>
                  ))}
                </select>
                <select
                  name="state"
                  value={cityfield.state}
                  onChange={onChangeHandlerState}
                >
                  <option>Select State</option>
                  {states?.map((stateElem) => (
                    <option
                      id={stateElem._id}
                      key={stateElem._id}
                      value={stateElem.name}
                    >
                      {stateElem.name}
                    </option>
                  ))}
                </select>
                <input
                  name="name"
                  value={cityfield.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Name"
                />
                <input
                  name="description"
                  value={cityfield.description}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Description"
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" onClick={handleSaveCity}>
                  Save Changes
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
      <TableContainer marginTop="150px" variant="striped" color="teal">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Country</Th>
              <Th>State</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td>
                  <Spinner
                    size="xl"
                    w={20}
                    h={20}
                    marginLeft="180px"
                    alignSelf="center"
                    margin="auto"
                  />
                </Td>
              </Tr>
            ) : (
              cities?.map((city) => (
                <Tr key={city._id} id={city._id}>
                  <Td>{city.name}</Td>
                  <Td>{city.country?.name}</Td>
                  <Td>{city.state?.name}</Td>
                  <Td>
                    <Delete handleFunction={() => handleDeleteCity(city._id)} />
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default City;
