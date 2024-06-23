import React, { useEffect, useRef, useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import {
  Call,
  CameraAlt,
  EmojiEmotions,
  Image,
  Info,
  MicRounded,
  SendOutlined,
} from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/uploads";
import { profile } from "../../assets";

function Chat() {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  console.log(chat);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  // end of chat reference to always move the chat to the current messages
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, []);

  //
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  // handling emoji picker
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };

  // handling  sending message
  const handleSend = async (e) => {
    e.preventDefault;

    // handling empty text
    if (text === "") return;

    // handling img upload
    let imgUrl = null;

    // adding msg to db/ img
    try {
      // img
      if (img.file) {
        imgUrl: await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });
      //creating a loop to keep users updated by last messages
      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatSnapshot = await getDoc(userChatsRef);

        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data();

          // getting specific chat being updated
          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          //updating recent chat to top of page
          await updateDoc(userChatsRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };

  // handling image upload
  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  return (
    <div className=" flex flex-col flex-[100px] border-r-2 border-gray-700">
      <div className=" flex justify-between items-center p-[20px] border-b-2 border-gray-700">
        <section className=" flex gap-[20px] items-center">
          <img
            className=" w-[50px] h-[50px] object-cover rounded-[50%]"
            src={user?.avatar || profile}
            alt=""
          />
          <div className=" flex flex-col gap-[5px]">
            <span className=" font-bold">{user?.username}</span>
            <p className=" text-[14px] text-gray-400 p-0">
              Lorem ipsum dolor adipisicing elit.
            </p>
          </div>
        </section>
        <div className=" flex gap-[20px]">
          {" "}
          <Call fontSize="medium" />
          <VideocamIcon fontSize="medium" />
          <Info fontSize="medium" />
        </div>
      </div>
      <div className="center overflow-scroll flex-1 p-[20px] flex flex-col gap-[20px]">
        <div className=" flex items-center justify-center">
          <span className=" w-full text-center text-xs font-semibold p-2 text-gray-300">
            Say hi to {user?.username}{" "}
          </span>
        </div>

        {chat?.messages?.map((message) =>
          message.senderId === currentUser?.id ? (
            <div
              className=" flex flex-col self-end  max-w-[70%] "
              key={message?.createdAt}>
              {message.img && (
                <img
                  className=" w-[100%] h-[300px] object-cover rounded-md"
                  src={message.img}
                  alt=""
                />
              )}
              <p className="bg-blue-500 p-[10px] rounded-[10px]">
                {message.text}
              </p>
              <span className=" text-xs">1 min ago</span>
            </div>
          ) : (
            <div className=" flex gap-[20px]" key={message?.createdAt}>
              <img
                className=" w-[30px] h-[30px] object-cover rounded-[50%]"
                src={user?.avatar || profile}
                alt=""
              />
              <div className=" max-w-[70%] flex-1 flex flex-col gap-[5px]">
                {message.img && (
                  <img
                    className=" w-[100%] h-[300px] object-cover rounded-md"
                    src={message.img}
                    alt=""
                  />
                )}
                <p className=" p-[10px] bg-[#8f8faa41] rounded-[10px]">
                  {message.text}
                </p>
                <span className=" text-xs">1 min ago</span>
              </div>
            </div>
          )
        )}
        {/* image */}
        {img.url && <img src={img.url} alt="" />}

        <div ref={endRef}></div>
      </div>
      <div className="bottom flex items-center py-3 border-t-2 border-gray-700 relative">
        <div className=" flex gap-[10px] p-5 mt-auto">
          <span className=" flex items-center">
            <label htmlFor="file">
              <Image className=" cursor-pointer" />
            </label>
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={handleImageUpload}
            />
          </span>
          <CameraAlt className=" cursor-pointer" />
          <MicRounded className=" cursor-pointer" />
        </div>
        <div className=" bg-gray-700 flex flex-1 items-center px-2 rounded-md ">
          <input
            type="text"
            placeholder={
              isCurrentUserBlocked || isReceiverBlocked
                ? "You cannot send a message"
                : "Type a message..."
            }
            className=" bg-transparent outline-none flex-1 py-1 disabled:cursor-not-allowed"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
          />
          <span onClick={() => setOpenEmoji((prev) => !prev)}>
            {" "}
            <EmojiEmotions className=" cursor-pointer" />
          </span>
        </div>
        <div className=" absolute bottom-[60px] right-0 ">
          <EmojiPicker onEmojiClick={handleEmoji} open={openEmoji} />
        </div>
        <button
          className=" mx-5 bg-gray-700 p-1 rounded-md cursor-pointer disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}>
          <SendOutlined />
        </button>
      </div>
    </div>
  );
}

export default Chat;
