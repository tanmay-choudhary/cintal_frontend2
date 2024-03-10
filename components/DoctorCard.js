import React from 'react';

const DoctorCard = ({ name, specialisation, availability, onBookAppointment }) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6 space-y-3">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600 text-sm">{specialisation}</p>
      <div className="text-gray-600 text-sm">
        Availability : <span className='font-medium'>{ availability }</span>
      </div>
      <button onClick={onBookAppointment} className="bg-orange-500 text-white px-4 py-1.5 rounded-md shadow-md hover:bg-orange-600">
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
