import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import SelectBox from "../../../Components/SelectBox";
import axios from "axios";
import { useState } from "react";
import PrimaryButton from "../../../Components/PrimaryButton";

const Summary = ({ events }) => {

  const { data, setData, post, processing, errors } = useForm({
    event_id: '',
    category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [summaries, setSummaries] = useState([]);
  
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/client/results-summary', data).then((response) => {
      setSummaries(response.data.summaries);
    });
  }

  return (
    <AuthenticatedLayout>
      <Head title="Summary Results" />
      <div className="mx-auto p-4 md:p-0">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-200 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Summary Results</h1>
              </div>
            </div>
          </div>
          <div className="custom-scrollbar">
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-12 gap-1'>
                <div className='col-span-4'></div>
                <div className='col-span-4 py-2'>
                  <SelectBox
                    title="Select Event"
                    options={events}
                    placeholder="Type in the events"
                    onChange={selectEvent}
                  />
                </div>
                <div className='col-span-3 py-2'>
                  <SelectBox
                    title="Select Race Category"
                    options={categories}
                    placeholder="Type in the race category"
                    onChange={selectCategory}
                  />
                </div>
                <div className='col-span-1'>
                  <div className='mt-[30px]'>
                    <PrimaryButton className='px-5' disabled={processing}>
                      Generate
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="grid grid-cols-12 gap-3 py-5 px-5">
            <div className="col-span-12">
              <table className="w-full border border-gray-300 rounded-md">
                <thead className="py-3 bg-indigo-300">
                  <tr>
                    <th className='text-gray-800 py-2 tracking-wider'>Rank</th>
                    <th className='text-gray-800 py-2 tracking-wider'>Car</th>
                    <th className='text-gray-800 py-2 tracking-wider'>Racer</th>
                    <th className='text-gray-800 py-2 tracking-wider'>Avg Time</th>
                    <th className='text-gray-800 py-2 tracking-wider'>Best Time</th>
                    <th className='text-gray-800 py-2 tracking-wider'>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {summaries.map((summary) => (
                    <tr key={summary.id}>
                      <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{summary.rank}</td>
                      <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{summary.car?.name}</td>
                      <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{summary.car?.racer?.fullname}</td>
                      <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{summary.average_time}s</td>
                      <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{summary.best_time}s</td>
                      <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{summary.total_points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Summary;