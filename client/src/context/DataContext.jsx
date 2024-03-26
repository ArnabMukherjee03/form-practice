import { createContext, useState} from "react";
import axios_instance from "../config/axios_config";


export const dataContext = createContext();

const DataProvider = ({ children }) => {
    const [data,setData] = useState([]);
    const fetchAttributes = async ()=>{
        try {
            const response = await axios_instance.get("/attrubutes/get");
            setData(response.data);
        } catch (error) {
            console.log("error",error);
        }
    }
  return (
    <dataContext.Provider
      value={{
        data,
        fetchAttributes
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default DataProvider;
