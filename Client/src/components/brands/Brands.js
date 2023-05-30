import React from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import { BsBookmarkPlus } from "react-icons/bs";
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

const Brands = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Button className="addnew-btn" onClick={onOpen}>
          <BsBookmarkPlus />
          ADD NEW
      </Button>
    </div>
  );
};

export default Brands;
