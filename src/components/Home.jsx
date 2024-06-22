import React, { useEffect } from "react";
import Chat from "./Chat/Chat";
import List from "./List/List";
import Details from "./Details/Details";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

function Home() {
  const navigate = useNavigate();
  // getting and  accessing current user info
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  // Handling display on page when there is nothing to show
  if (isLoading)
    return (
      <div className=" font-[36px]  bg-[#081b29] w-full h-screen flex flex-col items-center justify-center">
        <div className=" w-[200px] h-[200px] text-white">
          <Spinner size="medium" />
          <p className=" text-5xl text-white p-10">Loading</p>
        </div>
      </div>
    );
  return (
    <div className=" w-[100%] h-screen flex items-center justify-center bg-black  ">
      {currentUser ? (
        <div className="bg-[#081b29] h-[90%] w-[90%] rounded-md flex text-white ">
          <List />
          <Chat />
          <Details />
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
}

export default Home;
