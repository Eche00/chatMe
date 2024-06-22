import React, { useRef, useState } from "react";
import {
  ArrowBackIos,
  EmailOutlined,
  KeyOutlined,
  QuestionAnswerTwoTone,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { look, instagram, facebook, google, profile } from "../assets";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../lib/uploads";
import { Spinner } from "flowbite-react";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  // accessing profile image selection through input ref
  const profileRef = useRef(null);

  // handling avatar upload
  const handleAvatarUpload = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  // handling form submit(Registering account)
  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    // getting formdata
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      // creating user with formdata (email & password)
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // storing image on firebase storage
      const imgUrl = await upload(avatar.file);

      // adding user cresidentials to firestore db
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      // adding user chats to firestore db for later access
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
      //notification msg
      toast.success("Account created");
      // after success , this would navigate user to sign in page
      navigate("/signin");
    } catch (error) {
      // handling error to be displayed
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" h-screen flex justify-center items-center   bg-[#081b29]">
      {/* All page */}

      <div className=" max-w-[100%] mx-auto">
        <h1 className=" text-4xl font-serif text-center flex items-center justify-center p-2 text-gray-300 my-5">
          <QuestionAnswerTwoTone fontSize="100px" />
          chat<span className=" font-bold">Me</span>
        </h1>
        <section className="flex  w-full justify-between p-5 sm:flex-row flex-col   sm:border-solid border-none ">
          {/* left body */}
          <motion.section
            initial={{ rotate: 0 }}
            whileInView={{
              rotate: 1 % 2 === 0 ? [-1, 5.3, 0] : [1, -5.4, 0],
            }}
            transition={{ repeat: Infinity, duration: 3, delay: 2 }}
            className="">
            <img
              className="h-[600px] hidden sm:inline-block"
              src={look}
              alt=""
            />
          </motion.section>

          {/* right body (sign up form) */}

          <form
            onSubmit={handleRegistration}
            className="flex flex-col  items-center justify-center">
            <h2 className="text-gray-300 text-3xl font-serif">Sign Up</h2>
            {/* profile image section */}

            <div className="flex items-center justify-between w-full">
              <input
                type="file"
                name="avatar"
                hidden
                ref={profileRef}
                onChange={handleAvatarUpload}
              />

              <img
                className=" w-[50px] h-[50px] object-cover rounded-[50%]  cursor-pointer border-2 border-gray-700"
                onClick={() => profileRef.current.click()}
                src={avatar.url || profile}
                alt=""
              />
              <h2 className=" text-white text-sm font-bold">
                <ArrowBackIos fontSize="small" /> Upload profile image
              </h2>
            </div>

            <div className="flex flex-col  sm:w-[500px] w-[300px] gap-5 justify-center items-center mt-5">
              {/* username */}
              <div className="text-gray-300 px-2 flex justify-center items-center  bg-gray-600 rounded-md w-[100%]">
                <AccountCircleIcon />
                <input
                  className=" bg-transparent h-10 p-2 text-sm font-bold  w-[100%] text-gray-300 outline-none"
                  type="text"
                  placeholder="Username"
                  name="username"
                  required
                />
              </div>

              {/* email*/}
              <div className="text-gray-300 px-2 flex justify-center items-center  bg-gray-600 rounded-md w-[100%]">
                <EmailOutlined />
                <input
                  className=" bg-transparent h-10 p-2 text-sm font-bold  w-[100%] text-gray-300 outline-none"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                />

                {/* password */}
              </div>
              <div className="text-gray-300 px-2 flex justify-center items-center  bg-gray-600 rounded-md w-[100%]">
                <KeyOutlined />
                <input
                  className=" bg-transparent h-10 p-2 text-sm font-bold  w-[100%] text-gray-300 outline-none"
                  type="text"
                  placeholder="Password"
                  name="password"
                />
              </div>

              {/*signup button */}
              <button
                className=" p-3 px-12 rounded-md bg-blue-800 text-white text-sm font-bold hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-blue-600 flex"
                disabled={loading}>
                {loading ? (
                  <>
                    <Spinner className=" w-[20px] h-[20px]" size="sm" />
                    <span className=" pl-3">Loading...</span>
                  </>
                ) : (
                  "SignUp"
                )}
              </button>
              <p className=" text-[12px] text-gray-400 ">
                Have an account ?{" "}
                <span className="hover:text-blue-500 cursor-pointer text-gray-300 underline">
                  {" "}
                  <Link to={"/signin"}>Sign In</Link>
                </span>
              </p>

              {/* google signup */}
              <img
                className=" hover:size-[20%] h-[40px] cursor-pointer"
                src={google}
                alt=""
              />
            </div>
          </form>
        </section>

        {/* footer section */}
        <section className="flex flex-col justify-center items-center text-sm my-2">
          <p className="text-gray-400">Welcome to chatMe 👋</p>
          <div className="flex justify-center items-center gap-1 w-[100%] my-10">
            <a href="">
              <img className="h-20 bg-transparent" src={instagram} alt="" />
            </a>
            <a href="">
              <img className="h-20" src={facebook} alt="" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SignUp;
