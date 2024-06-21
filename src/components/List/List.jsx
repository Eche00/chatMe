import React from "react";
import Userinfo from "./Userinfo/Userinfo";
import Chatlist from "./Chatlist/Chatlist";

function List() {
  return (
    <div className=" flex flex-col flex-1 border-r-2 border-gray-700 ">
      <Userinfo />
      <div className="overflow-scroll ">
        {" "}
        <Chatlist />
      </div>
    </div>
  );
}

export default List;
