import React, { useEffect, useRef, useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import {
  Call,
  CameraAlt,
  CameraRoll,
  EmojiEmotions,
  Image,
  Info,
  MicRounded,
  SendOutlined,
  Stop,
} from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/uploads";
import { profile } from "../../assets";
import "./chat.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Chat() {
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const [access, setAcess] = useState(false);

  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  console.log(chat);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

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

  // handling image upload
  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // handling  sending message
  const handleSend = async (e) => {
    e.preventDefault;
    setLoading(true);
    // handling img upload
    let imgUrl = null;

    // adding msg to db/ img

    try {
      // img
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      // handling empty text or empty img text

      if (text === "" && !imgUrl) {
        setLoading(false);
        return;
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };

  // handling Sending message on keydown
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSend(e);
    }
  };

  // end of chat reference to always move the chat to the current messages
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatId]);

  // handling autofocus on each chat change
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [chatId]);

  const date = new Date();
  return (
    <div className=" flex flex-col flex-[100px] border-r-2 border-gray-700 relative">
      <div className=" flex justify-between items-center p-[20px] border-b-2 border-gray-700">
        <section className=" flex gap-[20px] items-center">
          <img
            className=" w-[50px] h-[50px] object-cover rounded-[50%]"
            src={user?.avatar || profile}
            alt=""
          />
          <div className=" flex flex-col gap-[5px]">
            <span className=" font-bold">{user?.username}</span>
          </div>
        </section>
        <div className=" flex gap-[20px]">
          {" "}
          <Call fontSize="medium" className="cursor-not-allowed" />
          <VideocamIcon fontSize="medium" className="cursor-not-allowed" />
          <Info fontSize="medium" className="cursor-not-allowed" />
        </div>
      </div>
      <div className="center overflow-scroll flex-1 p-[20px] flex flex-col gap-[20px]">
        <div className="center">
          {chat?.messages?.map((message) => (
            <div
              className={
                message.senderId === currentUser?.id ? "message own" : "message"
              }
              key={message?.createdAt}>
              {message.senderId != currentUser?.id && (
                <img src={user?.avatar || profile} />
              )}
              <div className="texts">
                {message.img && <img src={message.img} alt="" />}
                <p>{message.text}</p>
                <span>
                  {message.createdAt.toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {img.url && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex  bg-[rgba(0,0,0,0.60)]  items-center justify-center">
              <div className=" flex flex-col w-fit border-2 border-dashed  p-5">
                <div>
                  <div className=" w-fit">
                    <img
                      className="w-[300px] rounded-md"
                      src={img.url}
                      alt=""
                    />
                  </div>
                </div>
                <span className=" flex-1 p-2">
                  <input
                    className=" flex-1 bg-transparent text-white placeholder:text-gray-300 outline-none placeholder:text-center"
                    type="text"
                    placeholder="Add text to send image.."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                  />
                </span>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>
      </div>

      <div className="bottom flex items-center py-3 border-t-2 border-gray-700 relative">
        <div className=" flex gap-[10px] p-5 mt-auto">
          <span className=" flex items-center bg-blue-500 rounded-md p-[2px]">
            <label htmlFor="file">
              <Image className=" cursor-pointer" />
            </label>
            <input
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={handleImageUpload}
            />
          </span>
          <span className=" flex items-center bg-blue-500 rounded-md p-[2px]">
            <button>
              {" "}
              <CameraAlt className="  cursor-not-allowed" />
            </button>
          </span>
        </div>
        <div className=" bg-gray-700 flex flex-1 items-center px-2 rounded-md ">
          <input
            type="text"
            placeholder={
              isCurrentUserBlocked || isReceiverBlocked
                ? "You cannot send a message"
                : "Type a message..." && img.url
                ? "Add text to send image.."
                : "Type a message..."
            }
            ref={inputRef}
            onKeyDown={handleKeyDown}
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
          className={
            text.length <= 0
              ? ` mx-5 bg-gray-700 p-1 rounded-md cursor-pointer disabled:cursor-not-allowed`
              : ` mx-5 bg-blue-500 p-1 rounded-md cursor-pointer disabled:cursor-not-allowed`
          }
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked || loading}>
          <SendOutlined />
        </button>
      </div>
    </div>
  );
}

export default Chat;
