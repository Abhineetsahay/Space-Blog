import React from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/Firebase';
import toast from 'react-hot-toast';
import {jwtDecode} from 'jwt-decode'; 
import { FaEnvelope ,FaLock,FaGoogle} from 'react-icons/fa';
interface Login1Props {
  toggleAuth: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const Login1: React.FC<Login1Props> = ({ toggleAuth }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const t = await signInWithEmailAndPassword(auth, data.email, data.password);
      const idToken = await t.user.getIdToken();
      console.log(idToken);
      const res = jwtDecode(idToken);
      console.log(res);
      
      toast.success('Login Successfully');
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.code);
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      console.log(idToken);
      const res = jwtDecode(idToken);
      console.log(res);
      
      toast.success('Logged in with Google');
    } catch (error: any) {
      toast.error('Google Sign-in Failed');
      console.error(error);
    }
  };

  const getErrorMessage = (code: string): string => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'The email address is already in use. Please use a different email.';
      case 'auth/invalid-email':
        return 'The email address is not valid. Please enter a valid email.';
      case 'auth/weak-password':
        return 'The password is too weak. Please choose a stronger password.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-blue-50 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">Login to your Account</h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Select method to log in:
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className='relative'>
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className='relative'>
           <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            LOG IN
          </button>

          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">OR</span>
          </div>

          <button
            type="button"
            className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={toggleAuth}
            >
              Create an account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login1;
