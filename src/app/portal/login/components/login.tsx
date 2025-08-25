"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../../src/app/store/store";
import Signup from "./signupForm";
import { loginUser, registerUser } from "../service/authService";
import LoginForm from "./signInForm";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    user_email: "",
    password: "",
  });

  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((state: RootState) => state.auth);

  console.log("auth", auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        loginUser({
          user_email: formData.user_email,
          password: formData.password,
        })
      );
      router.push("/portal/notes");
    } catch (error: any) {}
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        user_name: formData.fullName,
        user_email: formData.user_email,
        password: formData.password,
      })
    );
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-cyan-900 to-blue-950 text-white">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-teal-600 to-blue-700 justify-center items-center p-8">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-6 leading-snug">
            Shaping Future Minds with Next-Gen Learning.
          </h1>
          <p className="text-white/80 text-lg">
            Join <span className="font-semibold">i2Global School</span> and take
            the first step toward an innovative educational journey.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/10">
          <h2 className="text-3xl font-bold text-center mb-4">
            {showSignUp ? "Create Your Account" : "Login to Your Account"}
          </h2>

          {auth.error && (
            <p className="text-red-400 mt-2 text-center">{auth.error}</p>
          )}
          {auth.message && (
            <p className="text-green-400 mt-2 text-center">{auth.message}</p>
          )}

          {showSignUp ? (
            <Signup
              formData={formData}
              setFormData={setFormData}
              handleRegister={handleRegister}
              setShowSignUp={setShowSignUp}
              error={null}
              setError={() => {}}
              message={""}
              setMessage={() => {}}
            />
          ) : (
            <LoginForm
              formData={formData}
              handleChange={handleChange}
              handleLogin={handleLogin}
              loading={auth.loading}
              switchToRegister={() => setShowSignUp(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
