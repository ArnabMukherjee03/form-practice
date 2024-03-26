import { useEffect, useState } from "react";
import axios_instance from "../config/axios_config";


export const UserData = () => {
  const [data, setData] = useState([]);
  const [edit,setEdit] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios_instance.get("/data/get");
        setData(response.data);
      } catch (error) {
        alert("Something Went Wrong");
      }
    };

    fetchData();
  }, []);

  console.log(data);

 
    const deleteData = async (id)=>{
        try {
          const response = await axios_instance.delete(`/data/delete/${id}`);
          if(response.status === 200){
              window.location.reload();
              console.log(response.data);
          }
      } catch (error) {
          alert("Something went wrong")
          console.log(error);
      }
    }

  return (
    <div className="mt-8 flex flex-col gap-4 h-80 w-[400px] items-center overflow-y-auto ">
      {data.map((data) => (
        <div
          key={data.id}
          className="w-60 border border-gray-400 py-4 px-2 h-auto relative"
        >
          {!edit?<div className=" cursor-pointer" onClick={()=>setEdit(data.id)}>Edit </div>:<div className=" cursor-pointer" onClick={()=>setEdit(null)}>cancel</div>}
          <div className="text-red-500 float-end w-fit cursor-pointer" onClick={()=>deleteData(data.id)}>Delete</div>
          <p className="">Model Name: {data.model}</p>
          <div className="flex flex-col gap-2 ">
          {data?.dataattributes.map((attribute) => (
            <div key={attribute.id} className="border border-gray-300 p-2">
              <p>Attribute Name: {attribute.attribute} {edit===data.id?<span className="text-sm">❌</span>:null}</p>
              {
                 !attribute?.options?
                 <p className="text-sm pl-2">{attribute.choosed}</p>
                 :
                 ""
              }
              <div className="flex text-sm flex-col gap-2">
                {attribute?.options?.split(",").map((option,index) => (
                  <label key={index}>
                     <input type="radio" className="" disabled checked={option === attribute.choosed}/>
                      {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          </div>
          
        </div>
      ))}
    </div>
  );
};
