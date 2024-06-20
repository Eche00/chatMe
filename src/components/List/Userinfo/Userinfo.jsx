import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VideocamIcon from "@mui/icons-material/Videocam";
import EditNoteIcon from "@mui/icons-material/EditNote";

function Userinfo() {
  return (
    <div className=" flex justify-between items-center p-[20px]">
      <section className=" flex gap-[20px] items-center">
        <img
          className=" w-[50px] h-[50px] object-cover rounded-[50%]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
          alt=""
        />
        <h2 className=" text-2xl">Eche dior</h2>
      </section>
      <div className=" flex gap-[20px]">
        {" "}
        <MoreHorizIcon fontSize="medium" />
        <VideocamIcon fontSize="medium" />
        <EditNoteIcon fontSize="medium" />
      </div>
    </div>
  );
}

export default Userinfo;
