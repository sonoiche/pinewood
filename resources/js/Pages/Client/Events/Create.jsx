import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TextInput from "../../../Components/TextInput";
import PrimaryButton from "../../../Components/PrimaryButton";
import Textarea from "../../../Components/Textarea";
import FileUpload from "../../../Components/FileUpload";

const EventCreate = () => {

  const { auth } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    event_date: '',
    event_time: '',
    event_location: '',
    num_lanes: '',
    num_laps: '',
    status: 'Upcoming',
    poster_photo: {},
    details: '',
    user_id: auth.user?.id
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleFileUpload = (value) => {
    setData('poster_photo', value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    post('/client/events');
  }

  return (
    <AuthenticatedLayout>
      <Head title="Add New Event" />
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6 bg-white rounded-lg form-container overflow-hidden shadow-xl">
          <div className="bg-indigo-400 p-6 text-white">
            <h1 className="text-2xl font-semibold">Event Information</h1>
          </div>
          <form id="eventForm" className="p-6 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 mb-2">
                <TextInput
                  id="title"
                  type="text"
                  name="title"
                  title="Event Title"
                  placeholder="Enter event title"
                  onChange={handleChange}
                  errorMessage={errors.title}
                />
              </div>
              <div className="col-span-6 mb-2">
                <TextInput
                  id="event_date"
                  type="date"
                  name="event_date"
                  title="Event Date"
                  placeholder="Enter event date"
                  onChange={handleChange}
                  errorMessage={errors.event_date}
                />
              </div>
              <div className="col-span-6 mb-2">
                <TextInput
                  id="event_time"
                  type="time"
                  name="event_time"
                  title="Event Time"
                  placeholder="Enter event time"
                  onChange={handleChange}
                  errorMessage={errors.event_time}
                />
              </div>
              <div className="col-span-6 mb-2">
                <TextInput
                  id="num_laps"
                  type="number"
                  name="num_laps"
                  title="Laps"
                  placeholder="Enter race laps"
                  onChange={handleChange}
                  errorMessage={errors.num_laps}
                />
              </div>
              <div className="col-span-6 mb-2">
                <TextInput
                  id="num_lanes"
                  type="number"
                  name="num_lanes"
                  title="Number of Lanes"
                  placeholder="Enter number of lanes"
                  onChange={handleChange}
                  errorMessage={errors.num_lanes}
                />
              </div>
              <div className="col-span-6 mb-2">
                <TextInput
                  id="event_location"
                  type="text"
                  name="event_location"
                  title="Event Location"
                  placeholder="Enter event location"
                  onChange={handleChange}
                  errorMessage={errors.event_location}
                />
              </div>
              <div className="col-span-6 mb-2">
                <FileUpload title="Upload Poster" onFileUpload={handleFileUpload} accept="image/*" />
              </div>
              <div className="col-span-12 mb-2">
                <Textarea
                  id="details"
                  name="details"
                  title="Event Details"
                  placeholder="Enter event details"
                  onChange={handleChange}
                  errorMessage={errors.details}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <PrimaryButton disabled={processing}>
                Submit
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default EventCreate;