import React, { useState } from "react";
const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [showModal, setShow] = useState(false);
  let isLoggedin = localStorage.getItem('isLoggedin');
  const [isLogin, setIsLogin] = useState(isLoggedin);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return <AppContext.Provider value={{handleClose, handleShow, showModal, isLogin, setIsLogin}}>
        {children}
    </AppContext.Provider>
}

export {AppContext, AppProvider}