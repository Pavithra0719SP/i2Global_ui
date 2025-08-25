import React, { useState } from "react";
import { SignUpProps } from "../interface/interface";
import CommonInput from "@/app/common/components/commonInput";

const Signup: React.FC<SignUpProps> = ({
  formData,
  setFormData,
  setError,
  setMessage,
  handleRegister,
  setShowSignUp,
}) => {
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    await handleRegister(e, formData, setError, setMessage, setShowSignUp);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <CommonInput
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />

      <CommonInput
        type="email"
        name="user_email"
        placeholder="Email"
        value={formData.user_email}
        onChange={handleChange}
        required
      />

      <CommonInput
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />


      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold text-lg transition duration-200"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      <p className="text-center text-gray-400 mt-4">
        Already have an account?{" "}
        <button
          type="button"
          className="text-teal-400 hover:underline"
          onClick={() => setShowSignUp(false)}
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default Signup;
