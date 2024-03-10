import React from "react";

function validateRegistrationForm(name, email, password, role) {
  if (!name || !email || !password || !role) {
    return { error: true, message: "All fields are required." };
  }

  // Validate email using regular expression
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!email.match(emailPattern)) {
    return { error: true, message: "Invalid email address." };
  }

  // Password complexity check (at least 8 characters, including uppercase, lowercase, and digits)
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!password.match(passwordPattern)) {
    return {
      error: true,
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, and numeric characters.",
    };
  }

  // If all validations pass, return null indicating valid input
  return null;
}

export default validateRegistrationForm;
