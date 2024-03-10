import DoctorProfile from "@/components/Profile/DoctorProfile";
import UserProfile from "@/components/Profile/UserProfile";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../src/redux/actions";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/Navbar";
import makeApiCall from "@/utils/makeApiCall";

function Index() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState();
  const [userData, setUserData] = useState({});
  useEffect(() => {
  setLoading(true);

  async function helper(queryString) {
    let response = await makeApiCall("GET", queryString);
    setUserData(response.data[0]);
    setLoading(false);
  }

  switch (user?.object?.role) {
    case "Patient": {
      helper(`/patients/get-patient?patientId=${user?.object?.patientId}`);
      break;
    }
    case "Doctor": {
      helper(`/doctors/get-doctor?doctorId=${user?.object?.doctorId}`);
      break;
    }
  }

  setRole(user?.object?.role);

}, [user]);


  return (
    <div>
      {/*   <UserProfile /> */}
      <Navbar role={ role } />
      {loading && <div className="flex justify-center items-center h-[60vh]">
									<div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-2 border-sky-600"></div>
      </div> }
      
      {!loading &&  <>
      {role == "Doctor" && (
        <DoctorProfile
          userData={userData}
          setUserData={setUserData}
          addUser={addUser}
        />
      )}
      {role == "Patient" && (
        <UserProfile
          userData={userData}
          setUserData={setUserData}
          addUser={addUser}
        />
      ) }</>
      }
    </div>
  );
}

export default Index;
