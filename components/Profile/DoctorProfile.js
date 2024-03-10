import makeApiCall from "@/utils/makeApiCall";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function DoctorProfile({ userData, setUserData, addUser }) {
	console.log(userData);
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setUserData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setUserData((prevState) => ({
				...prevState,
				img: reader.result,
			}));
		};
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const toggleEditMode = () => {
		setEditMode((prevEditMode) => !prevEditMode);
	};

	const handleSave = async () => {
		try {
			let response = await makeApiCall(
				"PATCH",
				`/doctors/update-doctor/${userData?.doctorId}`,
				userData,
			);
			//console.log(response);
			//dispatch(addUser(userData, generateUniqueId));
		} catch (err) {
			console.log(err);
		}
		setEditMode((prevEditMode) => !prevEditMode);
	};
	useEffect(() => {
		//console.log(userData);
	}, [userData]);
	return (
		<>
			<div className="container mx-auto lg:w-[60%] 2xl:w-[40%] w-[90%] lg:mt-4 2xl:mt-8 mt-8">
				<div className="lg:flex lg:flex-row flex flex-col items-start lg:space-x-8 space-y-5 lg:space-y-0">
					<img
						src={userData.img || "/imageplaceholder.jpg"}
						className="w-40 h-40 rounded-2xl object-fit"
					/>
					<div className="flex flex-col">
						{editMode ? (
							<div className="space-y-3 flex flex-col">
								<div className="font-medium text-2xl flex items-center ">
									{userData.name}{" "}
									<p className="ml-2 rounded-2xl text-xs bg-orange-100 w-[80px] text-center py-1 px-2 font-medium">
										{userData.role}
									</p>
								</div>
								<p className="text-md font-medium ">
									Email :{" "}
									<span className="font-normal">
										{userData.email}
									</span>
								</p>

								<div className="flex flex-col space-y-2">
									<p className="text-md font-medium ">Age:</p>
									<input
										type="text"
										name="age"
										value={userData.age}
										onChange={handleChange}
										className="text-md border border-gray-400 rounded-2xl p-2 outline-none"
									/>
								</div>
								<div className="flex flex-col space-y-2">
									<p className="text-md font-medium ">
										Specialization:{" "}
									</p>
									<input
										type="text"
										name="specialisation"
										value={userData.specialisation}
										onChange={handleChange}
										className="text-md border border-gray-400 rounded-2xl p-2 outline-none"
									/>
								</div>

								<div className="flex flex-col space-y-2">
									<p className="text-md font-medium ">
										Availability:{" "}
									</p>
									<input
										type="text"
										name="availability"
										value={userData.availability}
										onChange={handleChange}
										className="text-md border border-gray-400 rounded-2xl p-2 outline-none w-full"
									/>
								</div>

								<div className="flex flex-col space-y-2">
									<p className="text-md font-medium ">
										Change Image :{" "}
									</p>
									<input
										type="file"
										accept="image/*"
										onChange={handleImageChange}
										className="mt-2"
									/>
								</div>
							</div>
						) : (
							<div className="space-y-2">
								<div className="font-medium text-2xl flex items-center ">
									{userData.name}{" "}
									<p className="ml-2 rounded-2xl text-xs bg-orange-100 w-[80px] text-center py-1 px-2 font-medium">
										{userData.role}
									</p>
								</div>
								<p className="text-md font-medium ">
									Email :{" "}
									<span className="font-normal">
										{userData.email}
									</span>
								</p>
								<p className="text-md font-medium ">
									Age :{" "}
									<span className="font-normal">
										{userData.age} years
									</span>
								</p>
								<p className="text-md font-medium ">
									Specialisation :{" "}
									<span className="font-normal">
										{userData.specialisation}{" "}
									</span>
								</p>
								<p className="text-md font-medium ">
									Availability:{" "}
									<span className="font-normal">
										{userData.availability}{" "}
									</span>
								</p>
							</div>
						)}
					</div>
				</div>
				<div className="flex items-end justify-end">
					<button
						onClick={toggleEditMode}
						className="text-blue-500 p-2 text-lg mt-2"
					>
						{!editMode && "Edit Details"}
					</button>
				</div>
				<div className="flex items-end justify-end">
					<button
						onClick={handleSave}
						className="text-blue-500 p-2 text-lg mt-2"
					>
						{editMode && "Save Details"}
					</button>
				</div>
			</div>
		</>
	);
}

export default DoctorProfile;
