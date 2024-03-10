import AppointmentForm from "@/components/AppointmentForm";
import DoctorCard from "@/components/DoctorCard";
import Modal from "@/components/Modal/Modal";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/Navbar";
import makeApiCall from "@/utils/makeApiCall";

function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [role, setRole] = useState();
  useEffect(() => {
    setLoading(true);
    setRole(user.object.role);
  }, [user]);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState();

  useEffect(() => {
    setLoading(true);
    async function helper() {
      let response = await makeApiCall("GET", "/doctors/get-all-doctor");
      //console.log(response.data);
      setDoctors(response.data);
      setLoading(false);
    }
    helper();
  }, []);

  const [isModal1Open, setIsModal1Open] = useState(false);

  const handleBookAppointment = (doctorId) => {
    setIsModal1Open(true);
    setDoctorId(doctorId);
  };

  return (
    <>
      <Navbar role={role} />
      <div className="p-4 container mx-auto">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-md rounded-md h-40"
              >
                <div className="animate-pulse h-4 w-2/3 bg-gray-300 rounded-md"></div>
                <div className="animate-pulse h-4 w-2/3 bg-gray-200 rounded-md mt-2"></div>
                <div className="animate-pulse h-4 w-1/2 bg-gray-300 rounded-md mt-2"></div>
                <div className="animate-pulse h-4 w-3/4 bg-gray-200 rounded-md mt-2"></div>
                <div className="animate-pulse h-4 w-2/3 bg-gray-300 rounded-md mt-2"></div>
              </div>
            ))}
          </div>
        )}{" "}
        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor, index) => (
                <DoctorCard
                  key={index}
                  name={doctor.name}
                  specialisation={doctor.specialisation}
                  availability={doctor.availability}
                  onBookAppointment={() => {
                    handleBookAppointment(doctor.doctorId);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Modal
        title="Schedule Appointment"
        isOpen={isModal1Open}
        onClose={() => setIsModal1Open(false)}
      >
        <AppointmentForm
          doctorId={doctorId}
          patientId={user.object.patientId}
          setIsModal1Open={setIsModal1Open}
        />
      </Modal>
    </>
  );
}

export default Index;
