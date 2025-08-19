import { Link, Head, useForm, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TextInput from "../../../Components/TextInput";
import PrimaryButton from "../../../Components/PrimaryButton";
import Textarea from "../../../Components/Textarea";
import FileUpload from "../../../Components/FileUpload";

const EventEdit = ({ event, categories }) => {

  const { auth } = usePage().props;
  const { data, setData, put, processing, errors } = useForm({
    title: event.title,
    event_date: event.event_date,
    event_time: event.event_time,
    event_location: event.event_location,
    num_lanes: event.num_lanes,
    num_laps: event.num_laps,
    status: event.status || 'Upcoming',
    poster_photo: event.poster_photo || {},
    details: event.details,
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

  const handleEdit = (id) => {
    router.get(`/client/race-categories/${id}/edit`);
  }

  const handleDelete = (id) => {
    if(confirm('Are you sure you want to delete this?')) {
      router.delete(`/client/race-cagtegories/${id}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    put(`/client/events/${event.hashid}`);
  }

  return (
    <AuthenticatedLayout>
      <Head title="Update Event" />
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6 bg-white rounded-lg form-container overflow-hidden shadow-xl">
          <div className="bg-indigo-400 p-6 text-white">
            <h1 className="text-2xl font-semibold">Update Event Information</h1>
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
                  value={data.title}
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
                  value={data.event_date}
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
                  value={data.event_time}
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
                  value={data.num_laps}
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
                  value={data.num_lanes}
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
                  value={data.event_location}
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
                  value={data.details}
                  onChange={handleChange}
                  errorMessage={errors.details}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Link href={`/client/events`} className="bg-red-200 text-red-600 border border-red-500 px-5 py-2 mr-1.5 rounded-lg hover:bg-red-600 hover:text-white">Back</Link>
              <PrimaryButton disabled={processing}>
                Save Changes
              </PrimaryButton>
            </div>
          </form>
        </div>
        <div className="col-span-12 bg-white rounded-lg form-container overflow-hidden shadow-xl">
          <div className="bg-indigo-400 py-3 px-6 text-white flex justify-between">
            <h1 className="text-xl font-semibold">Race Categories</h1>
            <Link href={`/client/race-categories/create?event_id=${event.hashid}`} className="bg-indigo-500 text-sm px-3 py-1 rounded-lg text-white uppercase tracking-wider font-medium border border-indigo-300">Add New Category</Link>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-700 bg-gray-100">
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider w-[3%]">#</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider w-[30%]">Class Name</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider w-[10%]">Max Weight</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider w-[10%]">Age</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider w-[5%] text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((item, index)=> (
                    <tr className="hover-animate">
                      <td className="px-6 py-4 text-gray-700 font-medium">{index+1}</td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{item.max_weight}</td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{`${item.min_age} - ${item.max_age}`}</td>
                      <td className="px-6 py-4 text-gray-700 font-medium text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="p-2 text-blue-500 hover:text-blue-700 transition-colors cursor-pointer" onClick={() => handleEdit(item.hashid)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button className="p-2 text-red-500 hover:text-red-700 transition-colors cursor-pointer" onClick={() => handleDelete(item.hashid)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    )
                  )) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">No items available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default EventEdit;