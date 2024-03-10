import React from "react";

const TextInput = ({ className,label, placeholder, value, onChange, required }) => {
	return (
		<div>
			<label className="block text-gray-700 text-xl font-bold mb-2">
				{label} {required && <span className="text-[#E90000]">*</span>}
			</label>
			<input
				type="text"
				className={className}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
            />
            
          
		</div>
	);
};

export default TextInput;
