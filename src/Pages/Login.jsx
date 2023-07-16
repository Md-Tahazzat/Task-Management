import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import UpdateTitle from "../Hooks/UpdateTitle";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/Firebase";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    Swal.fire({
      title: "processing...",
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    // signIn user
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {
          Swal.close();
          reset();
          navigate("/add-task", { replace: true });
        }
      })
      .catch((err) => {
        Swal.close();
        const errorMess = err.message?.split("/")[1].slice(0, -2) || "";
        if (errorMess === "user-not-found") {
          setError("email", {
            type: "manual",
            message: "Please enter a valid email",
          });
        } else if (errorMess === "wrong-password") {
          setError("password", {
            type: "manual",
            message: "The password you entered is incorrect.",
          });
        }
      });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <UpdateTitle title="LogIn"></UpdateTitle>
      <form
        className="border md:min-w-[28rem] mx-2 md:mx-auto md:max-w-[32rem] p-4 w-full md:py-5 md:px-20 bg-slate-300/90 dark:bg-slate-700/90 border-slate-300 dark:border-slate-600 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl font-semibold ">Please LogIn</h1>
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
              errors?.email
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
            })}
            placeholder="Password"
            className={`py-2 px-2 bg-slate-100/60 dark:bg-slate-900/60 w-full rounded-md border ${
              errors?.password
                ? "border-red-600"
                : "dark:border-slate-500 border-slate-400"
            } focus:outline-none focus:border-slate-400 max-w-sm`}
          />
          <a
            onClick={() => setHidePassword(!hidePassword)}
            href="#"
            className="absolute right-3 bottom-3"
          >
            {hidePassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </a>
        </div>
        <div>
          <label className="label text-red-500 dark:text-red-400">
            {errors && (
              <span>{errors?.password?.message || errors?.email?.message}</span>
            )}
          </label>
        </div>

        <p className="text-sm">
          Dont't have an account ?
          <Link
            className="text-blue-600 dark:text-blue-400 ml-1"
            to="/register"
          >
            Register
          </Link>
        </p>

        <input
          className="w-full mt-4 py-2 max-w-md  bg-blue-600 rounded-md text-white text-xl hover:bg-blue-700"
          type="submit"
          value="LogIn"
        />
      </form>
    </div>
  );
};

export default Login;
