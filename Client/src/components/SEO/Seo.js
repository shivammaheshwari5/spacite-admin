import React, { useContext, useEffect, useState } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addpropertybtn from "../add-new-btn/Addpropertybtn";
import { Link, useNavigate } from "react-router-dom";
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
import EditSeo from "./EditSeo";
import { AiFillEdit } from "react-icons/ai";

function Seo() {
  const [loading, setLoading] = useState(false);
  const [seos, setSeos] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const getSeoData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/seo/seos");
      setLoading(false);
      setSeos(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSeoData();
  }, [updateTable]);

  const handleDeleteSeo = async (id) => {
    try {
      const { data } = await axios.delete(`/api/seo/delete/${id}`);
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
  console.log(seos);
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Link to="/seo/add-seo">
        <Addpropertybtn />
      </Link>
      <div className="table-box">
        <div className="table-top-box">SEO Table</div>
        <TableContainer marginTop="60px" variant="striped" color="teal">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Path</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Edit</Th>
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
                seos?.map((seo) => (
                  <Tr key={seo._id} id={seo._id}>
                    <Td>{seo.path}</Td>
                    <Td>{seo.title}</Td>
                    <Td>{seo.description}</Td>
                    <Td>
                      <Link to={`/editseo/${seo._id}`}>
                        <AiFillEdit
                          style={{ fontSize: "22px", cursor: "pointer" }}
                        />
                      </Link>
                    </Td>
                    <Td>
                      <Delete handleFunction={() => handleDeleteSeo(seo._id)} />
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Seo;
