import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Sign up attempt:", formData);
    // TODO: Send data to backend
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_BASE}/auth/register`, formData);
      const { token, user } = response.data;

      // Save token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to feed
      navigate("/");
      alert("Register successful!");
    } catch (err) {
      console.error("Register failed:", err);
      setError(err.response?.data?.message || "Register failed");
      alert("Regiter failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Join Deep to start writing and sharing articles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value
                  })
                }
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full gradient-primary text-primary-foreground"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              to="/signin"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
