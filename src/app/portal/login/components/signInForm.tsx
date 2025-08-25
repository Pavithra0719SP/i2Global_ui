import CommonButton from "@/app/common/components/commonButton";
import CommonInput from "@/app/common/components/commonInput";
import React from "react";

interface Props {
  formData: {
    user_email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent) => void;
  loading: boolean;
  switchToRegister: () => void;
}

const LoginForm = ({
  formData,
  handleChange,
  handleLogin,
  loading,
  switchToRegister,
}: Props) => (
  <form onSubmit={handleLogin} className="mt-6 space-y-4">
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

    <div className="flex justify-center gap-3">
      <CommonButton
        type="submit"
        label={loading ? "Logging in..." : "Login"}
        disabled={loading}
      />

      <CommonButton
        type="button"
        label="Register"
        variant="secondary"
        onClick={switchToRegister}
      />
    </div>
  </form>
);

export default LoginForm;
