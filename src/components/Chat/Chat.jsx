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

  // end of chat reference to always move the chat to the current messages
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviour: "smooth" });
    setAcess(false);
  }, [chatId]);

  //
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  // handling camera access
  const accessCamera = () => {
    setAcess(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        const video = document.getElementById("video");
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  // handling image snap
  const handleTakePhoto = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    console.log(imageData[0]);
    setImg({
      file: imageData[0],
      url: imageData,
    });
    setAcess(false);
  };

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

    // handling empty text
    if (text === "") return;

    // handling img upload
    let imgUrl = null;

    // adding msg to db/ img

    try {
      // img
      if (img.file) {
        imgUrl = await upload(img.file);
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
                {/* <span>{message.createdAt.toDateString()}</span> */}
              </div>
            </div>
          ))}
          {access === true && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex  bg-[rgba(0,0,0,0.60)]  items-center justify-center z-10 ">
              <div className=" flex flex-col w-fit border-2 border-dashed  p-5 gap-5">
                <video
                  className="w-[300px] rounded-md"
                  id="video"
                  width="300"
                  height="300"></video>
                <canvas id="canvas" width="300" height="300"></canvas>

                {image && (
                  <img className=" w-[300px]" src={image} alt="Snapped image" />
                )}
                <button onClick={handleTakePhoto} className=" bg-blue-500 p-2 ">
                  <CameraAlt />
                </button>
              </div>
            </div>
          )}
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

          <div ref={endRef}></div>
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
            <button onClick={accessCamera}>
              {" "}
              <CameraAlt className=" cursor-pointer" />
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
          disabled={
            isCurrentUserBlocked || isReceiverBlocked || text.length <= 0
          }>
          <SendOutlined />
        </button>
      </div>
    </div>
  );
}

export default Chat;
