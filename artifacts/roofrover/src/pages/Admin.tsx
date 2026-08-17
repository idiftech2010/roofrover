import { useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";

// Admin authentication supports both username/password and PIN methods
// Credentials stored locally in localStorage

export default function Admin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authMethod, setAuthMethod] = useState<"username" | "pin">("username");
  const [error, setError] = useState<string | null>(null);
  const [isSettingUpCredentials, setIsSettingUpCredentials] = useState<boolean>(
    !localStorage.getItem("admin_username") && !localStorage.getItem("admin_pin")
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (authMethod === "username") {
      const storedUsername = localStorage.getItem("admin_username");
      const storedPassword = localStorage.getItem("admin_password");
      
      if (!storedUsername || !storedPassword) {
        setError("Username/password not configured. Please set credentials first.");
        return;
      }
      
      if (username === storedUsername && password === storedPassword) {
        localStorage.setItem("admin_token", "portal_authenticated");
        localStorage.setItem("admin_auth_method", "username");
        setLocation("/admin/dashboard");
        return;
      }
      setError("Invalid username or password");
      return;
    }

    if (authMethod === "pin") {
      const storedPin = localStorage.getItem("admin_pin");
      
      if (!storedPin) {
        setError("PIN not configured. Please set a PIN first.");
        return;
      }
      
      if (password === storedPin) {
        localStorage.setItem("admin_token", "portal_authenticated");
        localStorage.setItem("admin_auth_method", "pin");
        setLocation("/admin/dashboard");
        return;
      }
      setError("Invalid PIN");
      return;
    }
  }

  function setupCredentials() {
    if (authMethod === "username") {
      if (!username || !password) {
        setError("Username and password are required");
        return;
      }
      if (username.length < 3) {
        setError("Username must be at least 3 characters");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      
      const confirmPassword = prompt("Confirm password:") || "";
      if (confirmPassword !== password) {
        setError("Passwords do not match");
        return;
      }
      
      localStorage.setItem("admin_username", username);
      localStorage.setItem("admin_password", password);
      setError(null);
      setUsername("");
      setPassword("");
      alert("Username and password saved successfully!");
      setIsSettingUpCredentials(false);
      return;
    }

    if (authMethod === "pin") {
      if (!password || password.length < 4) {
        setError("PIN must be at least 4 digits");
        return;
      }
      
      const confirmPin = prompt("Confirm PIN:") || "";
      if (confirmPin !== password) {
        setError("PINs do not match");
        return;
      }
      
      localStorage.setItem("admin_pin", password);
      setError(null);
      setPassword("");
      alert("PIN saved successfully!");
      setIsSettingUpCredentials(false);
      return;
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#282828]">
      <Navbar />
      <main className="container mx-auto px-6 md:px-12 py-20">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold mb-2">Admin Login</h1>
          <p className="text-sm text-gray-600 mb-6">Sign in to access the Portal Management dashboard.</p>

          {error && <div className="bg-red-50 text-red-600 border border-red-200 rounded-md p-3 mb-4 text-sm">{error}</div>}

          {/* Authentication Method Toggle */}
          <div className="mb-6 flex gap-2 border border-gray-200 rounded-lg p-1 bg-gray-50">
            <button
              type="button"
              onClick={() => setAuthMethod("username")}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition ${
                authMethod === "username"
                  ? "bg-[#2D3E4A] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Username
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod("pin")}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition ${
                authMethod === "pin"
                  ? "bg-[#2D3E4A] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              PIN
            </button>
          </div>

          {isSettingUpCredentials ? (
            // Setup Mode
            <div className="flex flex-col gap-4">
              {authMethod === "username" ? (
                <>
                  <label className="text-sm">
                    <span className="font-medium">Username</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter admin username"
                      className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="font-medium">Password</span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </label>
                </>
              ) : (
                <label className="text-sm">
                  <span className="font-medium">Set PIN (4+ digits)</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter 4+ digit PIN"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </label>
              )}
              <button
                type="button"
                onClick={setupCredentials}
                className="w-full py-2 bg-[#2D3E4A] text-white rounded-md hover:bg-[#1f2e39] transition font-medium"
              >
                {authMethod === "username" ? "Set Username & Password" : "Set PIN"}
              </button>
            </div>
          ) : (
            // Login Mode
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {authMethod === "username" ? (
                <>
                  <label className="text-sm">
                    <span className="font-medium">Username</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </label>
                  <label className="text-sm">
                    <span className="font-medium">Password</span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </label>
                </>
              ) : (
                <label className="text-sm">
                  <span className="font-medium">PIN</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your PIN"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    autoComplete="one-time-code"
                  />
                </label>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-[#2D3E4A] text-white rounded-md hover:bg-[#1f2e39] transition font-medium"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSettingUpCredentials(true)}
                className="text-xs text-[#D4AF37] hover:text-[#2D3E4A] transition"
              >
                Reset credentials
              </button>
            </form>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-700">
            <strong>Setup Required:</strong> On first visit, choose your authentication method and set your credentials. You can switch between username/password and PIN login anytime.
          </div>
        </div>
      </main>
    </div>
  );
}
