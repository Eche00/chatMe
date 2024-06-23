import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useUserStore } from "../../../lib/userStore";
import { Logout } from "@mui/icons-material";
import { auth } from "../../../lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Userinfo() {
  const navigate = useNavigate();
  // getting current user info
  const { currentUser } = useUserStore();

  //signing out user
  const signOutUser = async (e) => {
    e.preventDefault();
    try {
      const res = await signOut(auth);

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className=" flex justify-between items-center p-[20px]">
      <section className=" flex gap-[20px] items-center">
        <img
          className=" w-[50px] h-[50px] object-cover rounded-[50%] border-2 border-gray-700"
          src={currentUser.avatar}
          alt=""
        />
        <h2 className=" text-2xl">{currentUser.username}</h2>
      </section>

      <div className=" flex gap-[20px]">
        {" "}
        <MoreHorizIcon fontSize="medium" />
        <VideocamIcon fontSize="medium" />
        <button
          className=" bg-[#5183fe] rounded-md px-1 group relative"
          onClick={signOutUser}>
          <Logout fontSize="small" />
          <p className=" opacity-0 group-hover:opacity-100 text-white  absolute left-[110%] bottom-0 top-0 text-sm bg-[rgba(55,65,81,0.60)] px-2 rounded-md">
            SignOut
          </p>
        </button>
      </div>
    </div>
  );
}

export default Userinfo;
