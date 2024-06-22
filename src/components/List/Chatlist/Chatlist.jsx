import { SearchRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Searchchat from "./Searchchat";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useUserStore } from "../../../lib/userStore";
import { db } from "../../../lib/firebase";
import { profile } from "../../../assets";
import { useChatStore } from "../../../lib/chatStore";

function Chatlist() {
  //handle add mode
  const [addMode, setAddMode] = useState(false);
  const [chats, setUserChats] = useState([]);

  //getting current user info(id)
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  // use effect to handle user chats to show on page load
  useEffect(() => {
    // using onsnapshot to get chats on page
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        // Getting user chats data
        console.log(res.data());
        const items = res.data().chats;
        console.log(items);

        // Fetching user data for each chat item
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        });

        // Resolving all promises to get complete chat data
        const chatData = await Promise.all(promises);

        // Sorting chat data by updatedAt field in descending order
        const sortedChatData = chatData.sort((a, b) => {
          return b.updatedAt - a.updatedAt;
        });

        // Updating the state with sorted chat data
        setUserChats(sortedChatData);
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  // handling chat selection
  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user);
  };
  return (
    <div>
      {/*search user */}
      <div className=" flex items-center px-[20px] gap-[20px]  ">
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

      {/*Chat lists, which displays on !addMode*/}

      {!addMode && (
        <div className=" flex flex-col">
          {chats.map((chat) => (
            <div
              className=" flex items-center border-b-2 border-gray-700  gap-[20px] p-[20px]"
              key={chat.chatId}
              onClick={() => handleSelect(chat)}>
              <img
                className=" w-[50px] h-[50px] object-cover rounded-[50%]"
                src={chat.user.avatar || profile}
                alt=""
              />
              <div className=" flex flex-col gap-[5px]">
                <span className=" font-bold">{chat.user.username}</span>
                <p className=" text-[14px] text-gray-400 p-0">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* search user, which displays on addMode*/}
      {addMode && <Searchchat />}
    </div>
  );
}

export default Chatlist;
