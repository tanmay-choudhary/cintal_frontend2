import PatientCard from "@/components/PatientCard";
import TextInput from "@/components/TextInput";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/Navbar";
import makeApiCall from "@/utils/makeApiCall";

function Index() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState();
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query

  useEffect(() => {
    setLoading(true);
    setRole(user.object.role);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      let response = await makeApiCall("GET", "/patients/get-all-patient");
      setPatients(response.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Filter patients based on search query
  const filteredPatients = patients?.filter((patient) =>
    patient?.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-2 container mx-auto space-y-4">
      <Navbar role={role} />
      <TextInput
        placeholder={"Search by patient Id ..."}
        className={
          "text-md border border-gray-400 bg-gray-100 rounded-xl p-2 lg:w-[40%] w-full focus:outline-none"
        }
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
      />
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-md h-40">
              <div className="animate-pulse h-6 w-2/3 bg-gray-300 rounded-md"></div>
              <div className="animate-pulse h-4 w-2/3 bg-gray-200 rounded-md mt-2"></div>
              <div className="animate-pulse h-4 w-1/2 bg-gray-300 rounded-md mt-2"></div>
              <div className="animate-pulse h-4 w-3/4 bg-gray-200 rounded-md mt-2"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredPatients?.length === 0 && (
        <div className="text-center flex items-center justify-center text-sky-500 text-2xl lg:h-[50vh]">
          No data found
        </div>
      )}

      {!loading && filteredPatients?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient, index) => (
            <PatientCard
              key={index}
              patientId={patient.patientId}
              name={patient.name}
              age={patient.age + " years"}
              height={patient.height}
              weight={patient.weight}
              bloodGroup={patient.bloodGroup}
              issue={patient.issue}
              image={patient.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Index;
