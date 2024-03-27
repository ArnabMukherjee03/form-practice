import { useContext, useEffect, useState } from "react";
import axios_instance from "../config/axios_config";
import { dataContext } from "../context/DataContext";

export const UserData = () => {
  const [datas, setDatas] = useState([]);
  const [edit, setEdit] = useState(null);
  const [attedit, setAttedit] = useState(null);
  const [show, setShow] = useState(false);
  const [isDropdown, setIsDropdown] = useState(null);
  const [choosed, setChoosed] = useState("");
  const { data, fetchAttributes } = useContext(dataContext);

  useEffect(() => {
    fetchAttributes();
  }, []);

 console.log(isDropdown);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios_instance.get("/data/get");
        setDatas(response.data);
      } catch (error) {
        alert("Something Went Wrong");
      }
    };

    fetchData();
  }, []);

  const handleSelect = (e) => {
    const filterData = data?.find((data) => data.attribute === e.target.value);
    setIsDropdown(filterData);
  };

  console.log(choosed);
  const handleChoose = (e) => {
    setChoosed(e.target.value);
  };

  

  const deleteData = async (id) => {
    try {
      const response = await axios_instance.delete(`/data/delete/${id}`);
      if (response.status === 200) {
        window.location.reload();
        console.log(response.data);
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const deleteAttribute = async (id) => {
    try {
      const response = await axios_instance.put("/dataattribute/delete", {
        id: id,
      });
      if (response.status === 200) {
        setEdit(null);
        window.location.reload();
        console.log(response.data);
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const update = async(id)=>{
    try {
      const response = await axios_instance.put("/dataattribute/update",{id,choosed});
       if(response.status === 200){
          window.location.reload();
       }
    } catch (error) {
      console.log(error);
    }
  }

  const addDataAttribute = async (id) => {
    const option = isDropdown?.options?isDropdown?.options:null;
    const data = {
      attribute: isDropdown?.attribute,
      options: option,
      choosed: choosed,
      data_id: id,
    };


    try {
      const response = await axios_instance.post("/dataattribute/add", data);
      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-4 h-80 w-[400px] items-center overflow-y-auto ">
      {datas.map((datas) => (
        <div
          key={datas.id}
          className="w-60 border border-gray-400 py-4 px-2 h-auto relative"
        >
          {!edit ? (
            <div className=" cursor-pointer" onClick={() => setEdit(datas.id)}>
              Edit{" "}
            </div>
          ) : ""}
          {
            edit === datas.id?
            (
              <div className=" cursor-pointer" onClick={() => setEdit(null)}>
                cancel
              </div>
            ):
            ""
          }
          <div
            className="text-red-500 float-end w-fit cursor-pointer"
            onClick={() => deleteData(datas.id)}
          >
            Delete
          </div>
          <p className="">Model Name: {datas.model}</p>
          <div className="flex flex-col gap-2 ">
            {datas?.dataattributes.map((attribute) => (
              <div key={attribute.id} className="border border-gray-300 p-2">
                <p>
                  Attribute Name: {attribute.attribute}{" "}
                  {edit === datas.id ? (
                    <>
                    {
                      attedit?
                      <span
                      onClick={()=>update(attribute.id)}
                      className="cursor-pointer text-xs"
                      >💾</span>
                      :
                    (<span 
                    onClick={()=>{setAttedit(attribute.id)}}
                    className="cursor-pointer text-xs">✏️</span>)
                  }
                  <span
                      onClick={() => {
                        deleteAttribute(attribute.id);
                      }}
                      className="text-xs cursor-pointer"
                    >
                      ❌
                    </span>
                    </>
                  ) : null}
                </p>
                {!attribute?.options ? (
                  
                    attedit === attribute.id && edit === datas.id?
                    (<input
                    onChange={handleChoose}
                    type="text"
                    placeholder="enter value"
                    className="w-full border border-black outline-none px-1"
                  />)
                    :
                    <p className="text-sm pl-2">{attribute.choosed}</p>
                  
                )
                 : (
                  ""
                )}
                <div className="flex text-sm flex-col gap-2">
               
                  {attribute?.options?.split(",").map((option, index) => (
                    <label key={index}>
                      
                      <input
                        type="radio"
                        className=""
                        value={option}
                        onChange={handleChoose}
                        disabled={attedit!==attribute.id}
                        checked={attedit==attribute.id?option === choosed:option === attribute.choosed}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {edit === datas.id ? (
              <div
                onClick={() => {
                  setShow(!show);
                }}
                className="w-5 h-5 border flex items-center justify-center cursor-pointer"
              >
                +
              </div>
            ) : (
              ""
            )}
            {show && edit === datas.id? (
              <>
                <select
                  onChange={handleSelect}
                  className="w-full border border-black outline-none px-1"
                >
                  <option value="none" selected disabled hidden>
                    Choose Attribute
                  </option>
                  {data?.map((value) => (
                    <option key={value.id} value={value.attribute}>
                      {value.attribute}
                    </option>
                  ))}{" "}
                </select>

                {isDropdown?.type === "dropdown" ? (
                  <>
                    {isDropdown?.options.split(",").map((option, index) => (
                      <label key={index} className="">
                        <input
                          type="radio"
                          value={option}
                          checked={choosed === option}
                          onChange={handleChoose}
                        />{" "}
                        {option}
                      </label>
                    ))}
                  </>
                ) : isDropdown?.type === "text" ? (
                  <input
                    onChange={handleChoose}
                    type="text"
                    className="w-full border border-black outline-none px-1"
                  />
                ) : (
                  ""
                )}
                <div
                  onClick={() => {
                    addDataAttribute(datas.id);
                  }}
                  className="bg-black text-white text-center w-fit px-2 text-sm cursor-pointer"
                >
                  ADD
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
