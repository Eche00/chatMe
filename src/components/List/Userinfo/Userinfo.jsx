import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useUserStore } from "../../../lib/userStore";
import { ArrowBack, Logout } from "@mui/icons-material";
import { auth } from "../../../lib/firebase";
import { deleteUser, signOut, updateCurrentUser } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

function Userinfo() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
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
  // handle delete user
  const handleDeletetUser = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteUser(auth.currentUser);

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  //opening profile section
  const handleProfile = () => {
    setOpen(true);
  };
  //opening profile section

  // handling avatar upload
  const handleAvatarUpload = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  //handling update profile

  /////////////////
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update username
      await updateProfile(currentUser, {
        username: formData.username,
        password: formData.password,
      });
      // Update profile picture if a new one was selected
      if (formData.avatar) {
        // storing image on firebase storage
        const imgUrl = await upload(avatar.file);
      }
      // adding user cresidentials to firestore db
      await setDoc(doc(db, "users", res.user.uid), {
        username: formData.username,
        password: formData.password,
        avatar: imgUrl,
        id: res.user.uid,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      {open ? (
        <div className=" absolute top-0 left-0 right-0 bottom-0 bg-[#081b29] flex flex-col items-center justify-center z-40">
          <span
            className=" absolute left-10 top-10 cursor-pointer"
            onClick={() => setOpen(false)}>
            <ArrowBack />
          </span>
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-5 w-[50%] mx-auto  items-center">
            <label htmlFor="img">
              <img
                className=" rounded-full cursor-pointer self-center w-[120px] h-[120px] object-cover"
                src={avatar?.url || currentUser.avatar}
                alt="profile"
              />
            </label>

            <input
              type="file"
              id="img"
              hidden
              accept="image/*"
              onChange={handleAvatarUpload}
            />

            <input
              id="username"
              type="text"
              defaultValue={currentUser.username}
              placeholder="username"
              className=" bg-transparent h-10 p-2 text-sm font-bold   text-gray-300 outline-none border-b-2 w-[50%]"
            />
            <input
              id="email"
              type="email"
              defaultValue={currentUser.email}
              placeholder="email"
              className=" bg-transparent h-10 p-2 text-sm font-bold   text-gray-300 outline-none border-b-2 w-[50%]"
            />
            <input
              id="password"
              type="password"
              placeholder="password"
              className=" bg-transparent h-10 p-2 text-sm font-bold   text-gray-300 outline-none border-b-2 w-[50%]"
            />
            <button className=" p-3 px-12 rounded-md bg-blue-800 text-white text-sm font-bold hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-blue-600 flex">
              Update
            </button>
          </form>
          <div className=" flex gap-5 py-[20px]">
            <button
              className=" p-3 w-[120px]  rounded-md bg-blue-600 text-white text-sm font-bold hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-blue-600 "
              onClick={signOutUser}>
              Log Out
            </button>{" "}
            <button
              className=" p-3 w-[120px] rounded-md bg-red-600 text-white text-sm font-bold hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-blue-600"
              onClick={handleDeletetUser}>
              Delete User
            </button>
          </div>
        </div>
      ) : (
        <div className=" flex justify-between items-center p-[20px]">
          <section className=" flex gap-[20px] items-center cursor-pointer">
            <span className="group relative">
              <img
                onClick={handleProfile}
                className=" w-[50px] h-[50px] object-cover rounded-[50%] border-2 border-gray-700"
                src={currentUser.avatar}
                alt=""
              />
              <p className=" opacity-0 group-hover:opacity-100 text-white  absolute left-[110%]  -top-2 text-sm bg-[rgba(55,65,81,0.60)] px-2 rounded-md z-10 ">
                Profile
              </p>
            </span>
            <h2 className=" text-2xl">{currentUser.username}</h2>
          </section>

          <div className=" flex gap-[20px]">
            {" "}
            <MoreHorizIcon fontSize="medium" className=" cursor-not-allowed" />
            <button
              className=" bg-[#5183fe] rounded-md px-1 group relative"
              onClick={signOutUser}>
              <Logout fontSize="small" />
              <p className=" opacity-0 group-hover:opacity-100 text-white  absolute left-[110%] bottom-0 top-0 text-sm bg-[rgba(55,65,81,0.60)] px-2 rounded-md z-10">
                SignOut
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Userinfo;
