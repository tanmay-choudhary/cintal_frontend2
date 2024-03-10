import Calendar from "@/components/Calendar/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import makeApiCall from "@/utils/makeApiCall";
function Schedule() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [role, setRole] = useState();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function helper() {
      try {
        let response, queryUrl;
        if (user.object.role == "Patient") {
          queryUrl = `/appointment/get-appointments?patientId=${user.object.patientId}`;
        } else {
          queryUrl = `/appointment/get-appointments?doctorId=${user.object.doctorId}`;
        }
        // console.log(queryUrl);
        response = await makeApiCall("GET", queryUrl);
        //console.log(response);
        setEvents(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    helper();
    setRole(user.object.role);
  }, [user]);

  //console.log(user);
  return (
    <div className="App">
      <Navbar role={role} />
      <Calendar events={events} />
    </div>
  );
}

export default Schedule;
