import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TextInput from "../../../Components/TextInput";
import PrimaryButton from "../../../Components/PrimaryButton";
import Textarea from "../../../Components/Textarea";
import FileUpload from "../../../Components/FileUpload";

const RaceCategoryEdit = ({ event, category }) => {

  const { data, setData, put, processing, errors } = useForm({
    event_id: event.id,
    name: category.name,
    max_weight: category.max_weight,
    min_age: category.min_age,
    max_age: category.max_age,
    description: category.description
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
    
    put(`/client/race-categories/${category.hashid}`);
  }

  return (
    <AuthenticatedLayout>
      <Head title={`Add Race Category to ${event.title}`} />
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6 bg-white rounded-lg form-container overflow-hidden shadow-xl">
          <div className="bg-indigo-400 p-6 text-white">
            <h1 className="text-2xl font-semibold">{`Race Category for ${event.title}`}</h1>
          </div>
          <form id="eventForm" className="p-6 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 mb-2">
                <TextInput
                  id="name"
                  type="text"
                  name="name"
                  title="Class Name"
                  placeholder="Enter class name"
                  value={data.name}
                  onChange={handleChange}
                  errorMessage={errors.name}
                />
              </div>
              <div className="col-span-4 mb-2">
                <TextInput
                  id="max_weight"
                  type="number"
                  name="max_weight"
                  title="Max Weight (Ounce)"
                  placeholder="Enter max weight"
                  value={data.max_weight}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-4 mb-2">
                <TextInput
                  id="min_age"
                  type="number"
                  name="min_age"
                  title="Min Age"
                  placeholder="Enter minimum age"
                  value={data.min_age}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-4 mb-2">
                <TextInput
                  id="max_age"
                  type="number"
                  name="max_age"
                  title="Max Age"
                  placeholder="Enter maximum age"
                  value={data.max_age}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-12 mb-2">
                <Textarea
                  id="description"
                  name="description"
                  title="Class Description"
                  placeholder="Enter class description"
                  value={data.description}
                  onChange={handleChange}
                  errorMessage={errors.description}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Link href={`/client/events/${event.hashid}/edit`} className="bg-red-200 text-red-600 border border-red-500 px-5 py-2 mr-1.5 rounded-lg hover:bg-red-600 hover:text-white">Back</Link>
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

export default RaceCategoryEdit;