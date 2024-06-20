import React from "react";
import Chat from "./Chat/Chat";
import List from "./List/List";
import Details from "./Details/Details";

function Home() {
  return (
    <div className="bg-[#081b29] h-screen ">
      <List />
      <Chat />
      <Details />
    </div>
  );
}

export default Home;
