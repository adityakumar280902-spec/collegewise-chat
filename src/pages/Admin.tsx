import { useState } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="border p-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 ml-2">
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <AdminDashboard />
    </div>
  );
};

export default Admin;
