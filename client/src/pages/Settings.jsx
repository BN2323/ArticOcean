import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Palette, Camera } from "lucide-react";
import axios from "axios";
import { uploadToCloudinary } from "@/utils/cloudinary";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    bio: "",
    avatarUrl: "",
    location: "",
    website: "",
  });
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(res.data);
        setPreviewUrl(res.data.avatar || ""); // ✅ avatar not avatarUrl
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);

    // Show local preview
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      let finalAvatarUrl = profile.avatar;

      // Only upload if user selected a new file
      if (avatarFile) {
        finalAvatarUrl = await uploadToCloudinary(avatarFile, "avatars");
      }

      const res = await axios.put(
        `${API_BASE}/user`,
        {
          ...profile,
          avatar: finalAvatarUrl, // ✅ match backend field
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProfile(res.data.user);
      setMessage("Profile updated successfully.");
      setAvatarFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your Deep account preferences</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="xl:col-span-1 hidden xl:block">
            <Card className="p-4 border-border">
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start bg-accent text-accent-foreground">
                  <User size={16} className="mr-2" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell size={16} className="mr-2" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield size={16} className="mr-2" />
                  Privacy
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Palette size={16} className="mr-2" />
                  Appearance
                </Button>
              </div>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Profile Card */}
            <Card className="p-6 border-border">
              <div className="flex items-center space-x-2 mb-4">
                <User size={20} />
                <h2 className="text-xl font-semibold text-foreground">Profile Settings</h2>
              </div>

              <div className="space-y-4">
                {/* Avatar Preview */}
                <div>
                  <Label>Avatar</Label>
                  <div className="relative w-24 h-24 mt-2">
                    <label htmlFor="avatar-upload" className="cursor-pointer group">
                      <img
                        src={previewUrl || "/placeholder.png"}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border border-border transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity">
                        <Camera className="text-white" size={20} />
                      </div>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </div>
                </div>

                {/* Inputs */}
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={profile.name} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={profile.username} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" value={profile.bio} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={profile.location} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" value={profile.website} onChange={handleChange} />
                </div>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-6 border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Bell size={20} />
                <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </Card>

            {/* Privacy */}
            <Card className="p-6 border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Shield size={20} />
                <h2 className="text-xl font-semibold text-foreground">Privacy & Security</h2>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Public Profile</Label>
                  <p className="text-xs text-muted-foreground">Make your profile visible to everyone</p>
                </div>
                <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
              </div>
            </Card>

            {/* Appearance */}
            <Card className="p-6 border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Palette size={20} />
                <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">Switch to dark theme</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-between items-center">
              {message && <span className="text-sm text-muted-foreground">{message}</span>}
              <Button
                onClick={handleSave}
                className="gradient-primary text-primary-foreground shadow-elegant"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
