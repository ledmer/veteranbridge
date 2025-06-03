
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
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">Veterans Bridge</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
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
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
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