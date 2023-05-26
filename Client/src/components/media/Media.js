import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import React, { useContext, useEffect, useState } from "react";
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
import ImageUpload from "../../ImageUpload";
import { GpState } from "../../context/context";
import Delete from "../delete/Delete";

function Media() {
  const [updateTable, setUpdateTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  // const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [imagedata, setImagedata] = useState([]);
  const toast = useToast();
  const { user } = GpState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const previewFile = (data) => {
    const allimages = images;
    setImages(allimages.concat(data));
  };

  const uploadFile = (files) => {
    const formData = new FormData();
    setProgress(0);
    files.forEach((file) => {
      formData.append("files", file, file.name);
    });
    axios
      .post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setProgress(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      })
      .then((res) => {
        previewFile(res.data);
        setTimeout(() => {
          setProgress(0);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveImage = async () => {
    if ((!name, !images)) {
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
      const { data } = await axios.post("/api/image/multiple-upload", {
        name: images[0],
        real_name: name,
      });
      setName("");
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

  const getImages = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/image/getimages", config);
      setLoading(false);
      setImagedata(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImages = async (id) => {
    try {
      await axios.delete(`/api/image/delete/${id}`).then((res) => {
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
    getImages();
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  name="name"
                />
                <ImageUpload
                  images={images}
                  setImages={setImages}
                  progress={progress}
                  setProgress={setProgress}
                  uploadFile={uploadFile}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" onClick={handleSaveImage}>
                  Save Changes
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
      <TableContainer marginTop="60px" variant="striped" color="teal">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Dial Code</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td align="center" style={{ width: "50px" }}>
                  <Spinner
                    size="xl"
                    w={20}
                    h={20}
                    alignSelf="center"
                    style={{ position: "absolute", left: "482px" }}
                  />
                </Td>
              </Tr>
            ) : (
              imagedata?.map((image) => (
                <Tr key={image._id} id={image._id}>
                  <Td>{image.real_name}</Td>
                  <Td>{image.name}</Td>
                  <Td>
                    <Delete handleFunction={() => deleteImages(image._id)} />
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

export default Media;
