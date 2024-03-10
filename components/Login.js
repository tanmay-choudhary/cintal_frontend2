import React, { useState } from "react";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../src/redux/actions";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import generateUniqueId from "@/utils/generateUniqueId";
import makeApiCall from "@/utils/makeApiCall";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const cookies = new Cookies();
	const router = useRouter();
	//const hasVisitedBefore = cookies.get("refresh_token");
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			let response = await makeApiCall("POST", "/auth/login", {
				email,
				password,
				type: "PASSWORD",
			});

			cookies.set("refresh_token", response.data.refresh_token, {
				path: "/",
				maxAge: 31536000,
			});
			dispatch(addUser(response.data.user, generateUniqueId));
			//console.log(response.data.refresh_token);
			if (response.data.refresh_token) {
				setLoading(false);

				router.push("/profile");
			}
			toast.success("Login Successfully !");
		} catch (err) {
			setLoading(false);
			setError("Please Sign Up First");
			toast.error(err.message);
		}
	};

	return (
		<>
			<ToastContainer />
			<div className="flex flex-col items-center justify-center h-screen">
				<div className="max-w-md w-full p-6 bg-gray-100 rounded-md shadow-md">
					<h1 className="text-3xl font-semibold mb-4">Login</h1>
					<form onSubmit={handleSubmit}>
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
								onChange={(e) => {
									setEmail(e.target.value);
									setError("");
								}}
								className="mt-1 p-2 border border-gray-300 rounded-md w-full"
								required
								placeholder="Enter your email"
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
						{error && (
							<p className="text-red-500 text-md my-2 font-medium">
								{error}
							</p>
						)}
						<button
							type="submit"
							className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 w-full"
						>
							{!loading ? (
								"Login"
							) : (
								<div className="flex justify-center items-center ">
									<div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
								</div>
							)}
						</button>
					</form>
					<div className="mt-2 text-md text-gray-600 flex items-center justify-center">
						Don't have an account?{" "}
						<Link href="/signup">
							<p className="text-orange-500 hover:underline ml-2">
								Sign up
							</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
