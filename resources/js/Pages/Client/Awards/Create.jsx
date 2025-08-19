import { Head, router, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TextInput from "../../../Components/TextInput";
import PrimaryButton from "../../../Components/PrimaryButton";
import { useState } from "react";
import SelectBox from "../../../Components/SelectBox";
import axios from "axios";
import Textarea from "../../../Components/Textarea";

const AwardCreate = ({ events }) => {

  const { data, setData, post, processing, errors } = useForm({
    event_id: '',
    category_id: '',
    title: '',
    description: '',
    car_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [racers, setRacers] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
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

  const selectCategory = async (value) => {
    setData({
      ...data,
      ['category_id']: value,
    });

    await axios.get(`/client/category-select/${value}`).then((response) => {
      setRacers(response.data.racers);
    });
  }

  const selectRacer = (value) => {
    setData({
      ...data,
      ['car_id']: value,
    });
  }

  const handleAutoAssign = async (e) => {
    e.preventDefault();

    await axios.get(`/client/auto-awards?event_id=${data.event_id}&category_id=${data.category_id}`).then((response) => {
      router.get('/client/awards');
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    post('/client/awards');
  }

  return (
    <AuthenticatedLayout>
      <Head title="Add New Award" />
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg form-container shadow-xl">
          <div className="bg-indigo-400 p-6 text-white">
            <h1 className="text-2xl font-semibold">Add New Award</h1>
            <p className="opacity-80">Please complete all fields</p>
          </div>
          <form id="awardForm" className="p-6 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-6 mb-2">
                <SelectBox
                  title="Select Event"
                  options={events}
                  placeholder="Type in the events"
                  onChange={selectEvent}
                  errorMessage={errors.event_id}
                />
              </div>
              <div className="col-span-6 mb-2">
                <SelectBox
                  title="Select Race Category"
                  options={categories}
                  placeholder="Type in the race category"
                  onChange={selectCategory}
                  errorMessage={errors.category_id}
                />
              </div>
              <div className="col-span-12 mb-2">
                <TextInput
                  id="title"
                  type="text"
                  name="title"
                  title="Award Name"
                  placeholder="Enter award name"
                  value={data.title}
                  onChange={handleChange}
                  errorMessage={errors.title}
                />
              </div>
              <div className="col-span-12 mb-2">
                <Textarea
                  id="description"
                  name="description"
                  title="Description"
                  placeholder="Enter description"
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-12 mb-2">
                <SelectBox
                  title="Select Car Racer"
                  options={racers}
                  placeholder="Type in the race category"
                  onChange={selectRacer}
                  errorMessage={errors.car_id}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <div>
                <button onClick={handleAutoAssign} className={`mt-4 px-4 py-2 ${(data.event_id == '' && data.category_id == '') ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 cursor-pointer'} text-white rounded mr-2`} disabled={data.event_id == '' && data.category_id == ''}>
                  Assign Fastest Car
                </button>
                <PrimaryButton>
                  Submit
                </PrimaryButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default AwardCreate;