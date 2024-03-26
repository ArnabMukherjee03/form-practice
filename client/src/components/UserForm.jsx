import { useContext, useEffect, useState } from "react";

import axios_instance from "../config/axios_config";

import { dataContext } from "../context/DataContext";
import { UserData } from "./UserData";

export const UserForm = () => {
  const [modelName, setModelName] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [isDropdown, setIsDropdown] = useState([]);
  const [choosed, setChoosed] = useState([]);
  const [text,setText] = useState([]);
  const [attNo, setAttNo] = useState([1]);
  const { data, fetchAttributes } = useContext(dataContext);

  useEffect(() => {
    fetchAttributes();
  }, []);


  const addData = async () => {
    const keys = Object.keys(attributes);
    const data = keys.map((key) => ({
      ...attributes[key],
      ...(choosed[key]?{choosed:choosed[key]}:null)
    }));

    try {
      const response = await axios_instance.post("/data/add", {
        model: modelName,
        attributes: data,
      });

      console.log(response);

      if (response.status === 201) {
        alert("Succesfull");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleSelect = (e) => {
    const filterData = data?.find((data) => data.attribute === e.target.value);
    const dropdown = [...isDropdown]
    const new_attributes = [...attributes]
    if (filterData.type === "dropdown") {
      dropdown[parseInt(e.target.name) - 1] = filterData.options;
      setIsDropdown(dropdown);
      new_attributes[parseInt(e.target.name) - 1] = {attribute:filterData.attribute,options:filterData.options}
      setAttributes(new_attributes)
      setText([...text,0])
    }else if(dropdown[parseInt(e.target.name) - 1] && filterData.type === "text"){
      dropdown[parseInt(e.target.name) - 1] = undefined;
      setIsDropdown(dropdown);
      new_attributes[parseInt(e.target.name) - 1] = {attribute:filterData.attribute}
      setAttributes(new_attributes)
      const data = [...choosed];
      data[parseInt(e.target.name) - 1] = undefined;
      setChoosed(data);
      setText([...text,1])
    }else{
      new_attributes[parseInt(e.target.name) - 1] = {attribute:filterData.attribute}
      setAttributes(new_attributes)
      setText([...text,1])
    }
  };

  const handleChoose = (e)=>{
      const data = [...choosed];
      data[parseInt(e.target.name) - 1] = e.target.value;
      setChoosed(data)
  }



  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Enter Model Name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => {
            setModelName(e.target.value);
          }}
          className="w-60 border border-black outline-none px-1"
          placeholder="Enter Model Name"
        />

        {attNo?.map((att) => (
          <>
          <select
            name={att}
            onChange={handleSelect}
            className="w-60 border border-black outline-none px-1"
          >
            <option value="none" selected disabled hidden>
              Choose Attribute
            </option>
            {data?.map((value) => (
              <option key={value.id} value={value.attribute}>
                {value.attribute}
              </option>
            ))}
          </select>
          {
            isDropdown.length !== 0
              ? isDropdown[att-1]?.split(",").map((option, index) => (
                  <label key={index} className="">
                    <input
                      name={att}
                      type="radio"
                      value={option}
                      checked={choosed[att-1] === option}
                      onChange={handleChoose}
                    />{" "}
                    {option}
                  </label>
                ))
              : ""
          }

          {
            text.length !== 0 && text[att-1]===1?
            <input name={att} onChange={handleChoose} type="text" className="w-60 border border-black outline-none px-1"/>
            : ""
          }
          </>
        )
        )}
        <div
          className="w-8 h-8 border border-black flex items-center justify-center text-xl cursor-pointer"
          onClick={() =>
            setAttNo([...attNo, attNo.length + 1])
          }
        >
          +
        </div>

        <button className="bg-black text-white" onClick={addData}>
          Add
        </button>
      </div>
      <UserData/>
    </div>
  );
};
