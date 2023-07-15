import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UpdateTitle from "../Hooks/UpdateTitle";
import Swal from "sweetalert2";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../Firebase/Firebase";

const Register = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";

  // React Hook form functionality
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { confirmPassword, email, password } = data;
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Confirm password didn't match",
      });
      return;
    }
    Swal.fire({
      title: "processing...",
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {
          Swal.close();
          reset();
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        const errorMess = err.message?.split("/")[1].slice(0, -2) || "";
        if (errorMess === "email-already-in-use") {
          setError("email", {
            type: "manual",
            message:
              "This email already exists. Please choose a different email.",
          });
        }
        console.log(errorMess);
        Swal.close();
      });
  };

  // social login method
  //   const handleGoogleSigin = () => {
  //     const provider = new GoogleAuthProvider();
  //     signInWithPopup(auth)
  //       .then((result) => {
  //         if (result?.user) {
  //           navigate(from, { replace: true });
  //         }
  //       })
  //       .catch((error) => console.log(err.message));
  //   };

  return (
    <div className="w-screen h-screen flex items-center justify-center  ">
      <UpdateTitle title="Reister"></UpdateTitle>;
      <form
        className="border md:min-w-[28rem] mx-2 md:mx-auto md:max-w-[32rem] p-4 w-full md:py-5 md:px-20 bg-slate-300/90 dark:bg-slate-700/90 border-slate-300 dark:border-slate-600 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl font-semibold ">Please Register</h1>
        <div className="w-full">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            required
            {...register("name", { required: true })}
            placeholder="Enter your name"
            className="py-2 px-2 bg-slate-100/60 dark:bg-slate-900/60 rounded-md border dark:border-slate-500 border-slate-300 focus:outline-none focus:border-slate-400 w-full max-w-lg"
          />
        </div>

        <div className="w-full">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            required
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className={`py-2 px-2 bg-slate-100/60 dark:bg-slate-900/60 w-full rounded-md border ${
              errors.email
                ? "border-red-600"
                : "dark:border-slate-500 border-slate-400"
            } focus:outline-none focus:border-slate-400 max-w-sm`}
          />
        </div>
        <div className="w-full relative">
          <label className="label" htmlFor="password">
            Password:
          </label>
          <input
            type={hidePassword ? "password" : "text"}
            required
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  "Password must have at least one uppercase letter and one special character.",
              },
            })}
            placeholder="Password"
            className={`py-2 px-2 bg-slate-100/60 dark:bg-slate-900/60 w-full rounded-md border ${
              errors?.password
                ? "border-red-600"
                : "dark:border-slate-500 border-slate-400"
            } focus:outline-none focus:border-slate-400 max-w-sm`}
          />
          <span
            onClick={() => setHidePassword(!hidePassword)}
            className="absolute right-3 bottom-3"
          >
            {hidePassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </span>
        </div>

        <div className="w-full relative">
          <label className="label" htmlFor="password">
            Confirm-Password:
          </label>
          <input
            type={hidePassword ? "password" : "text"}
            required
            {...register("confirmPassword", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  "Password must have at least one uppercase letter and one special character.",
              },
            })}
            placeholder="Confirm password"
            className={`py-2 px-2 bg-slate-100/60 dark:bg-slate-900/60 w-full rounded-md border ${
              errors.confirmPassword
                ? "border-red-600"
                : "dark:border-slate-500 border-slate-400"
            } focus:outline-none focus:border-slate-400 max-w-sm`}
          />
          <span
            onClick={() => setHidePassword(!hidePassword)}
            className="absolute right-3 bottom-3"
          >
            {hidePassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </span>
        </div>
        <div>
          <label className="label text-red-500 dark:text-red-400">
            {errors && (
              <span>
                {errors.confirmPassword?.message ||
                  errors?.password?.message ||
                  errors.email?.message}
              </span>
            )}
          </label>
        </div>

        <p className="text-sm">
          Already have an account?
          <Link
            state={{ from: from }}
            className="text-blue-600 dark:text-blue-400 ml-1"
            to="/login"
          >
            Login
          </Link>
        </p>

        <input
          className="w-full mt-4 py-2 max-w-md  bg-blue-600 rounded-md text-white text-xl hover:bg-blue-700"
          type="submit"
          value="Register"
        />
      </form>
      {/* <p className="text-center mt-10">Sign in with </p>
      <div className="my-4 max-w-[32rem] w-full mx-auto flex items-center justify-center gap-5">
        <button
          onClick={handleGoogleSigin}
          className="flex items-center rounded-md bg-slate-500/70 shadow-lg dark:bg-slate-600/70 hover:bg-slate-400/90 dark:hover:bg-slate-600/95 duration-200 text-xl text-white justify-center border border-slate-400 dark:border-slate-600"
        >
          <FaGoogle className="w-10 h-10 p-1" />{" "}
          <span className="px-2">Google</span>
        </button>
      </div> */}
    </div>
  );
};

export default Register;
