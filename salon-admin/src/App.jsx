import React, { useState } from "react";
// Agar Login.jsx direct components folder mein hai:
import Login from './Component/Login/Login.jsx';
import "./App.css";
import DashboardShell from "./Component/Dashboard/DashboardShell.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // ⚠️ YEH FUNCTION MISSING HOGA, ISEY YAHAN ADD KIJIYE:
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <DashboardShell onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;