import React, { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const EditCountry = ({ countries, setUpdateTable }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(countries.name);
  const [isoCode, setIsoCode] = useState(countries.iso_code);
  const [dialCode, setDialCode] = useState(countries.dial_code);
  const [countryId, setCountryId] = useState(countries._id);
  const [description, setDiscription] = useState(countries.description);
  const toast = useToast();

  const handleEditCountry = async () => {
    try {
      axios
        .put(`/api/allCountry/country/${countryId}`, {
          countryId: countryId,
          name: name,
          dial_code: dialCode,
        })
        .then((res) => {
          setUpdateTable((prev) => !prev);
          onClose();
          toast({
            title: "Update Successfully!",
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
  return (
    <>
      <Button onClick={onOpen}>EDIT</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              name="name"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDiscription(e.target.value)}
              placeholder="Description"
              name="description"
            />
            <input
              type="text"
              value={dialCode}
              onChange={(e) => setDialCode(e.target.value)}
              placeholder="Dial Code"
              name="dialCode"
            />
            <input
              type="text"
              value={isoCode}
              onChange={(e) => setIsoCode(e.target.value)}
              placeholder="Iso Code"
              name="isoCode"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleEditCountry}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCountry;
