import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
const IsEmailVerify = () => {
    const location = useLocation();

const email =
  location.state?.email ||
  sessionStorage.getItem("verificationEmail");

useEffect(() => {
  if (location.state?.email) {
    sessionStorage.setItem(
      "verificationEmail",
      location.state.email
    );
  }
}, [location.state?.email]);

console.log(email);

  return (
    <div>IsEmailVerify</div>
  )
}

export default IsEmailVerify