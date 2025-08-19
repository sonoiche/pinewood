import React, { useState } from 'react';
import TextInput from '../../Components/TextInput';
import PrimaryButton from '../../Components/PrimaryButton';
import GuestLayout from '../Layouts/GuestLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

const Login = () => {

  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <GuestLayout>
      <Head title="Log In" />
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="w-full md:w-1/2 p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Please log in to your account</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  title="Email Address"
                  placeholder="Enter your email address"
                  value={data.email}
                  onChange={handleChange}
                  errorMessage={errors.email}
                />
              </div>

              <div>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  title="Password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={handleChange}
                  errorMessage={errors.password}
                />
              </div>

              <div className="flex items-center">
                <input id="remember" name="remember" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember Me
                </label>
              </div>

              <PrimaryButton className="w-full" disabled={processing}>
                Login
              </PrimaryButton>

              <p className="text-center text-sm text-gray-600">
                <Link href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">Forgot Password?</Link>
              </p>

              <p className="text-center text-sm text-gray-600">Don't have an account? <Link href="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</Link></p>
            </form>
          </div>

          <div className="md:block md:w-1/2 bg-indigo-50 p-10 flex flex-col justify-center">
            <div className="relative h-full rounded-lg overflow-hidden">
              <img src="https://placehold.co/1920x1080" alt="Login interface with user credentials input fields and a modern design" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/50 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">Secure Your Account</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-300 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Easy access to your dashboard
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-300 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Secure login with encryption
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-300 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Access from any device
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-300 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 customer support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Login;