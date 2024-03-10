import makeApiCall from "@/utils/makeApiCall";
import React, { useState, useEffect } from "react";

const AppointmentForm = ({ doctorId, patientId, setIsModal1Open }) => {
  const [date, setDate] = useState("");
  const [issue, setIssue] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    setIsFormValid(date !== "" && selectedSlot !== "" && issue !== "");
  }, [date, selectedSlot, issue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    async function helper(start, color, title, doctorId, patientId) {
      try {
        let response = await makeApiCall(
          "POST",
          "/appointment/book-appointment",
          { start, color, title, doctorId, patientId }
        );
        //console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    //console.log({ date, selectedSlot, issue });
    // Clear the form after submission
    let start = date,
      color,
      title = issue;
    switch (selectedSlot) {
      case "slot1": {
        start = start + "T" + "12:00:00";
        color = "green";
        break;
      }
      case "slot2": {
        start = start + "T" + "13:00:00";
        color = "red";
        break;
      }
      case "slot3": {
        start = start + "T" + "14:00:00";
        color = "blue";
        break;
      }
      case "slot4": {
        start = start + "T" + "15:00:00";
        color = "yellow";
        break;
      }
      case "slot5": {
        start = start + "T" + "16:00:00";
        color = "purple";
        break;
      }
    }
    //console.log({ start, color, title, doctorId, patientId });

    helper(start, color, title, doctorId, patientId);
    setDate("");
    setIssue("");
    setSelectedSlot("");
    setIsModal1Open(false);
  };

  return (
    <div className=" p-2 ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label
            htmlFor="slot"
            className="block text-sm font-medium text-gray-700"
          >
            Slot
          </label>
          <select
            id="slot"
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          >
            <option value="">Select</option>
            <option value="slot1">Slot 1</option>
            <option value="slot2">Slot 2</option>
            <option value="slot3">Slot 3</option>
            <option value="slot4">Slot 4</option>
            <option value="slot5">Slot 5</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="issue"
            className="block text-sm font-medium text-gray-700"
          >
            Give Short Description of your issue
          </label>
          <textarea
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            rows="3"
            required
            placeholder="Enter desc here"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`${
            isFormValid
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-300 cursor-not-allowed"
          } text-white px-4 py-2 rounded-md shadow-md w-full`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
