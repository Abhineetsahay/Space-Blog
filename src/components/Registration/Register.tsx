import React from "react";
import { useForm } from "react-hook-form";
import { auth, googleProvider } from "../../firebase/Firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";
import axios from "axios";

interface FormData {
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationProps {
  toggleAuth: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ toggleAuth }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const url = process.env.REACT_APP_BACKENDURL;
  const handleRegister = async (data: FormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const testingINPROD = await axios.post(`${url}addUser`, {
        username: data.username,
        email: data.email,
      });
      console.log(testingINPROD);
      localStorage.setItem("name", data.username);
      navigate("/dashboard/blogs");
      toast.success("User Created Successfully");
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.code);
      console.log(error);
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      const t = await axios.post(`${url}addUser`, {
        username: data.user.displayName,
        email: data.user.email,
      });
      console.log(t);

      localStorage.setItem("name", data.user.displayName || "");
      navigate("/dashboard/blogs");
      toast.success("Signed in with Google successfully");
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.code);
      console.log(error);
      toast.error(errorMessage);
    }
  };

  const getErrorMessage = (code: string): string => {
    switch (code) {
      case "auth/email-already-in-use":
        return "The email address is already in use. Please use a different email.";
      case "auth/invalid-email":
        return "The email address is not valid. Please enter a valid email.";
      case "auth/weak-password":
        return "The password is too weak. Please choose a stronger password.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  return (
    <div className="min-h-screen relative z-10 py-3 flex items-center justify-center ">
      <div className="bg-blue-50 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Create Your Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Phone number"
              className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d+$/,
                  message: "Please enter a valid phone number (digits only)",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            CREATE ACCOUNT
          </button>

          <div className="relative my-4 text-center">
            <span className="text-gray-500">or</span>
          </div>

          <button
            type="button"
            className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle /> Sign in with Google
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={toggleAuth}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
