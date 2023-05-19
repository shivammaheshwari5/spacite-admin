import React, { useState } from "react";
const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return <AppContext.Provider value={{handleClose, handleShow, showModal}}>
        {children}
    </AppContext.Provider>
}

export {AppContext, AppProvider}