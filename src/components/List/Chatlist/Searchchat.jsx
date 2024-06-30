import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { profile } from "../../../assets";
import { useUserStore } from "../../../lib/userStore";

function Searchchat() {
  const [user, setUser] = useState(null);
  const [added, setAdded] = useState(false);
  const { currentUser } = useUserStore();
  // handling user search and add
  const handleSearch = async (e) => {
    e.preventDefault();
    // creating formdata to get usernames searched
    const formData = new FormData(e.target);
    const username = formData.get("username");

    //getting users related to the name searched from db with query
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    // using onsnapshot to get chats on page
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        // Getting user chats data

        const items = res.data().chats;
      }
    );

    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    if (userChatsRef === chatRef) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, []);

  // handling add user
  const handleAdd = async () => {
    //creating user chat db
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    //getting chat info
    try {
      const newchatRef = doc(chatRef);
      if (user.username === userChatsRef.username) return;
      await setDoc(newchatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      // updating chat db based on the user id added
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newchatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      //
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newchatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      setAdded(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full h-fit mx-auto   p-[20px]">
      <div className=" flex   gap-[20px] flex-col">
        {/*search and add user with username*/}
        <form
          onSubmit={handleSearch}
          className=" flex items-center  flex-1 rounded-md  gap-[30px]">
          <input
            className=" flex-1 bg-gray-700 p-2 rounded-md outline-none "
            type="text"
            placeholder="search..."
            name="username"
          />
          <button className=" bg-blue-500 rounded-md px-3 py-2">Search</button>
        </form>

        {user && (
          <div className=" flex items-center border-b-2 border-gray-700  gap-[20px] py-[10px] hover:bg-[rgba(92,92,94,0.1)] cursor-pointer px-2">
            <img
              className=" w-[50px] h-[50px] object-cover rounded-[50%]"
              src={user?.avatar || profile}
              alt=""
            />
            <div className=" flex items-center justify-between gap-[5px] flex-1">
              <span className=" font-bold">{user?.username}</span>
              <button
                onClick={handleAdd}
                className=" bg-blue-500 rounded-md px-3 py-2"
                disabled={added}>
                {added ? "Added" : "Add user"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchchat;
