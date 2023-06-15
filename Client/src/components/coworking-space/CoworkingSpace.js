import React, { useEffect, useState } from "react";
import Mainpanelnav from "../mainpanel-header/Mainpanelnav";
import Addpropertybtn from "../add-new-btn/Addpropertybtn";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
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
import { getWorkSpaceData } from "./WorkSpaceService";
function CoworkingSpace() {
  const [loading, setLoading] = useState(false);
  const [workSpaces, setWorkSpaces] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [microLocationSearchTerm, setMicroLocationSearchTerm] = useState("");
  const [searchedWorkSpaces, setSearchedWorkSpaces] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const toast = useToast();
  const handleFetchBrands = async () => {
    await getWorkSpaceData(setLoading, setWorkSpaces);
  };

  const handleSearch = () => {
    const filteredWorkSpaces = workSpaces.filter((workSpace) => {
      const cityName = workSpace.location.city?.name || "city";
      const microLocationName =
        workSpace.location.micro_location?.name || "microlocation";

      const matchName =
        workSpace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm.toLowerCase().includes(workSpace.name.toLowerCase());

      const matchCity =
        cityName.toLowerCase().includes(citySearchTerm.toLowerCase()) ||
        citySearchTerm.toLowerCase().includes(cityName.toLowerCase());

      const matchMicroLocation =
        microLocationName
          .toLowerCase()
          .includes(microLocationSearchTerm.toLowerCase()) ||
        microLocationSearchTerm
          .toLowerCase()
          .includes(microLocationName.toLowerCase());

      return matchName && matchCity && matchMicroLocation;
    });

    setSearchedWorkSpaces(filteredWorkSpaces);
    setCurPage(1);
  };

  useEffect(() => {
    handleFetchBrands();
  }, [updateTable]);

  useEffect(() => {
    handleSearch();
    setShowAll(
      searchTerm === "" &&
        citySearchTerm === "" &&
        microLocationSearchTerm === ""
    );
  }, [updateTable, searchTerm, citySearchTerm, microLocationSearchTerm]);
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

  const [selectItemNum, setSelectItemNum] = useState(5);
  const itemsPerPageHandler = (e) => {
    setSelectItemNum(e.target.value);
  };
  const [curPage, setCurPage] = useState(1);
  const recordsPerPage = selectItemNum;
  const lastIndex = curPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const nPage = Math.ceil(searchedWorkSpaces?.length / selectItemNum);
  if (firstIndex > 0) {
    var prePage = () => {
      if (curPage !== firstIndex) {
        setCurPage(curPage - 1);
      }
    };
  }

  var nextPage = () => {
    // if (curPage !== lastIndex) {
    //   setCurPage(curPage + 1);
    // }
    const lastPage = Math.ceil(searchedWorkSpaces.length / selectItemNum);
    if (curPage < lastPage) {
      setCurPage((prev) => prev + 1);
    }
  };

  const getFirstPage = () => {
    setCurPage(1);
  };

  const getLastPage = () => {
    setCurPage(nPage);
  };

  return (
    <div className="mx-5 mt-3">
      <Mainpanelnav />
      <Link to="/coworking-space/add-coworking-space" className="btnLink">
        <Addpropertybtn />
      </Link>
      <div className="table-box">
        <div className="table-top-box">Coworking Table</div>
        <TableContainer>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                value={citySearchTerm}
                onChange={(e) => setCitySearchTerm(e.target.value)}
                placeholder="Search by city"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                value={microLocationSearchTerm}
                onChange={(e) => setMicroLocationSearchTerm(e.target.value)}
                placeholder="Search by microlocation"
              />
            </div>
          </div>
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
                  <Td colSpan={8} textAlign="center">
                    <Spinner size="lg" />
                  </Td>
                </Tr>
              ) : showAll ? (
                workSpaces
                  ?.slice(
                    (curPage - 1) * selectItemNum,
                    curPage * selectItemNum
                  )
                  .map((workSpace) => (
                    <Tr key={workSpace._id}>
                      <Td>{workSpace.name}</Td>
                      <Td>
                        {workSpace.location.city
                          ? workSpace.location.city.name
                          : ""}
                      </Td>
                      <Td>
                        {workSpace.location.micro_location
                          ? workSpace.location.micro_location.name
                          : ""}
                      </Td>

                      <Td>{workSpace.createdAt.split("T")[0]}</Td>
                      <Td>{workSpace.status}</Td>
                      <Td>
                        <Link to={`/editworkspace/${workSpace._id}`}>
                          <AiFillEdit style={{ marginLeft: "0.5rem" }} />
                        </Link>
                      </Td>
                      <Td>
                        <AiOutlineEye style={{ margin: "auto" }} />
                      </Td>
                      <Td>
                        <Delete
                          onDelete={() => handleDeleteWorkSpaces(workSpace._id)}
                        />
                      </Td>
                    </Tr>
                  ))
              ) : searchedWorkSpaces.length > 0 ? (
                searchedWorkSpaces
                  .slice((curPage - 1) * selectItemNum, curPage * selectItemNum)
                  .map((workSpace, index) => (
                    <Tr key={workSpace._id}>
                      <Td>{workSpace.name}</Td>
                      <Td>
                        {workSpace.location.city
                          ? workSpace.location.city.name
                          : ""}
                      </Td>
                      <Td>
                        {workSpace.location.micro_location
                          ? workSpace.location.micro_location.name
                          : ""}
                      </Td>

                      <Td>{workSpace.createdAt.split("T")[0]}</Td>
                      <Td>{workSpace.status}</Td>
                      <Td>
                        <Link to={`/editworkspace/${workSpace._id}`}>
                          <AiFillEdit style={{ marginLeft: "0.5rem" }} />
                        </Link>
                      </Td>
                      <Td>
                        <AiOutlineEye style={{ margin: "auto" }} />
                      </Td>
                      <Td>
                        <Delete
                          onDelete={() => handleDeleteWorkSpaces(workSpace._id)}
                        />
                      </Td>
                    </Tr>
                  ))
              ) : (
                <Tr>
                  <Td colSpan={8}>No matching results found.</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        <nav className="mt-5">
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ width: "51%" }}
          >
            <p className="mb-0">Items per page: </p>
            <div style={{ borderBottom: "1px solid gray" }}>
              <select
                className="form-select"
                aria-label="Default select example"
                value={selectItemNum}
                onChange={itemsPerPageHandler}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div style={{ width: "110px" }}>
              {firstIndex + 1} - {searchedWorkSpaces?.length + firstIndex} of{" "}
              {workSpaces?.length}
            </div>

            <div className="page-item">
              <BiSkipPrevious onClick={getFirstPage} />
            </div>
            <div className="page-item">
              <GrFormPrevious onClick={prePage} />
            </div>
            <div className="page-item">
              <GrFormNext onClick={nextPage} />
            </div>
            <div className="page-item">
              <BiSkipNext onClick={getLastPage} />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default CoworkingSpace;
