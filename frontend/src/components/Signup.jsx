import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { api, setAuthToken } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) return setError("All fields are required.");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      setAuthToken(res.data.token);
      navigate("/thank-you");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm title="Create your Zappycart account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Name" className="p-3 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="p-3 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="p-3 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button disabled={loading} className="bg-red-600 text-white p-3 rounded hover:bg-red-700 transition" type="submit">
          {loading ? "Creating..." : "Sign up"}
        </button>

        <div className="text-center mt-2 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-red-600 font-medium hover:underline">Login</Link>
        </div>
      </form>

      <div className="mt-4">
        <GoogleLoginButton />
      </div>
    </AuthForm>
  );
}
