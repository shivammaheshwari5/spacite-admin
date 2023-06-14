import React, { useEffect, useState } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addpropertybtn from "../add-new-btn/Addpropertybtn";
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
import { Link } from "react-router-dom";
import Delete from "../delete/Delete";
import { AiFillEdit } from "react-icons/ai";
import { config } from "../../services/Services";
function CoworkingSpace() {
  const [loading, setLoading] = useState(false);
  const [workSpaces, setWorkSpaces] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchWorkSpaces, setSearchWorkSpaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [microLocationSearchTerm, setMicroLocationSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");

  const toast = useToast();
  const getWorkSpaceData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/workSpace/workSpaces", config);
      setLoading(false);
      setWorkSpaces(data);
    } catch (error) {
      console.log(error);
    }
  };
  // const searchWorkSpaceData = async (query) => {
  //   try {
  //     setLoading(true);
  //     setSearch(query);
  //     if (!query) {
  //       return;
  //     }

  //     const { data } = await axios.get(
  //       `/api/workSpace/workSpaces/search?name=${search}`,
  //       config
  //     );
  //     setLoading(false);
  //     setSearchWorkSpaces(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    getWorkSpaceData();
  }, [updateTable]);

  const handleDeleteWorkSpaces = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/workSpace/delete/${id}`,
        config
      );
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
  console.log(searchWorkSpaces);
  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Link to="/coworking-space/add-coworking-space">
        <Addpropertybtn />
      </Link>
      <div className="table-box">
        <div className="table-top-box">Coworking Space Table</div>

        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              value={citySearchTerm}
              onChange={(e) => setCitySearchTerm(e.target.value)}
              placeholder="Search by city"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              value={microLocationSearchTerm}
              onChange={(e) => setMicroLocationSearchTerm(e.target.value)}
              placeholder="Search by microlocation"
            />
          </div>
        </div>

        <TableContainer marginTop="60px" variant="striped" color="teal">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>City</Th>
                <Th>MicroLocation</Th>
                <Th>Added On</Th>
                <Th>Status</Th>
                <Th>Edit</Th>
                <Th>Preview</Th>
                <Th>Action</Th>
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
                workSpaces
                  ?.filter((workSpace) => {
                    const cityName = workSpace.location.city?.name || "city";
                    const microLocationName =
                      workSpace.location.micro_location?.name ||
                      "microlocation";

                    const matchName =
                      workSpace.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      searchTerm
                        .toLowerCase()
                        .includes(workSpace.name.toLowerCase());

                    const matchCity =
                      cityName
                        .toLowerCase()
                        .includes(citySearchTerm.toLowerCase()) ||
                      citySearchTerm
                        .toLowerCase()
                        .includes(cityName.toLowerCase());

                    const matchMicroLocation =
                      microLocationName
                        .toLowerCase()
                        .includes(microLocationSearchTerm.toLowerCase()) ||
                      microLocationSearchTerm
                        .toLowerCase()
                        .includes(microLocationName.toLowerCase());

                    return matchName && matchCity && matchMicroLocation;
                  })
                  .map((workSpace) => (
                    <Tr key={workSpace._id} id={workSpace._id}>
                      <Td>{workSpace.name}</Td>
                      <Td>{workSpace.location.city?.name || "city"}</Td>
                      <Td>
                        {workSpace.location.micro_location?.name ||
                          "microlocation"}
                      </Td>
                      <Td>{workSpace.createdAt.split("T")[0]}</Td>
                      <Td>{workSpace.status}</Td>
                      <Td>
                        <Link to={`/editworkspace/${workSpace._id}`}>
                          <AiFillEdit
                            style={{ fontSize: "22px", cursor: "pointer" }}
                          />
                        </Link>
                      </Td>
                      <Td>Preview</Td>
                      <Td>
                        <Delete
                          handleFunction={() =>
                            handleDeleteWorkSpaces(workSpace._id)
                          }
                        />
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

export default CoworkingSpace;
