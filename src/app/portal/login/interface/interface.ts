export interface SignUpProps {
  formData: {
    fullName: string;
    user_email: string;
    password: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      user_email: string;
      password: string;
    }>
  >;
  error: string | null;
  setError: (error: string | null) => void;
  message: string;
  setMessage: (message: string) => void;
  handleRegister: (
    event: React.FormEvent,
    formData: {
      fullName: string;
      user_email: string;
      password: string;
    },
    setError: (error: string | null) => void,
    setMessage: (message: string) => void,
    setShowSignUp: (show: boolean) => void
  ) => void;
  setShowSignUp: (show: boolean) => void;
}
