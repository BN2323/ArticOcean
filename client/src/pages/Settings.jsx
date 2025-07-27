import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { User, Bell, Shield, Palette } from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                      First Name
                    </Label>
                    <Input id="firstName" placeholder="John" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                      Last Name
                    </Label>
                    <Input id="lastName" placeholder="Doe" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="username" className="text-sm font-medium text-foreground">
                    Username
                  </Label>
                  <Input id="username" placeholder="@johndoe" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-sm font-medium text-foreground">
                    Bio
                  </Label>
                  <Input id="bio" placeholder="Tell us about yourself..." className="mt-1" />
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
                    <Label className="text-sm font-medium text-foreground">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Get notified about new articles and comments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            {/* Privacy Settings */}
            <Card className="p-6 border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Shield size={20} />
                <h2 className="text-xl font-semibold text-foreground">Privacy & Security</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Public Profile</Label>
                    <p className="text-xs text-muted-foreground">Make your profile visible to everyone</p>
                  </div>
                  <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Show Reading History</Label>
                    <p className="text-xs text-muted-foreground">Allow others to see articles you've read</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            {/* Appearance Settings */}
            <Card className="p-6 border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Palette size={20} />
                <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">Switch to dark theme</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <Separator />
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">Language</Label>
                  <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button className="gradient-primary text-primary-foreground shadow-elegant">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
