import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const FakeLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here, you can simulate a login process
    if (username === "user" && password === "password") {
      // Redirect to the /user route after successful login
      navigate("/dashboard/users");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            placeholder="Username: user"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            placeholder="Password: password"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default FakeLogin;
