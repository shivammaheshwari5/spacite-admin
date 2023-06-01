import React, { useState, useEffect } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import { Link } from "react-router-dom";
import Addpropertybtn from "../add-new-btn/Addpropertybtn";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Delete from "../delete/Delete";
import { AiFillEdit } from "react-icons/ai";

const Brands = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const getBrandsData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/brand/brands");
      setLoading(false);
      setBrands(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBrandsData();
  }, [updateTable]);

  const handleDeleteBrands = async (id) => {
    try {
      const { data } = await axios.delete(`/api/brand/delete/${id}`);
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

  return (
    <>
      <div className="mx-5 mt-3">
        <Mainpanelnav />
        <Link to="/brands/add-brand">
          <Addpropertybtn />
        </Link>
      </div>
      <div className="table-box">
        <div className="table-top-box">Brands Table</div>
        <TableContainer marginTop="60px" variant="striped" color="teal">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Order</Th>
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
                brands?.map((brand) => (
                  <Tr key={brand._id} id={brand._id}>
                    <Td>{brand.name}</Td>
                    <Td>{brand.description}</Td>
                    <Td>{brand.order}</Td>
                    <Td>
                      <Link to={`/editbrand/${brand._id}`}>
                        <AiFillEdit
                          style={{ fontSize: "22px", cursor: "pointer" }}
                        />
                      </Link>
                    </Td>
                    <Td>
                      <Delete
                        handleFunction={() => handleDeleteBrands(brand._id)}
                      />
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Brands;
