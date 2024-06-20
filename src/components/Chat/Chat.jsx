import React, { useState } from "react";
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

function Chat() {
  // opening emoji picker
  const [openEmoji, setOpenEmoji] = useState(false);
  return (
    <div className=" flex flex-col flex-[100px] border-r-2 border-gray-700">
      <div className=" flex justify-between items-center p-[20px] border-b-2 border-gray-700">
        <section className=" flex gap-[20px] items-center">
          <img
            className=" w-[50px] h-[50px] object-cover rounded-[50%]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
            alt=""
          />
          <div className=" flex flex-col gap-[5px]">
            <span className=" font-bold">Luke man</span>
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
            Say hi to luke{" "}
          </span>
        </div>

        <div className=" flex gap-[20px]">
          <img
            className=" w-[30px] h-[30px] object-cover rounded-[50%]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
            alt=""
          />
          <div className=" max-w-[70%] flex-1 flex flex-col gap-[5px]">
            <p className=" p-[10px] bg-[#8f8faa41] rounded-[10px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores qui porro a numquam necessitatibus minima beatae
              perferendis quos hic sit debitis nulla nemo quaerat incidunt
              corporis laboriosam autem, nobis assumenda.
            </p>
            <span className=" text-xs">1 min ago</span>
          </div>
        </div>

        <div className=" flex flex-col self-end  max-w-[70%] ">
          <img
            className=" w-[100%] h-[300px] object-cover rounded-md"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
            alt=""
          />
          <p className="bg-blue-500 p-[10px] rounded-[10px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            qui porro a numquam necessitatibus minima beatae perferendis quos
            hic sit debitis nulla nemo quaerat incidunt corporis laboriosam
            autem, nobis assumenda.
          </p>
          <span className=" text-xs">1 min ago</span>
        </div>
        <div className=" flex gap-[20px]">
          <img
            className=" w-[30px] h-[30px] object-cover rounded-[50%]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s"
            alt=""
          />
          <div className=" max-w-[70%] flex-1 flex flex-col gap-[5px]">
            <p className=" p-[10px] bg-[#8f8faa41] rounded-[10px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores qui porro a numquam necessitatibus minima beatae
              perferendis quos hic sit debitis nulla nemo quaerat incidunt
              corporis laboriosam autem, nobis assumenda.
            </p>
            <span className=" text-xs">1 min ago</span>
          </div>
        </div>

        <div className=" flex flex-col self-end  max-w-[70%] ">
          <p className="bg-blue-500 p-[10px] rounded-[10px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            qui porro a numquam necessitatibus minima beatae perferendis quos
            hic sit debitis nulla nemo quaerat incidunt corporis laboriosam
            autem, nobis assumenda.
          </p>
          <span className=" text-xs">1 min ago</span>
        </div>
      </div>
      <div className="bottom flex items-center py-3 border-t-2 border-gray-700 relative">
        <div className=" flex gap-[10px] p-5 mt-auto">
          <Image className=" cursor-pointer" />
          <CameraAlt className=" cursor-pointer" />
          <MicRounded className=" cursor-pointer" />
        </div>
        <div className=" bg-gray-700 flex flex-1 items-center px-2 rounded-md ">
          <input
            type="text"
            placeholder="Type a message..."
            className=" bg-transparent outline-none flex-1 py-1"
          />
          <span onClick={() => setOpenEmoji((prev) => !prev)}>
            {" "}
            <EmojiEmotions className=" cursor-pointer" />
          </span>
        </div>
        <div className=" absolute bottom-[60px] right-0 ">
          <EmojiPicker open={openEmoji} />
        </div>
        <div className=" mx-5 bg-gray-700 p-1 rounded-md cursor-pointer">
          <SendOutlined />
        </div>
      </div>
    </div>
  );
}

export default Chat;
