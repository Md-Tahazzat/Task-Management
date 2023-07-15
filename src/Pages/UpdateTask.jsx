import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import UpdateTitle from "../Hooks/UpdateTitle";
import UseAuthcontext from "../Hooks/UseAuthcontext";

const UpdateTask = () => {
  const { user } = UseAuthcontext();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const axiosInstance = UseAxiosSecure();

  useEffect(() => {
    axiosInstance.get(`/tasks/${id}?email=${user?.email}`).then((res) => {
      setTitle(res.title);
      setDescription(res.description);
      setPriority(res.priority);
      setDeadline(res.deadline);
      setCategory(res.category);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const priority = form.priority.value;
    const deadline = form.deadline.value;
    const category = form.category.value;
    Swal.fire({
      title: "Updating...",
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    axiosInstance
      .put(`/tasks/${id}?email=${user?.email}`, {
        title,
        description,
        priority,
        deadline,
        category,
      })
      .then((res) => {
        if (res.modifiedCount > 0) {
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "success",
            text: "successfully modified",
          });
          navigate("/");
        } else {
          Swal.close();
          navigate("/");
        }
      })
      .catch((err) => {
        Swal.close();
        console.log(err);
      });
  };

  return (
    <div>
      <UpdateTitle title="Update Task"></UpdateTitle>
      <form
        className="border mt-4 mx-auto md:mt-8 md:min-w-[28rem] md:max-w-[42rem] p-4 w-full md:py-5 text-slate-800 dark:text-slate-200 md:px-20 bg-slate-300/90 dark:bg-slate-700/90 border-slate-300 dark:border-slate-600 rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-semibold ">
          Update your task
        </h1>

        {/* title input field */}
        <div className="w-full">
          <label htmlFor="title" className="label">
            Title:
          </label>
          <input
            onChange={() => setTitle(event.target.value)}
            value={title}
            type="text"
            id="title"
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
            onChange={() => setDescription(event.target.value)}
            value={description}
            className="py-2 px-2 mt-1 h-32 bg-slate-100/60 dark:bg-slate-500/60 rounded-md border dark:border-slate-500 border-slate-300 focus:outline-none focus:border-slate-400 w-full max-w-lg"
            id="description"
          ></textarea>
        </div>

        {/* priority input field */}
        <div className="w-full">
          <label htmlFor="priority" className="label">
            Priority:
          </label>
          <input
            onChange={() => setPriority(event.target.value)}
            value={priority}
            type="text"
            id="priority"
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
            value={deadline}
            onChange={() => setDeadline(event.target.value)}
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
            value={category}
            onChange={() => setCategory(event.target.value)}
            placeholder="Category (ex: Work, Personal, etc)"
            className="py-2 px-2 bg-slate-100/60 dark:bg-slate-500/60 rounded-md border dark:border-slate-500 border-slate-300 focus:outline-none focus:border-slate-400 w-full max-w-lg"
          />
        </div>

        <input
          className="w-full max-w-lg mt-6 py-2 bg-orange-400 rounded  text-slate-50 hover:bg-orange-500 duration-200 shadow-lg"
          type="submit"
          value="Update Task"
        />
      </form>
    </div>
  );
};

export default UpdateTask;
