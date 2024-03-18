import { useState, useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

const UuidContext = createContext();
const UuidProvider = ({ children }) => {
  const [uuid, setUUID] = useState(localStorage.getItem("uuid") || "");
  if (!uuid) {
    const generatedUUID = uuidv4();
    setUUID(generatedUUID);
    localStorage.setItem("uuid", generatedUUID);
  }

  return (
    <UuidContext.Provider value={[uuid, setUUID]}>
      {children}
    </UuidContext.Provider>
  );
};

// custom hook
const useUUID = () => useContext(UuidContext);

export { useUUID, UuidProvider };
