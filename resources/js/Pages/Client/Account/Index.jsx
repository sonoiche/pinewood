import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TextInput from "../../../Components/TextInput";
import PrimaryButton from "../../../Components/PrimaryButton";

const AccountIndex = () => {

  const { auth } = usePage().props;
  const { data, setData, put, processing, errors } = useForm({
    fname: auth.user?.fname,
    lname: auth.user?.lname,
    email: auth.user?.email,
    password: '',
    password_confirmation: '',
    user_id: auth.user?.id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    put(`/client/accounts/${data.user_id}`);
  }

  return (
    <AuthenticatedLayout>
      <Head title="Account Settings" />
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6 bg-white rounded-lg form-container overflow-hidden shadow-xl">
          <div className="bg-indigo-400 p-6 text-white">
            <h1 className="text-2xl font-semibold">Event Information</h1>
          </div>
          <form id="eventForm" className="p-6 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-6 mb-2">
                <TextInput
                  id="fname"
                  type="text"
                  name="fname"
                  title="First Name"
                  placeholder="Enter first name"
                  onChange={handleChange}
                  errorMessage={errors.fname}
                  value={data.fname}
                />
              </div>
              <div className="col-span-6 mb-2">
                <TextInput
                  id="lname"
                  type="text"
                  name="lname"
                  title="Last Name"
                  placeholder="Enter last name"
                  onChange={handleChange}
                  errorMessage={errors.lname}
                  value={data.lname}
                />
              </div>
              <div className="col-span-12 mb-2">
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  title="Email Address"
                  placeholder="Enter email address"
                  onChange={handleChange}
                  errorMessage={errors.email}
                  value={data.email}
                />
              </div>
              <div className="col-span-6 mb-2">
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  title="Password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  errorMessage={errors.password}
                />
              </div>
              <div className="col-span-6 mb-2">
                <TextInput
                  id="password_confrimation"
                  type="password"
                  name="password_confrimation"
                  title="Confirm Password"
                  placeholder="Retype password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <PrimaryButton disabled={processing}>
                Save Changes
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default AccountIndex;