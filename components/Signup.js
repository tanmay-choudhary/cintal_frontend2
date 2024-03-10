import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../src/redux/actions";
import Link from "next/link";
import { useRouter } from "next/router";
import makeApiCall from "@/utils/makeApiCall";
import validateRegistrationForm from "@/utils/validateRegistrationForm";
import generateUniqueId from "@/utils/generateUniqueId";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const [ name, setName ] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log({ name, email, password, role });
    let resp = validateRegistrationForm(name, email, password, role);
    if (resp?.error) {
      toast.error(resp.message);
    }
    console.log(resp);
    if (!resp?.error) {
      setLoading(true)
      try {
        let response = await makeApiCall("POST", "/auth/sign-up", {
          name,
          email,
          password,
          role,
        });
        router.push("/");
        //dispatch(addUser({ name: "tanmay" }, generateUniqueId));
        //console.log(response);
        setLoading(false)
        toast.success("Account Registered Successfully!");
      } catch (err) {
        console.log(err);
        setLoading(false)
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <ToastContainer/>
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
              placeholder="Enter Your Full Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
              placeholder="Enter Your Email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="">Select Role</option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 w-full"
          >
          	{!loading ? (
								"Sign Up"
							) : (
								<div className="flex justify-center items-center ">
									<div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
								</div>
							)}
          </button>
        </form>
        <div className="mt-3 text-sm text-gray-600 flex items-center justify-center">
          Already have an account?{" "}
          <Link href="/">
            <p className="text-orange-500 hover:underline ml-2"> Login</p>
          </Link>
        </div>
      </div>
      </div>
      </>
  );
};

export default Signup;
