import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TextInput from "../../../Components/TextInput";
import PrimaryButton from "../../../Components/PrimaryButton";
import { useState } from "react";

const DivisionCreate = () => {

  const { errors } = usePage().props;
  const [data, setData] = useState({
    name: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    router.post('/client/divisions', data);
  }

  return (
    <AuthenticatedLayout>
      <Head title="Add New Division" />
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg form-container overflow-hidden shadow-xl">
          <div className="bg-indigo-400 p-6 text-white">
            <h1 className="text-2xl font-semibold">Add New Division</h1>
            <p className="opacity-80">Please complete all fields</p>
          </div>
          <form id="divisionForm" className="p-6 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="mb-2">
              <TextInput
                id="name"
                type="text"
                name="name"
                title="Division Name"
                placeholder="Enter Division name"
                value={data.name}
                onChange={handleChange}
                errorMessage={errors.name}
              />
            </div>
            <div className="flex justify-end">
              <PrimaryButton>
                Submit
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default DivisionCreate;