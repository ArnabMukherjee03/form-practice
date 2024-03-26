import { useContext, useEffect, useState } from "react";
import axios_instance from "../config/axios_config";
import { dataContext } from "../context/DataContext";

export const Attributes = () => {
  const [newData, setNewData] = useState("");
  const [type, setType] = useState("text");
  const [options, setOptions] = useState([]);
  const [optionCount, setOptionCount] = useState([1]);

  const { data, fetchAttributes } = useContext(dataContext);

  useEffect(() => {
    fetchAttributes();
  }, []);

  const handleOptions = (event) => {
    const { name, value } = event.target;

    console.log(value.length);
    const updatedOptions = [...options];
    updatedOptions[parseInt(name) - 1] = value;

    setOptions(updatedOptions);
  };

  // console.log(options);

  const addAttributes = async () => {
    try {
      const response = await axios_instance.post("/attrubutes/add", {
        attribute: newData,
        options: options,
        type: type,
      });

      if (response.status === 201) {
        alert("New Attribute Added");
        fetchAttributes();
      }
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
    }
  };

  return (
    <div className="w-full flex  gap-8 items-center justify-center">
      <div className="">
        <h1 className="text-xl">Attributes List</h1>
        {data?.map((value) => {
          return value?.type === "text" ? (
            <div key={value.id}>{value.attribute}</div>
          ) : (
            <select >
              <option value="none" selected disabled hidden>{value.attribute}</option> 
              {
                value?.options.split(",").map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-xl">Add new Attributes</h1>
        <input
          type="text"
          className="w-60 border border-black outline-none px-1"
          placeholder="Enter Attributes Name"
          onChange={(e) => setNewData(e.target.value)}
        />

        {type === "dropdown"
          ? optionCount?.map((option) => {
              return (
                <input
                  key={option}
                  className="w-60 border border-black outline-none px-1"
                  placeholder={`option ${option}`}
                  name={option}
                  onChange={handleOptions}
                />
              );
            })
          : ""}
        <div
          className={`w-8 h-8 border border-black flex items-center justify-center text-xl cursor-pointer ${
            type !== "dropdown" ? "hidden" : ""
          }`}
          onClick={() =>
            setOptionCount([...optionCount, optionCount.length + 1])
          }
        >
          +
        </div>

        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              value="text"
              checked={type === `text`}
              onChange={() => {
                setType("text");
              }}
            />
            Text
          </label>
          <label>
            <input
              type="radio"
              value="dropdown"
              checked={type === `dropdown`}
              onChange={() => {
                setType("dropdown");
              }}
            />
            Dropdown
          </label>
        </div>
        <button onClick={addAttributes} className="bg-black text-white">
          Add
        </button>
      </div>
    </div>
  );
};
