import { Head, router, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TextInput from "../../../Components/TextInput";
import PrimaryButton from "../../../Components/PrimaryButton";
import { useEffect, useState } from "react";
import SelectBox from "../../../Components/SelectBox";
import Textarea from "../../../Components/Textarea";
import axios from "axios";

const AwardEdit = ({ award, events }) => {

  const { data, setData, put, processing, errors } = useForm({
    event_id: award.event_id,
    category_id: award.category_id,
    title: award.title,
    description: award.description,
    car_id: award.car_id
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    put(`/client/awards/${award.id}`);
  }

  useEffect(() => {
    async function fetchData() {
      await axios.get(`/client/events-select/${data.event_id}`).then((response) => {
        setCategories(response.data.categories);
      });

      await axios.get(`/client/category-select/${data.category_id}`).then((response) => {
        setRacers(response.data.racers);
      });
    }

    fetchData();
  }, [data.event_id]);

  return (
    <AuthenticatedLayout>
      <Head title="Update Award" />
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg form-container shadow-xl">
          <div className="bg-indigo-400 p-6 text-white">
            <h1 className="text-2xl font-semibold">Update Award</h1>
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
                  selected={data.event_id}
                />
              </div>
              <div className="col-span-6 mb-2">
                <SelectBox
                  title="Select Race Category"
                  options={categories}
                  placeholder="Type in the race category"
                  onChange={selectCategory}
                  errorMessage={errors.category_id}
                  selected={data.category_id}
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
                  value={data.description}
                />
              </div>
              <div className="col-span-12 mb-2">
                <SelectBox
                  title="Select Car Racer"
                  options={racers}
                  placeholder="Type in the race category"
                  onChange={selectRacer}
                  errorMessage={errors.car_id}
                  selected={data.car_id}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <PrimaryButton>
                Save Changes
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default AwardEdit;