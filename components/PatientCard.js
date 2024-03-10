import React from "react";

const PatientCard = ({
  name,
  patientId,
  age,
  height,
  weight,
  bloodGroup,
  issue,
  image,
}) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-4  flex items-start">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{name}</h2>
        <div className="text-gray-600 text-sm">
          Patient ID : <span className="font-medium">{patientId}</span>
        </div>
        <div className="text-gray-600 text-sm">
          Age : <span className="font-medium">{age}</span>
        </div>
        <div className="text-gray-600 text-sm">
          Height : <span className="font-medium">{height}</span>
        </div>
        <div className="text-gray-600 text-sm">
          Weight : <span className="font-medium">{weight}</span>
        </div>
        <div className="text-gray-600 text-sm">
          Blood Group : <span className="font-medium">{bloodGroup}</span>
        </div>
      </div>

      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded ml-auto object-cover"
      />
    </div>
  );
};

export default PatientCard;
