import { SearchRounded } from "@mui/icons-material";
import React, { useState } from "react";

function Chatlist() {
  //handle add mode
  const [addMode, setAddMode] = useState(false);
  return (
    <div>
      <div className=" flex items-center px-[20px] gap-[20px] ">
        <div className=" flex items-center  flex-1 bg-gray-700 rounded-md py-1 ">
          <span className=" px-2">
            <SearchRounded fontSize="medium" />
          </span>
          <input
            className=" flex-1 bg-transparent outline-none"
            type="text"
            placeholder="search..."
          />
        </div>
        <div
          className=" flex items-center text-2xl   bg-gray-700 px-[10px] rounded-md cursor-pointer"
          onClick={() => setAddMode((prev) => !prev)}>
          {addMode ? "-" : "+"}
        </div>
      </div>

      <div className=" flex flex-col">
        <div className=" flex items-center border-b-2 border-gray-700  gap-[20px] p-[20px]">
          <img
            className=" w-[50px] h-[50px] object-cover rounded-[50%]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
            alt=""
          />
          <div className=" flex flex-col gap-[5px]">
            <span className=" font-bold">Luke man</span>
            <p className=" text-[14px] text-gray-400 p-0">hello man</p>
          </div>
        </div>
        <div className=" flex items-center border-b-2 border-gray-700  gap-[20px] p-[20px]">
          <img
            className=" w-[50px] h-[50px] object-cover rounded-[50%]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
            alt=""
          />
          <div className=" flex flex-col gap-[5px]">
            <span className=" font-bold">Luke man</span>
            <p className=" text-[14px] text-gray-400 p-0">hello man</p>
          </div>
        </div>
        <div className=" flex items-center border-b-2 border-gray-700  gap-[20px] p-[20px]">
          <img
            className=" w-[50px] h-[50px] object-cover rounded-[50%]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
            alt=""
          />
          <div className=" flex flex-col gap-[5px]">
            <span className=" font-bold">Luke man</span>
            <p className=" text-[14px] text-gray-400 p-0">hello man</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatlist;
