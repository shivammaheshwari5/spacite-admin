import React, { useContext, useEffect, useState } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import { GpState } from "../../context/context";
import { useToast } from "@chakra-ui/react";
import { BsBookmarkPlus } from "react-icons/bs";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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
import Delete from "../delete/Delete";
import "./Country.css";
import EditCountry from "./EditCountry";

function Country() {
  const { country, setCountry, user } = GpState();
  const [countryfield, setCountryfield] = useState({
    name: "",
    description: "",
    dialCode: "",
    isoCode: "",
  });
  const [updateTable, setUpdateTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/allCountry/country",
        {
          name: countryfield.name,
          description: countryfield.description,
          dial_code: countryfield.dialCode,
          iso_code: countryfield.isoCode,
        },
        config
      );
      setCountryfield({
        name: "",
        description: "",
        dialCode: "",
        isoCode: "",
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

  const handleDeleteCountry = async (id) => {
    try {
      axios.delete(`/api/allCountry/delete/${id}`).then((res) => {
        console.log(res);
        setUpdateTable((prev) => !prev);
        toast({
          title: "Deleted Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountry();
  }, [updateTable]);
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
              <ModalHeader>Add New Country</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
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
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" onClick={handleSaveCountry}>
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
              <Th>Dial Code</Th>
              <Th>Edit</Th>
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
              country?.map((countries) => (
                <Tr key={countries._id} id={countries._id}>
                  <Td>{countries.name}</Td>
                  <Td>{countries.dial_code}</Td>
                  <Td>
                    <EditCountry
                      id={countries._id}
                      countries={countries}
                      setUpdateTable={setUpdateTable}
                      // handleFunction={() => handleEditCountry(countries._id)}
                    />
                  </Td>
                  <Td>
                    <Delete
                      handleFunction={() => handleDeleteCountry(countries._id)}
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

export default Country;
