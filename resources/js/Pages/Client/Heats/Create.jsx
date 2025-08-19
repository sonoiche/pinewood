import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import PrimaryButton from "../../../Components/PrimaryButton";
import { useState } from "react";
import SelectBox from "../../../Components/SelectBox";
import { options } from '../../../Constant';
import axios from "axios";

const HeatCreate = ({ events }) => {

  const [categories, setCategories] = useState([]);
  const { data, setData, post, processing, errors } = useForm({
    event_id: '',
    category_id: '',
    status: ''
  });
  
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

  const selectCategory = (value) => {
    setData({
      ...data,
      ['category_id']: value,
    });
  }

  const selectStatus = (value) => {
    setData({
      ...data,
      ['status']: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    post('/client/heats');
  }

  return (
    <AuthenticatedLayout>
      <Head title="Add New Heat" />
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg form-container shadow-xl">
          <div className="bg-indigo-400 p-6 text-white">
            <h1 className="text-2xl font-semibold">Add New Heat</h1>
            <p className="opacity-80">Please complete all fields</p>
          </div>
          <form id="eventForm" className="p-6 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 mb-2">
                <SelectBox
                  title="Select Event"
                  options={events}
                  placeholder="Type in the event and press enter"
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
              <div className="col-span-6 mb-2">
                <SelectBox
                  title="Status"
                  options={options.heatStatus}
                  onChange={selectStatus}
                  errorMessage={errors.status}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <PrimaryButton disabled={processing}>
                Auto Generate Heats
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default HeatCreate;