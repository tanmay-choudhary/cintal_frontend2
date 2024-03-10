import React, { useState } from "react";
import makeApiCall from "@/utils/makeApiCall";
function UserProfile({ userData, setUserData }) {
  const [editMode, setEditMode] = useState(false);
  //console.log(userData);
  //   const [userData, setUserData] = useState({
  //     img: "/imageplaceholder.jpg",
  //     name: "xyz Wim",
  //     email: "xyz@example.com",
  //     role: "Patient",
  //     age: 30,
  //     height: 155,
  //     weight: 50,
  //     bloodGroup: "O-",
  //   });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
        `/patients/update-patient/${userData?.patientId}`,
        userData
      );
      //console.log(response);
    } catch (err) {
      console.log(err);
    }
    setEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <>
      <div className="container mx-auto lg:w-[60%] 2xl:w-[40%] w-[90%] lg:mt-4 2xl:mt-8 mt-8">
        <div className="lg:flex lg:flex-row flex flex-col items-start lg:space-x-8 space-y-5 lg:space-y-0">
          <img
            src={userData.img  || "/imageplaceholder.jpg"}
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
                  Email : <span className="font-normal">{userData.email}</span>
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
                  <p className="text-md font-medium ">Height: ( in cm)</p>
                  <input
                    type="text"
                    name="height"
                    value={userData.height}
                    onChange={handleChange}
                    className="text-md border border-gray-400 rounded-2xl p-2 outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-md font-medium ">Weight: ( in kgs)</p>
                  <input
                    type="text"
                    name="weight"
                    value={userData.weight}
                    onChange={handleChange}
                    className="text-md border border-gray-400 rounded-2xl p-2 outline-none"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <p className="text-md font-medium ">Blood Group : </p>
                  <input
                    type="text"
                    name="bloodGroup"
                    value={userData.bloodGroup}
                    onChange={handleChange}
                    className="text-md border border-gray-400 rounded-2xl p-2 outline-none w-full"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <p className="text-md font-medium ">Change Image : </p>
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
                  Email : <span className="font-normal">{userData.email}</span>
                </p>

                <p className="text-md font-medium ">
                  Age :{" "}
                  <span className="font-normal">{userData.age} years</span>
                </p>
                <p className="text-md font-medium ">
                  Height :{" "}
                  <span className="font-normal">{userData.height} cm</span>
                </p>
                <p className="text-md font-medium ">
                  Blood Group :{" "}
                  <span className="font-normal">{userData.bloodGroup} </span>
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

export default UserProfile;
