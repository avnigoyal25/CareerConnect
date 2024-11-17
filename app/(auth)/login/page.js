"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const router = useRouter();
  const { register, handleSubmit, setError, reset } = useForm();
  const [isSignup, setIsSignup] = useState(false); // Initial state for toggling forms

  const handleFormSubmit = async (data) => {
    if (isSignup && data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
      return;
    }

    try {
      const success = true; // Mock API response
      if (success) {
        toast.success(
          isSignup
            ? "Account created successfully!"
            : "Logged in successfully!"
        );
        localStorage.setItem("token", "mock-token");
        reset();
        router.push("/dashboard");
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden items-center justify-center">
      
      {/* Left Panel */}
      <motion.div
        className={`absolute top-0 left-0 h-full ${isSignup ? "w-1/2 bg-white" : "w-1/2 bg-gradient-to-br from-blue-500 to-green-400"
          } transition-all duration-500 flex flex-col justify-center items-center p-8`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isSignup ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full"
            >
              <div className="mb-4">
                <img
                  src="/assets/images/logo.png"
                  alt="Logo"
                  className="h-20 w-auto mx-auto"
                />
              </div>
              <h2 className="text-2xl font-bold text-center mb-6">
                Sign Up
              </h2>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </form>
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white">Hello, Friend!</h1>
            <p className="mt-4 text-white">
              Enter your details and start your journey with us.
            </p>
            <motion.button
              onClick={() => setIsSignup(true)}
              className="mt-6 bg-white text-green-500 px-6 py-2 rounded-lg shadow-md font-semibold hover:bg-gray-200 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </>
        )}
      </motion.div>

      {/* Right Panel */}
      <motion.div
        className={`absolute top-0 right-0 h-full ${isSignup ? "w-1/2 bg-gradient-to-br from-blue-500 to-green-400" : "w-1/2 bg-white"
          } transition-all duration-500 p-8 flex items-center justify-center`}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignup ? "signup-right-panel" : "login-right-panel"}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md w-full"
          >
            <div className="mb-4">
                <img
                  src="/assets/images/logo.png"
                  alt="Logo"
                  className="h-20 w-auto mx-auto"
                />
              </div>
            
            {!isSignup ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-green-400">Sign in to CareerConnect</h2>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
                <p className="mt-4 text-white">
                  Sign in to continue your journey.
                </p>
                <motion.button
                  onClick={() => setIsSignup(false)}
                  className="mt-6 bg-white text-green-500 px-6 py-2 rounded-lg shadow-md font-semibold hover:bg-gray-200 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
