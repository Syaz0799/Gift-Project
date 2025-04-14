import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";

export default function FormInput({ label, type, placeholder, icon }) {
  const iconMap = {
    email: <FaEnvelope />,
    password: <FaLock />,
    name: <FaUser />,
    phone: <FaPhone />,
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-wrapper">
        <span className="icon">{iconMap[icon]}</span>
        <input type={type} placeholder={placeholder} />
      </div>
    </div>
  );
}