import {
  ArrowCircleDownSharp,
  Download,
  FileCopy,
  PrivacyTip,
  Settings,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { profile } from "../../assets";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

function Details() {
  const [chat, setChat] = useState();
  // getting chat info from chat store and current user from userstore

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();

  // getting all images
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const { currentUser } = useUserStore();
  // handle block user
  const handleBlock = async (e) => {
    e.preventDefault;

    if (!user) return;
    // accessing docs in db
    const userDocRef = doc(db, "users", currentUser.id);

    //updating user
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex-1 overflow-scroll">
      <div className=" flex flex-col items-center py-[30px] px-[20px] gap-[20px] border-b-2 border-gray-700">
        <img
          className=" w-[100px] h-[100px] object-cover rounded-[50%]"
          src={user?.avatar || profile}
          alt=""
        />
        <h2>{user?.username}</h2>
        <p>{user?.email}</p>
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
              {chat?.messages?.map((m) => (
                <div className=" relative" key={m.createdAt}>
                  <img
                    className=" w-[80px] h-[80px] object-cover  rounded-md"
                    src={m.img}
                    alt=""
                  />
                  <Download className=" absolute cursor-pointer top-0 left-0 bg-gray-500 rounded-md" />
                  <span>photo name</span>
                </div>
              ))}
            </div>
          </div>

          <div className=" flex justify-between hover:bg-gray-700 rounded-md cursor-pointer p-2">
            <span>Shared files</span>
            <FileCopy />
          </div>
        </div>
        <div className=" flex items-center justify-center">
          <button
            className=" w-[90%] bg-red-600 hover:bg-red-500 p-[20px] rounded-[10px] capitalize my-20"
            onClick={handleBlock}>
            {isCurrentUserBlocked
              ? "You are blocked!"
              : isReceiverBlocked
              ? "Unblock user"
              : "Block user"}
          </button>
        </div>{" "}
      </div>
    </div>
  );
}

export default Details;
