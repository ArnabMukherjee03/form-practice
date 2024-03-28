import { useContext, useEffect, useState } from "react";
import axios_instance from "../config/axios_config";
import { dataContext } from "../context/DataContext";

export const UserData = () => {
  const [datas, setDatas] = useState([]);
  const [edit, setEdit] = useState(null);
  const [show, setShow] = useState(false);
  const [isDropdown, setIsDropdown] = useState(null);
  const [att,setatt] = useState(null);
  const [choosed, setChoosed] = useState("");
  const { data, fetchAttributes } = useContext(dataContext);

  const [arr, setArr] = useState([]);

  useEffect(() => {
    fetchAttributes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
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

  const handleChange = (e)=>{
    const index = arr.findIndex((data)=> data.id === att);
    const demo = [...arr];
    demo[index].choosed = e.target.value;
    setArr(demo)
  }

  const handleChoose = (e) => {
    setChoosed(e.target.value);
  };

  useEffect(() => {
    const find = datas.find((data) => data.id === edit);
    setArr(find?.dataattributes);
  }, [edit, datas]);

  console.log(arr);
  console.log("drop", isDropdown);

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

  const handleDelete = (id) => {
    const filter = arr.filter((data) => data.id !== id);
    setArr(filter);
  };

  const handleAdd = () => {
    const len = arr.length;
    const option = isDropdown?.options ? isDropdown?.options : null;
    const new_data = [
      ...arr,
      {
        id: len,
        attribute: isDropdown?.attribute,
        options: option,
        choosed: choosed,
      },
    ];

    setArr(new_data);
    setShow(false);
    setChoosed(null);
    setIsDropdown(null);
  };

  const update = async()=>{
    try {
       const response = await axios_instance.put("/data/update",{id:edit,data:arr})
       if(response.status === 200){
         window.location.reload();
       }
    } catch (error) {
      console.log(error);
    }
  }

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
          ) : (
            ""
          )}
          {edit === datas.id ? (
            <div className="flex gap-2">
            
            <div onClick={update} className=" cursor-pointer">
            update
          </div>
          <div className=" cursor-pointer" onClick={() => setEdit(null)}>
              cancel
            </div>
            </div>
          ) : (
            ""
          )}
          <div
            className="text-red-500 float-end w-fit cursor-pointer"
            onClick={() => deleteData(datas.id)}
          >
            Delete
          </div>
          <p className="">Model Name: {datas.model}</p>
          <div className="flex flex-col gap-2 ">
            {edit !== datas.id ? (
              datas?.dataattributes.map((attribute) => (
                <div key={attribute.id} className="border border-gray-300 p-2">
                  <p>Attribute Name: {attribute.attribute} </p>
                  {!attribute?.options ? (
                    <p className="text-sm pl-2">{attribute.choosed}</p>
                  ) : (
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
                          disabled
                          checked={option === attribute.choosed}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <>
                {arr?.map((attribute) => (
                  <div
                    key={attribute.id}
                    className="border border-gray-300 p-2"
                  >
                    <span
                      className="text-red-500 float-right text-xs "
                      onClick={() => handleDelete(attribute.id)}
                    >
                      Delete
                    </span>
                    <p>Attribute Name: {attribute.attribute}</p>
                    {!attribute?.options ? (
                      <p className="text-sm pl-2">{attribute.choosed}</p>
                    ) : (
                      ""
                    )}
                    <div className="flex text-sm flex-col gap-2">
                      <span onClick={()=>setatt(attribute.id)} className="text-right cursor-pointer">edit</span>
                      {attribute?.options?.split(",").map((option, index) => (
                        <label key={index}>
                          <input
                            type="radio"
                            className=""
                            value={option}
                            onChange={handleChange}
                            disabled={att!==attribute.id}
                            checked={option === attribute.choosed}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => {
                    setShow(!show);
                  }}
                  className="w-5 h-5 border flex items-center justify-center cursor-pointer"
                >
                  +
                </div>
              </>
            )}

            {show && edit === datas.id ? (
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
                  onClick={handleAdd}
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
