import { useEffect, useState } from "react";
import TextInput from "../../Components/TextInput";
import GuestLayout from "../Layouts/GuestLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import PrimaryButton from "../../Components/PrimaryButton";

const Register = () => {

  const { errors } = usePage().props;
  const [data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    contact_number: '',
    role: ''
  });
  const [selectedRole, setSelectedRole] = useState('Crew');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    setData({
      ...data,
      ['role']: selectedRole,
    });
  }, [selectedRole]);

  const handleRegister = (e) => {
    e.preventDefault();

    router.post('/register', data);
  }

  return (
    <GuestLayout>
      <Head title="Register Account" />
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="w-full md:w-1/2 p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
              <p className="text-gray-600 mt-2">Join our platform to access exclusive features</p>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <TextInput
                    id="fname"
                    type="text"
                    name="fname"
                    title="First Name"
                    placeholder="Enter your first name"
                    value={data.fname}
                    onChange={handleChange}
                    errorMessage={errors.fname}
                  />
                </div>
                <div>
                  <TextInput
                    id="lname"
                    type="text"
                    name="lname"
                    title="Last Name"
                    placeholder="Enter your last name"
                    value={data.lname}
                    onChange={handleChange}
                    errorMessage={errors.lname}
                  />
                </div>
              </div>

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
                <p className="mt-1 text-xs text-gray-500">At least 8 characters with numbers and symbols</p>
              </div>

              <div>
                <TextInput
                  id="contact_number"
                  type="text"
                  name="contact_number"
                  title="Contact Number"
                  placeholder="+1 (123) 456-7890"
                  value={data.contact_number}
                  onChange={handleChange}
                  errorMessage={errors.contact_number}
                />
              </div>

              <div>
                <div className="relative">
                  <input 
                    className="radio-input absolute opacity-0 w-0 h-0" 
                    type="radio" 
                    id="crew" 
                    name="role" 
                    value="Crew"
                    checked={selectedRole === 'Crew'} 
                    onChange={() => setSelectedRole('Crew')}
                  />
                  <label 
                    className="radio-label block px-4 py-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300"
                    for="crew"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414l-.793.793V8a1 1 0 01-2 0v1.086l-.793-.793a1 1 0 10-1.414 1.414L10 11.414l1.293-1.293a1 1 0 001.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <span className="block font-medium text-gray-900">Race Crew</span>
                        <span className="block text-sm text-gray-500">Be a race crew</span>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="relative mt-2">
                  <input 
                    className="radio-input absolute opacity-0 w-0 h-0" 
                    type="radio" 
                    id="coordinator" 
                    name="role" 
                    value="Coordinator"
                    checked={selectedRole === 'Coordinator'} 
                    onChange={() => setSelectedRole('Coordinator')}
                  />
                  <label 
                    className="radio-label block px-4 py-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300"
                    for="coordinator"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414l-.793.793V8a1 1 0 01-2 0v1.086l-.793-.793a1 1 0 10-1.414 1.414L10 11.414l1.293-1.293a1 1 0 001.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <span className="block font-medium text-gray-900">Race Coordinator</span>
                        <span className="block text-sm text-gray-500">Be a race coordinator</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                </label>
              </div>

              <PrimaryButton className="w-full">
                Create Account
              </PrimaryButton>

              <p className="text-center text-sm text-gray-600">Already have an account? <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign in</Link></p>
            </form>
          </div>

          <div className="md:block md:w-1/2 bg-indigo-50 p-10 flex flex-col justify-center">
            <div className="relative h-full rounded-lg overflow-hidden">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b49e6277-c453-4283-b4b4-f5ce12ec1680.png"
                alt="Modern dashboard interface showing analytics charts, user statistics, and notification alerts on a light background with blue accent colors"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/50 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">Professional Dashboard Control Panel</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-300 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Real-time analytics and reporting
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-300 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Customizable user dashboards
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-300 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Role-based access control
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-300 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 dedicated support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}

export default Register;