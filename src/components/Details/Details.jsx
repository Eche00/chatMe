import {
  ArrowCircleDownSharp,
  Download,
  FileCopy,
  PrivacyTip,
  Settings,
} from "@mui/icons-material";
import React from "react";

function Details() {
  return (
    <div className=" flex-1">
      <div className=" flex flex-col items-center py-[30px] px-[20px] gap-[20px] border-b-2 border-gray-700">
        <img
          className=" w-[100px] h-[100px] object-cover rounded-[50%]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
          alt=""
        />
        <h2>Luke man</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>

      <div>
        <div className=" flex flex-col gap-[20px]  p-[20px]">
          <div className=" flex justify-between hover:bg-gray-700 rounded-md cursor-pointer p-2">
            <span>Chat setting</span>
            <Settings />
          </div>
          <div className=" flex justify-between hover:bg-gray-700 rounded-md cursor-pointer p-2">
            <span>Privacy & Help</span>
            <PrivacyTip />
          </div>
          <div className=" flex flex-col p-2 bg-gray-700 rounded-md">
            <div className=" flex justify-between  cursor-pointer py-2">
              <span>Shared images</span>
              <ArrowCircleDownSharp />
            </div>
            <div className=" flex gap-[20px] flex-wrap">
              <div className=" relative">
                <img
                  className=" w-[80px] h-[80px] object-cover  rounded-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
                  alt=""
                />
                <Download className=" absolute cursor-pointer top-0 left-0 bg-gray-500 rounded-md" />
                <span>photo name</span>
              </div>
              <div className=" relative">
                <img
                  className=" w-[80px] h-[80px] object-cover  rounded-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
                  alt=""
                />
                <Download className=" absolute cursor-pointer top-0 left-0 bg-gray-500 rounded-md" />
                <span>photo name</span>
              </div>
            </div>
          </div>

          <div className=" flex justify-between hover:bg-gray-700 rounded-md cursor-pointer p-2">
            <span>Shared files</span>
            <FileCopy />
          </div>
        </div>
        <div className=" flex items-center justify-center">
          <button className=" w-[90%] bg-red-600 hover:bg-red-500 p-[20px] rounded-[10px]">
            Block user
          </button>
        </div>{" "}
      </div>
    </div>
  );
}

export default Details;
