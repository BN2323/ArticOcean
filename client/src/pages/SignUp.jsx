import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import your Cloudinary upload helper
import { uploadToCloudinary } from "../utils/cloudinary";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(""); // Cloudinary URL here
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const fileInputRef = useRef(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); // show local preview immediately
      try {
        setUploadingAvatar(true);
        const uploadedUrl = await uploadToCloudinary(file, "avatars"); // upload file to Cloudinary
        setAvatarUrl(uploadedUrl); // save Cloudinary URL
      } catch (error) {
        alert("Failed to upload avatar image. Please try again.");
        setAvatarFile(null);
        setAvatarPreview(null);
        setAvatarUrl("");
      } finally {
        setUploadingAvatar(false);
      }
    } else {
      alert("Please select a valid image file.");
    }
  };

  const clearAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setAvatarUrl("");
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (uploadingAvatar) {
      alert("Please wait for avatar upload to complete.");
      return;
    }

    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        username: formData.username,
        avatar: avatarUrl, // send Cloudinary avatar URL here
      };

      const response = await axios.post(`${API_BASE}/auth/register`, dataToSend);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Register successful!");
      navigate("/");
    } catch (err) {
      console.error("Register failed:", err);
      alert(err.response?.data?.message || "Register failed. Please try again.");
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
            {/* Credentials inputs */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            {/* Username and avatar */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="avatar">
                Avatar
              </Label>
              <div
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files.length)
                    onFileChange({ target: { files: e.dataTransfer.files } });
                }}
                onDragOver={(e) => e.preventDefault()}
                className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors"
                style={{ minHeight: "140px" }}
              >
                {!avatarPreview && (
                  <p className="text-center">
                    Click or drag & drop an image <br />
                    (Max size: 5MB)
                  </p>
                )}

                {avatarPreview && (
                  <div className="relative">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="rounded-full w-32 h-32 object-cover mx-auto"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearAvatar();
                      }}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs hover:bg-red-700"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                )}

                {uploadingAvatar && (
                  <p className="mt-2 text-center text-sm text-blue-600">
                    Uploading avatar...
                  </p>
                )}
              </div>

              <input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={onFileChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary text-primary-foreground"
              disabled={uploadingAvatar}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
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
