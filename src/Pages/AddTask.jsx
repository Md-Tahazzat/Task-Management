import React from "react";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAuthcontext from "../Hooks/UseAuthcontext";
import Swal from "sweetalert2";
import UpdateTitle from "../Hooks/UpdateTitle";

const AddTask = () => {
  const axiosInstance = UseAxiosSecure();
  const { user } = UseAuthcontext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { title, description, priority, deadline, category } = data;
    Swal.fire({
      title: "adding...",
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const taskInfo = {
      title,
      description,
      priority,
      deadline,
      category,
      email: user?.email,
    };
    axiosInstance
      .post("/add-task", taskInfo)
      .then((res) => {
        if (res.insertedId) {
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "success",
            text: "successfully added",
          });
          reset();
        }
      })
      .catch((err) => {
        Swal.close();
        console.log(err);
      });
    console.log(data);
  };

  return (
    <div>
      <UpdateTitle title="Add Task"></UpdateTitle>
      <form
        className="border mt-5 mx-auto md:mt-8 md:min-w-[28rem] md:max-w-[42rem] p-4 w-full md:py-5 text-slate-800 dark:text-slate-200 md:px-20 bg-slate-300/90 dark:bg-slate-700/90 border-slate-300 dark:border-slate-600 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl font-semibold ">Add your task</h1>

        {/* title input field */}
        <div className="w-full">
          <label htmlFor="title" className="label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            required
            {...register("title", { required: true })}
            placeholder="Enter task title"
            className="py-2 px-2 bg-slate-100/60 dark:bg-slate-500/60 rounded-md border dark:border-slate-500 border-slate-300 focus:outline-none focus:border-slate-400 w-full max-w-lg"
          />
        </div>

        {/* description input field */}
        <div className="w-full mt-4">
          <label className="description" htmlFor="password">
            Description:
          </label>
          <textarea
            placeholder="Enter describtion"
            className="py-2 px-2 mt-1 h-32 resize-none bg-slate-100/60 dark:bg-slate-500/60 rounded-md border dark:border-slate-500 border-slate-300 focus:outline-none focus:border-slate-400 w-full max-w-lg"
            {...register("description")}
            id="description"
          ></textarea>
        </div>

        {/* priority input field */}
        <div className="w-full">
          <label htmlFor="priority" className="label">
            Priority:
          </label>
          <input
            type="text"
            id="priority"
            required
            {...register("priority", { required: true })}
            placeholder="Priority (ex. High, Medium, Low)"
            className="py-2 px-2 bg-slate-100/60 dark:bg-slate-500/60 rounded-md border dark:border-slate-500 border-slate-300 focus:outline-none focus:border-slate-400 w-full max-w-lg"
          />
        </div>

        {/* deadline input field */}
        <div className="w-full">
          <label htmlFor="deadline" className="label">
            Deadline:
          </label>
          <input
            type="text"
            id="deadline"
            required
            {...register("deadline", { required: true })}
            placeholder="Enter date"
            className="py-2 px-2 bg-slate-100/60 dark:bg-slate-500/60 rounded-md border dark:border-slate-500 border-slate-300 focus:outline-none focus:border-slate-400 w-full max-w-lg"
          />
        </div>

        {/* category input field */}
        <div className="w-full">
          <label htmlFor="category" className="label">
            Category:
          </label>
          <input
            type="text"
            id="category"
            required
            {...register("category", { required: true })}
            placeholder="Category (ex: Work, Personal, etc)"
            className="py-2 px-2 bg-slate-100/60 dark:bg-slate-500/60 rounded-md border dark:border-slate-500 border-slate-300 focus:outline-none focus:border-slate-400 w-full max-w-lg"
          />
        </div>
        <input
          className="w-full max-w-lg mt-6 py-2 bg-orange-400 rounded  text-slate-50 hover:bg-orange-500 duration-200 shadow-lg"
          type="submit"
          value="Add Task"
        />
      </form>
    </div>
  );
};

export default AddTask;
