import React from "react";
import {
  ArrowBack,
  EmailOutlined,
  KeyOutlined,
  QuestionAnswerTwoTone,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { look, instagram, facebook, google } from "../assets";
import { motion } from "framer-motion";

function Signin() {
  return (
    <div className=" h-screen flex justify-center items-center   bg-[#081b29]">
      <div className=" max-w-[100%] mx-auto">
        <h1 className=" text-4xl font-serif text-center flex items-center justify-center p-2 text-gray-300 my-5">
          <QuestionAnswerTwoTone fontSize="100px" />
          chat<span className=" font-bold">Me</span>
        </h1>
        <section className="flex  w-full justify-between p-5 sm:flex-row flex-col   sm:border-solid border-none ">
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

          <form className="flex flex-col  items-center justify-center">
            <h2 className="text-gray-300 text-3xl font-serif">Sign In</h2>

            <div className="flex flex-col  sm:w-[500px] w-[300px] gap-5 justify-center items-center mt-5">
              <div className="text-gray-300 px-2 flex justify-center items-center  bg-gray-600 rounded-md w-[100%]">
                <EmailOutlined />
                <input
                  className=" bg-transparent h-10 p-2 text-sm font-bold  w-[100%] text-gray-300 outline-none"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="text-gray-300 px-2 flex justify-center items-center  bg-gray-600 rounded-md w-[100%]">
                <KeyOutlined />
                <input
                  className=" bg-transparent h-10 p-2 text-sm font-bold  w-[100%] text-gray-300 outline-none"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button className="w-fit p-3 px-12 rounded-md bg-blue-800 text-white text-sm font-bold hover:bg-opacity-90">
                Signin
              </button>
              <p className=" text-[12px] text-gray-400 ">
                Don't Have an account ?{" "}
                <span className="hover:text-blue-500 cursor-pointer text-gray-300 underline">
                  {" "}
                  <Link to={"/"}> Sign Up</Link>
                </span>
              </p>

              <img
                className=" hover:size-[20%] h-[40px] cursor-pointer"
                src={google}
                alt=""
              />
            </div>
          </form>
        </section>
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
