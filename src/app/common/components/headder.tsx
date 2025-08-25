"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { FaBars, FaInfoCircle, FaStickyNote, FaUser, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IHeaderProps } from "@/app/common/components/interface/headerinterface";
import { logoutUser } from "@/app/portal/login/service/authService";

const Header: React.FC<IHeaderProps> = ({ title = "Keep Notes" }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const auth = useSelector((state: RootState) => state.auth);
  const isLoggedIn = auth.isAuthenticated;

  const menuItems = [
    { id: 1, label: "About", path: "/portal/notes", icon: <FaInfoCircle /> },
    { id: 2, label: "Notes", path: "/portal/notes", icon: <FaStickyNote />, active: true },
    { id: 3, label: "Accounts", path: "/portal/notes", icon: <FaUser /> },
  ];

  const handleMenuClick = (path?: string) => {
    if (path) {
      router.push(path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Professional Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <FaBars className="h-5 w-5" />
            </button>

            {/* Logo/Title */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FaStickyNote className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                  {title}
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {isLoggedIn ? (
                <>
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleMenuClick(item.path)}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${item.active
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                  <div className="w-px h-6 bg-gray-300 mx-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleMenuClick("/")}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <FaUser className="mr-2 h-4 w-4" />
                  Login
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            onClick={toggleMobileMenu}
          />

          {/* Slide-out Menu */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden">

            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 rounded-lg flex items-center justify-center">
                  <FaStickyNote className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="px-6 py-4">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Navigation
                  </div>

                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleMenuClick(item.path)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${item.active
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}

                  <div className="pt-4 mt-6 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 rounded-lg text-left font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="mr-3 h-5 w-5" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-4">
                  <button
                    onClick={() => handleMenuClick("/")}
                    className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <FaUser className="mr-2 h-4 w-4" />
                    Login
                  </button>
                </div>
              )}
            </div>

            {/* User Info (if logged in) */}
            {isLoggedIn && auth.user && (
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <FaUser className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {auth.user.user_name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {auth.user.user_email}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Header;