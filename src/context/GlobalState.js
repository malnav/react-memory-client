import React, { useState } from "react";
export const GlobalContext = React.createContext(null);
export const GlobalProvider = ({ children }) => {
  
  
  
  const [open, setOpen] = React.useState(false);
  const [modalMemory,setModalMemory] = useState({})

  const [memories, setMemories] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [memoryGlobal, setMemoryGlobal] = useState({
    title: "",
    message: "",
    creator: !localStorage.getItem("user") ? "" : JSON.parse(localStorage.getItem("user")).profile.name,
    tags: [],
    selectedFile: "",
  })

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        memoryGlobal,
        setMemoryGlobal,
        memories,
        setMemories,
        open,
        setOpen,
        modalMemory,
        setModalMemory
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
