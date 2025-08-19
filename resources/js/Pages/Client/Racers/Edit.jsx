import { Head, router, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TextInput from "../../../Components/TextInput";
import PrimaryButton from "../../../Components/PrimaryButton";
import SelectBox from "../../../Components/SelectBox";
import { useEffect, useState } from "react";
import axios from "axios";
import FileUpload from "../../../Components/FileUpload";

const RacerEdit = ({ racer, events }) => {

  const { data, setData, put, processing, errors } = useForm({
    team: racer.team?.name,
    fname: racer.fname,
    lname: racer.lname,
    car_name: racer.car?.name,
    photo: {},
    status: 'Active',
    event_id: racer.car?.event_id,
    category_id: racer.car?.category_id,
    image_path: '',
    weight: racer.car?.weight
  });
  const [categories, setCategories] = useState([]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const selectEvent = async (value) => {
    setData({
      ...data,
      ['event_id']: value,
    });

    await axios.get(`/client/events-select/${value}`).then((response) => {
      setCategories(response.data.categories);
    });
  }

  const selectCategory = (value) => {
    setData({
      ...data,
      ['category_id']: value,
    });
  }

  const handleFileUpload = (value) => {
    setData('image_path', value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    put(`/client/racers/${racer.id}`);
  }

  useEffect(() => {
    async function fetchCategories() {
      await axios.get(`/client/events-select/${data.event_id}`).then((response) => {
        setCategories(response.data.categories);
      });
    }

    fetchCategories();
  }, [data.event_id]);
  
  return (
    <AuthenticatedLayout>
      <Head title="Add New Racer" />
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg form-container overflow-hidden shadow-xl">
          <div className="bg-indigo-400 p-6 text-white">
            <h1 className="text-2xl font-semibold">Update Racer Information</h1>
            <p className="opacity-80">Please complete all fields</p>
          </div>
          <form id="racerForm" className="p-6 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 mb-1">
                <TextInput
                  id="team"
                  type="text"
                  name="team"
                  title="Team"
                  placeholder="Enter team name"
                  value={data.team}
                  onChange={handleChange}
                  errorMessage={errors.team}
                />
              </div>
              <div className="col-span-6 mb-1">
                <TextInput
                  id="fname"
                  type="text"
                  name="fname"
                  title="First Name"
                  placeholder="Enter first name"
                  value={data.fname}
                  onChange={handleChange}
                  errorMessage={errors.fname}
                />
              </div>
              <div className="col-span-6 mb-1">
                <TextInput
                  id="lname"
                  type="text"
                  name="lname"
                  title="Last Name"
                  placeholder="Enter last name"
                  value={data.lname}
                  onChange={handleChange}
                  errorMessage={errors.lname}
                />
              </div>
              <div className="col-span-12 mb-1">
                <SelectBox
                  title="Select Event"
                  options={events}
                  placeholder="Type in the events"
                  selected={data.event_id}
                  onChange={selectEvent}
                  errorMessage={errors.event_id}
                />
              </div>
              <div className="col-span-6 mb-1">
                <SelectBox
                  title="Select Race Category"
                  options={categories}
                  placeholder="Type in the race category"
                  selected={data.category_id}
                  onChange={selectCategory}
                  errorMessage={errors.category_id}
                />
              </div>
              <div className="col-span-6 mb-1">
                <TextInput
                  id="car_name"
                  type="text"
                  name="car_name"
                  title="Car Name"
                  placeholder="Enter car name"
                  value={data.car_name}
                  onChange={handleChange}
                  errorMessage={errors.car_name}
                />
              </div>
              <div className="col-span-6 mb-1">
                <FileUpload title="Car Image" onFileUpload={handleFileUpload} accept="image/*" />
              </div>
              <div className="col-span-6 mb-1">
                <TextInput
                  id="weight"
                  type="number"
                  name="weight"
                  title="Car Weight"
                  placeholder="Enter car weight"
                  value={data.weight}
                  onChange={handleChange}
                  errorMessage={errors.weight}
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

export default RacerEdit;