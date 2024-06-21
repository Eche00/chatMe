import React from "react";

function Searchchat() {
  return (
    <div className=" w-full h-fit mx-auto   p-[20px]">
      <div className=" flex   gap-[20px] flex-col">
        <form className=" flex items-center  flex-1 rounded-md  gap-[30px]">
          <input
            className=" flex-1 bg-gray-700 p-2 rounded-md outline-none "
            type="text"
            placeholder="search..."
          />
          <button className=" bg-blue-500 rounded-md px-3 py-2">Search</button>
        </form>

        <div className=" flex items-center border-b-2 border-gray-700  gap-[20px] py-[10px]">
          <img
            className=" w-[50px] h-[50px] object-cover rounded-[50%]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
            alt=""
          />
          <div className=" flex items-center justify-between gap-[5px] flex-1">
            <span className=" font-bold">Luke man</span>
            <button className=" bg-blue-500 rounded-md px-3 py-2">
              Add user
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchchat;
