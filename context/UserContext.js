"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [pointsBalance, setPointsBalance] = useState(10000); // Initial balance: 2,500 points
  const [pendingRedemption, setPendingRedemption] = useState(null); // Track pending redemption

  // Load points balance from localStorage on mount
  useEffect(() => {
    const storedPoints = localStorage.getItem("pointsBalance");
    if (storedPoints) {
      setPointsBalance(parseInt(storedPoints, 10));
    }
  }, []);

  // Load pending redemption from localStorage on mount
  useEffect(() => {
    const storedRedemption = localStorage.getItem("pendingRedemption");
    if (storedRedemption) {
      setPendingRedemption(JSON.parse(storedRedemption));
    }
  }, []);

  // Save points balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pointsBalance", pointsBalance.toString());
  }, [pointsBalance]);

  // Save pending redemption to localStorage whenever it changes
  useEffect(() => {
    if (pendingRedemption) {
      localStorage.setItem("pendingRedemption", JSON.stringify(pendingRedemption));
    } else {
      localStorage.removeItem("pendingRedemption");
    }
  }, [pendingRedemption]);

  // Function to deduct points
  const deductPoints = (amount) => {
    if (pointsBalance >= amount) {
      setPointsBalance((prevBalance) => prevBalance - amount);
      return true; // Successfully deducted points
    }
    return false; // Not enough points
  };

  // Function to reset points to a default value (e.g., 2,500)
  const resetPoints = () => {
    setPointsBalance(2500); // Reset to 2,500 points
    localStorage.setItem("pointsBalance", "10000"); // Ensure localStorage is updated
    setPendingRedemption(null); // Clear pending redemption on reset
  };

  // Function to clear pending redemption
  const clearPendingRedemption = () => {
    setPendingRedemption(null);
  };

  return (
    <UserContext.Provider
      value={{
        pointsBalance,
        deductPoints,
        resetPoints,
        pendingRedemption,
        setPendingRedemption,
        clearPendingRedemption,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}