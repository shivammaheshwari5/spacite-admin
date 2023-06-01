import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [showModal, setShow] = useState(false);
  const [user, setUser] = useState();
  const [country, setCountry] = useState([]);
  const navigate = useNavigate();
  let isLogin = localStorage.getItem("token") ? true : false;
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <AppContext.Provider
      value={{
        handleClose,
        handleShow,
        showModal,
        user,
        setUser,
        isLogin,
        country,
        setCountry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const GpState = () => {
  return useContext(AppContext);
};

export default AppProvider;
