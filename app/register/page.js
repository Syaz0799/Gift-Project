import Link from "next/link";
import FormInput from "../../components/FormInput";
import "./Register.css";

export default function Register() {
  return (
    <div className="register-container">
      {/* Left: Form */}
      <div className="register-form-container">
        <div className="register-form">
          <h1>Register</h1>
          <FormInput
            label="Name"
            type="text"
            placeholder="Enter your first name"
            icon="name"
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon="email"
          />
          <FormInput
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            icon="phone"
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Create a password"
            icon="password"
          />
          <p className="hint">Must be at least 8 characters.</p>
          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            icon="password"
          />
          <button className="register-button">Create account</button>
          <p className="login-link">
            Already have an account? <Link href="/login">Log In</Link>
          </p>
        </div>
      </div>

      {/* Right: Welcome Section */}
      <div className="login-image">
          <div className="overlay"></div>
          <div className="text-container">
            <h2 className="text-white">Welcome Here</h2>
            <p className="text-white small-text">
              Create an account
            </p>
          </div>
        </div>
    </div>
  );
}