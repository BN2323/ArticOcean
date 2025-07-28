// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Separator } from "@/components/ui/separator";
// import { useState } from "react";
// import { User, Bell, Shield, Palette } from "lucide-react";

// const Settings = () => {
//   const [notifications, setNotifications] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);
//   const [publicProfile, setPublicProfile] = useState(true);

//   return (
//     <div className="min-h-screen bg-gradient-subtle">
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
//           <p className="text-muted-foreground">Manage your Deep account preferences</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Settings Navigation */}
//           <div className="lg:col-span-1">
//             <Card className="p-4 border-border">
//               <div className="space-y-2">
//                 <Button variant="ghost" className="w-full justify-start bg-accent text-accent-foreground">
//                   <User size={16} className="mr-2" />
//                   Profile
//                 </Button>
//                 <Button variant="ghost" className="w-full justify-start">
//                   <Bell size={16} className="mr-2" />
//                   Notifications
//                 </Button>
//                 <Button variant="ghost" className="w-full justify-start">
//                   <Shield size={16} className="mr-2" />
//                   Privacy
//                 </Button>
//                 <Button variant="ghost" className="w-full justify-start">
//                   <Palette size={16} className="mr-2" />
//                   Appearance
//                 </Button>
//               </div>
//             </Card>
//           </div>

//           {/* Settings Content */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Profile Settings */}
//             <Card className="p-6 border-border">
//               <div className="flex items-center space-x-2 mb-4">
//                 <User size={20} />
//                 <h2 className="text-xl font-semibold text-foreground">Profile Settings</h2>
//               </div>
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
//                       First Name
//                     </Label>
//                     <Input id="firstName" placeholder="John" className="mt-1" />
//                   </div>
//                   <div>
//                     <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
//                       Last Name
//                     </Label>
//                     <Input id="lastName" placeholder="Doe" className="mt-1" />
//                   </div>
//                 </div>
//                 <div>
//                   <Label htmlFor="username" className="text-sm font-medium text-foreground">
//                     Username
//                   </Label>
//                   <Input id="username" placeholder="@johndoe" className="mt-1" />
//                 </div>
//                 <div>
//                   <Label htmlFor="bio" className="text-sm font-medium text-foreground">
//                     Bio
//                   </Label>
//                   <Input id="bio" placeholder="Tell us about yourself..." className="mt-1" />
//                 </div>
//               </div>
//             </Card>

//             {/* Notification Settings */}
//             <Card className="p-6 border-border">
//               <div className="flex items-center space-x-2 mb-4">
//                 <Bell size={20} />
//                 <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
//               </div>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <Label className="text-sm font-medium text-foreground">Email Notifications</Label>
//                     <p className="text-xs text-muted-foreground">Receive notifications via email</p>
//                   </div>
//                   <Switch checked={notifications} onCheckedChange={setNotifications} />
//                 </div>
//                 <Separator />
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <Label className="text-sm font-medium text-foreground">Push Notifications</Label>
//                     <p className="text-xs text-muted-foreground">Get notified about new articles and comments</p>
//                   </div>
//                   <Switch defaultChecked />
//                 </div>
//               </div>
//             </Card>

//             {/* Privacy Settings */}
//             <Card className="p-6 border-border">
//               <div className="flex items-center space-x-2 mb-4">
//                 <Shield size={20} />
//                 <h2 className="text-xl font-semibold text-foreground">Privacy & Security</h2>
//               </div>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <Label className="text-sm font-medium text-foreground">Public Profile</Label>
//                     <p className="text-xs text-muted-foreground">Make your profile visible to everyone</p>
//                   </div>
//                   <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
//                 </div>
//                 <Separator />
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <Label className="text-sm font-medium text-foreground">Show Reading History</Label>
//                     <p className="text-xs text-muted-foreground">Allow others to see articles you've read</p>
//                   </div>
//                   <Switch />
//                 </div>
//               </div>
//             </Card>

//             {/* Appearance Settings */}
//             <Card className="p-6 border-border">
//               <div className="flex items-center space-x-2 mb-4">
//                 <Palette size={20} />
//                 <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
//               </div>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <Label className="text-sm font-medium text-foreground">Dark Mode</Label>
//                     <p className="text-xs text-muted-foreground">Switch to dark theme</p>
//                   </div>
//                   <Switch checked={darkMode} onCheckedChange={setDarkMode} />
//                 </div>
//                 <Separator />
//                 <div>
//                   <Label className="text-sm font-medium text-foreground mb-2 block">Language</Label>
//                   <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
//                     <option>English</option>
//                     <option>Spanish</option>
//                     <option>French</option>
//                     <option>German</option>
//                   </select>
//                 </div>
//               </div>
//             </Card>

//             {/* Save Button */}
//             <div className="flex justify-end">
//               <Button className="gradient-primary text-primary-foreground shadow-elegant">
//                 Save Changes
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { User, Bell, Shield, Palette } from "lucide-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    bio: "",
    avatar: "",
    location: "",
    website: "",
  });
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.put(`${API_BASE}/user`, profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setMessage("Profile updated successfully.");
      setProfile(res.data.user); // updated user object
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your Deep account preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
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
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Settings */}
            <Card className="p-6 border-border">
              <div className="flex items-center space-x-2 mb-4">
                <User size={20} />
                <h2 className="text-xl font-semibold text-foreground">Profile Settings</h2>
              </div>
              <div className="space-y-4">
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
                <div>
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input id="avatar" value={profile.avatar} onChange={handleChange} />
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-6 border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Bell size={20} />
                <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </div>
            </Card>

            {/* Privacy */}
            <Card className="p-6 border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Shield size={20} />
                <h2 className="text-xl font-semibold text-foreground">Privacy & Security</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Public Profile</Label>
                    <p className="text-xs text-muted-foreground">Make your profile visible to everyone</p>
                  </div>
                  <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
                </div>
              </div>
            </Card>

            {/* Appearance */}
            <Card className="p-6 border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Palette size={20} />
                <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">Switch to dark theme</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
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
