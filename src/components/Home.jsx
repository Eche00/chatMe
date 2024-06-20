import React from "react";
import Chat from "./Chat/Chat";
import List from "./List/List";
import Details from "./Details/Details";

function Home() {
  return (
    <div className=" w-[100%] h-screen flex items-center justify-center bg-black  ">
      <div className="bg-[#081b29] h-[90%] w-[90%] rounded-md flex text-white ">
        <List />
        <Chat />
        <Details />
      </div>
    </div>
  );
}

export default Home;
