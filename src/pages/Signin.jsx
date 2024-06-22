import React, { useState } from "react";
import {
  EmailOutlined,
  KeyOutlined,
  QuestionAnswerTwoTone,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { look, instagram, facebook, google } from "../assets";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

function Signin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handling form submit(Log into account)
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // getting formdata
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      // signing in with email & password
      const res = await signInWithEmailAndPassword(auth, email, password);

      //notification msg
      toast.success("Sign in successful");

      // after success , this would navigate user to home in page
      navigate("/home");
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

          {/* right body (sign in form) */}
          <form
            onSubmit={handleSignin}
            className="flex flex-col  items-center justify-center">
            <h2 className="text-gray-300 text-3xl font-serif">Sign In</h2>

            <div className="flex flex-col  sm:w-[500px] w-[300px] gap-5 justify-center items-center mt-5">
              {/* email*/}
              <div className="text-gray-300 px-2 flex justify-center items-center  bg-gray-600 rounded-md w-[100%]">
                <EmailOutlined />
                <input
                  className=" bg-transparent h-10 p-2 text-sm font-bold  w-[100%] text-gray-300 outline-none"
                  type="email"
                  placeholder="Email"
                  name="email"
                />
              </div>

              {/* password */}
              <div className="text-gray-300 px-2 flex justify-center items-center  bg-gray-600 rounded-md w-[100%]">
                <KeyOutlined />
                <input
                  className=" bg-transparent h-10 p-2 text-sm font-bold  w-[100%] text-gray-300 outline-none"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>

              {/*signin button */}
              <button
                className=" p-3 px-12 rounded-md bg-blue-800 text-white text-sm font-bold hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-blue-600 flex"
                disabled={loading}>
                {loading ? (
                  <>
                    <Spinner className=" w-[20px] h-[20px]" size="sm" />
                    <span className=" pl-3">Loading...</span>
                  </>
                ) : (
                  "SignIn"
                )}
              </button>
              <p className=" text-[12px] text-gray-400 ">
                Don't Have an account ?{" "}
                <span className="hover:text-blue-500 cursor-pointer text-gray-300 underline">
                  {" "}
                  <Link to={"/"}> Sign Up</Link>
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

export default Signin;
