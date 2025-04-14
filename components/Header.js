"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.css";
import { useUser } from "../context/UserContext"; // Import useUser to access pointsBalance

export default function Header() {
  const pathname = usePathname();
  const { pointsBalance } = useUser(); // Access the dynamic points balance

  // Show points balance on specific pages
  const showPointsBalance =
    pathname === "/home" ||
    pathname === "/shop" ||
    pathname.startsWith("/product/") ||
    pathname === "/cart";

  // Placeholder logout function (you can replace this with actual logout logic)
  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here, e.g., clearing session, redirecting, etc.
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/home" className="logo">
          Optima Loyalty
        </Link>
        <nav className="nav">
          <Link href="/home">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <div className="user-actions">
          <Link href="/cart" className="cart-icon">
              🛒
            </Link>
            {showPointsBalance && (
              <span className="points-balance">
                Points Balance: {pointsBalance.toLocaleString()}
              </span>
            )}
            <Link href="/account" className="account-profile">
              Georgia Eastman
            </Link>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}