import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import TopHeader from "./components/TopHeader";
import AppSidebar from "./components/AppSidebar";
import Feed from "./pages/Feed";
import ArticleView from "./pages/ArticleView";
import Profile from "./pages/Profile";
import Write from "./pages/Write";
import Settings from "./pages/Settings";
import Bookmarks from "./pages/Bookmarks";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";

// Shared layout wrapper for main app
const MainLayout = () => (
  <div className="min-h-screen bg-background">
    <TopHeader />
    <AppSidebar />
    <Outlet />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Main app routes inside layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Feed />} />
            <Route path="write" element={<Write />} />
            <Route path="settings" element={<Settings />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="article/:id" element={<ArticleView />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="profile/" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
