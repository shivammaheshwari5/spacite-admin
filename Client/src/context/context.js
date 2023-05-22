import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showModal, setShow] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token") ? true : false;
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
      value={{ handleClose, handleShow, showModal, user, setUser, isLogin }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
