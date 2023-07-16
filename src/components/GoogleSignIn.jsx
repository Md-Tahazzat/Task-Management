import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import auth from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = ({ from, socialLoginError, setSocialLoginError }) => {
  const navigate = useNavigate();
  // social login method
  const handleGoogleSigin = async () => {
    setSocialLoginError("");
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        if (result?.user) {
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <p className="text-center mt-10">Sign in with </p>
      <label
        className={`label text-red-500 dark:text-red-400 ${
          !socialLoginError && "hidden"
        } `}
      >
        {socialLoginError && socialLoginError}
      </label>
      <div className="my-4 max-w-[32rem] w-full mx-auto flex items-center justify-center gap-5">
        <button
          onClick={handleGoogleSigin}
          className="flex items-center px-4 rounded-md bg-slate-500/70 shadow-lg dark:bg-slate-600/70 hover:bg-slate-400/90 dark:hover:bg-slate-600/95 duration-200 text-xl text-white justify-center border border-slate-400 dark:border-slate-600"
        >
          <FaGoogle className="w-10 h-10 p-1" />{" "}
          <span className="px-2">Google</span>
        </button>
      </div>
    </>
  );
};

export default GoogleSignIn;
