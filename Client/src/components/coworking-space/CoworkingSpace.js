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
function CoworkingSpace() {
  const [loading, setLoading] = useState(false);
  const [workSpaces, setWorkSpaces] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
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

  const [selectItemNum, setSelectItemNum] = useState(10);
  const itemsPerPageHandler = (e) => {
    setSelectItemNum(e.target.value);
  };
  const [curPage, setCurPage] = useState(1);
  const recordsPerPage = selectItemNum;
  const lastIndex = curPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = workSpaces?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(workSpaces?.length / selectItemNum);
  if (firstIndex > 0) {
    var prePage = () => {
      if (curPage !== firstIndex) {
        setCurPage(curPage - 1);
      }
    };
  }

  // console.log(selectItemNum);
  // if (records?.length === selectItemNum) {
  var nextPage = () => {
    if (curPage !== lastIndex) {
      setCurPage(curPage + 1);
    }
  };
  // console.log(records.length);
  // }

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
        <div className="table-top-box">Coworking Space Table</div>
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
                records?.map((workSpace) => (
                  <Tr key={workSpace._id} id={workSpace._id}>
                    <Td>
                      {workSpace.name.length > 16
                        ? workSpace.name.substring(0, 16) + ".."
                        : workSpace.name}
                    </Td>
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
                    <Td>
                      <AiOutlineEye style={{ margin: "auto" }} />
                    </Td>
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
                required
                value={selectItemNum}
                onChange={itemsPerPageHandler}
                style={{ paddingLeft: "0" }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div style={{ width: "110px" }}>
              {firstIndex + 1} - {records?.length + firstIndex} of{" "}
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
