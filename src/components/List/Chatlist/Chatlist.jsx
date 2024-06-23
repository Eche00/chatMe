import { SearchRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Searchchat from "./Searchchat";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useUserStore } from "../../../lib/userStore";
import { db } from "../../../lib/firebase";
import { profile } from "../../../assets";
import { useChatStore } from "../../../lib/chatStore";

function Chatlist() {
  //handle add mode
  const [addMode, setAddMode] = useState(false);
  const [chats, setUserChats] = useState([]);
  const [input, setInput] = useState("");

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

        const items = res.data().chats;

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
    // for handling seen and unseen messages
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    //finding specific chat to check
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    // handling chat view
    userChats[chatIndex].isSeen = true;

    //updating userchat

    const userChatRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error);
    }
  };

  // filtering chat by search
  const filteredChats = chats.filter((e) =>
    e.user.username.toLowerCase().includes(input.toLowerCase())
  );
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
            onChange={(e) => setInput(e.target.value)}
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
          {filteredChats.map((chat) => (
            <div
              className=" flex items-center border-b-2 border-gray-700  gap-[20px] p-[20px] hover:bg-[rgba(92,92,94,0.1)] cursor-pointer"
              key={chat.chatId}
              onClick={() => handleSelect(chat)}>
              <img
                className=" w-[50px] h-[50px] object-cover rounded-[50%]"
                src={
                  chat.user.blocked.includes(currentUser.id)
                    ? profile
                    : chat.user.avatar || profile
                }
                alt=""
              />
              <div className=" flex justify-between flex-1 items-center">
                <div className=" flex flex-col gap-[5px]">
                  <span className=" font-bold">
                    {chat.user.blocked.includes(currentUser.id)
                      ? "User"
                      : chat.user.username}
                  </span>
                  <p
                    className=" text-[14px]  p-0"
                    style={{ color: chat?.isSeen ? "white" : "gray-300" }}>
                    {chat.lastMessage}
                  </p>
                </div>
                <div className=" text-gray-300 text-xs  font-bold">
                  {chat?.isSeen ? (
                    ""
                  ) : (
                    <div className=" w-[15px] h-[15px] bg-[#5183fe] rounded-full"></div>
                  )}
                </div>
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
