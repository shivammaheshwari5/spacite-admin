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

function State() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [statefield, setStatefield] = useState({
    name: "",
    country: "",
    description: "",
  });
  const [countryId, setCountryId] = useState(null);
  const { user, country, setCountry } = GpState();
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStatefield({
      ...statefield,
      [name]: value,
    });
  };

  const handleSaveStates = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/state/states",
        {
          name: statefield.name,
          description: statefield.description,
          country: countryId,
        },
        config
      );
      setStatefield({
        name: "",
        description: "",
        country: "",
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
  const handleDeleteStates = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.delete(`/api/state/delete/${id}`, config);
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
  }, [updateTable]);

  const onChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    const { name, value } = e.target;
    setStatefield({
      ...statefield,
      [name]: value,
    });
    setCountryId(option);
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
              <ModalHeader>Add New State</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <select
                  name="country"
                  value={statefield.country}
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
                <input
                  name="name"
                  value={statefield.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Name"
                />
                <input
                  name="description"
                  value={statefield.description}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Description"
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" onClick={handleSaveStates}>
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
              states?.map((state) => (
                <Tr key={state._id} id={state._id}>
                  <Td>{state.name}</Td>
                  <Td>{state.country?.name}</Td>
                  <Td>
                    <Delete
                      handleFunction={() => handleDeleteStates(state._id)}
                    />
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

export default State;
