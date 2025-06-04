import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Chat/Sidebar";
import ChatContainer from "../components/Chat/ChatContainer";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import AuthButtons from "@/components/AuthButtons";

const GroupChatPage = () => {
  const { user, fetchUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem("access"));
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access"));
    async function fetchData() {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    }
    if (isLoggedIn) fetchData();
  }, [fetchUser, isLoggedIn]);

  useEffect(() => {
    if (!loading && (!user || !isLoggedIn)) {
      navigate("/"); // redirect to home if not authenticated
    }
  }, [user, loading, isLoggedIn, navigate]);

  if (loading) return null;

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <Navigation />
        <div className="bg-white p-8 rounded shadow mt-24 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to access Group Chat</h2>
          <p className="mb-6 text-gray-600">You need to be logged in to join the group chat. Please sign up or log in below.</p>
          <AuthButtons onUserCreated={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100vh] bg-gradient-to-br from-blue-50 to-gray-100">
      <Navigation />
      <main className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar />
        <section className="flex flex-col flex-1">
          <ChatContainer />
        </section>
      </main>
    </div>
  );
};

export default GroupChatPage;
