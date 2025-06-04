import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import AuthButtons from "./AuthButtons";
import InterestsForm from "./InterestsForm";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInterestsForm, setShowInterestsForm] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/resources", label: "Resources" },
    { to: "/support", label: "Support" },
    { to: "/groupchat", label: "Group Chat" }, // Add Group Chat to navigation
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleUserCreated = () => {
    setShowInterestsForm(true);
  };

  const handleInterestsComplete = () => {
    setShowInterestsForm(false);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Veterans Bridge</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="items-center hidden space-x-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-medium transition-colors ${
                    isActive(link.to)
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <AuthButtons onUserCreated={handleUserCreated} />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="py-4 border-t border-gray-200 md:hidden">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`font-medium transition-colors ${
                      isActive(link.to)
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <AuthButtons onUserCreated={handleUserCreated} />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Interests Form Modal */}
      {showInterestsForm && (
        <InterestsForm onComplete={handleInterestsComplete} />
      )}
    </>
  );
};

export default Navigation;