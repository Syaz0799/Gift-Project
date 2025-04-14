
'use client';

import { useState } from "react";
import Link from "next/link";
import FormInput from "../../components/FormInput";
import ResetPassword from "../../components/ResetPassword"; // Import the Reset Password component
import "./Login.css";

export default function Login() {
  // Step 2.1: Add state to toggle the popup modal
  const [showResetPassword, setShowResetPassword] = useState(false);

  // Function to open the popup modal
  const openResetPasswordPopup = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setShowResetPassword(true); // Show the reset password modal
  };

  // Function to close the popup modal
  const closeResetPasswordPopup = () => {
    setShowResetPassword(false); // Close the modal
  };

  return (
    <div className="center-container bg-gray">
      <div className="login-container">
        {/* Left: Form */}
        <div className="login-form-container">
          <div className="login-form">
            <h1>Log In</h1>
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email address"
              icon="email"
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon="password"
            />
            <div className="checkbox-container">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              {/* Step 2.2: Change the Forgot Password link to open the popup */}
              <a
                href="#"
                className="forgot-password-link"
                onClick={openResetPasswordPopup}
              >
                Forgot Password
              </a>
            </div>
            <button className="login-button">Log In</button>
            <button className="google-button">
              <img src="image/gmail.jpeg" alt="Google" className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
            <p className="signup-link">
              Don’t have an account? <Link href="/register">Sign Up</Link>
            </p>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="login-image">
          <div className="overlay"></div>
          <div className="text-container">
            <h2 className="text-white">Welcome Here</h2>
            <p className="text-white small-text">
              Access your personal account by logging in
            </p>
          </div>
        </div>
      </div>

      {/* Step 2.3: Conditionally render the Reset Password modal */}
      {showResetPassword && (
        <ResetPassword onClose={closeResetPasswordPopup} />
      )}
    </div>
  );
}
