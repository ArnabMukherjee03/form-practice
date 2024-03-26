import { useContext, useEffect, useState } from "react";

import axios_instance from "../config/axios_config";

import { dataContext } from "../context/DataContext";

export const UserForm = () => {
  const [name, setName] = useState("");
  const [isDropdown, setIsDropdown] = useState(null);
  const [choosed, setChoosed] = useState(null);
  const { data, fetchAttributes } = useContext(dataContext);

  useEffect(() => {
    fetchAttributes();
  }, []);

  console.log(data);
  const addData = async () => {
    const keys = Object.keys(attributename);
    const mergedArray = keys.map((key) => ({
      name: attributename[key],
      value: data[key],
    }));
    try {
      const response = await axios_instance.post("/random/post", {
        name: name,
        attributes: mergedArray,
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
    if (filterData.type === "dropdown") {
      setIsDropdown(filterData.options);
    } else {
      setIsDropdown(null);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Enter Model Name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-60 border border-black outline-none px-1"
          placeholder="Enter Model Name"
        />

        <select
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

        {isDropdown
          ? isDropdown?.split(",").map((option, index) => (
              <label key={index} className="">
                <input
                  type="radio"
                  value={option}
                  checked={choosed === option}
                  onChange={(e) => {
                    setChoosed(e.target.value);
                  }}
                />{" "}
                {option}
              </label>
            ))
          : ""}

        <button className="bg-black text-white" onClick={addData}>
          Add
        </button>
      </div>
    </div>
  );
};
