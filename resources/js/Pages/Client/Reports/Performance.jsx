import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import SelectBox from "../../../Components/SelectBox";
import { useState } from "react";
import axios from "axios";
import PrimaryButton from "../../../Components/PrimaryButton";

const Performance = ({ events }) => {
  
  const { data, setData, post, processing, errors } = useForm({
    event_id: '',
    category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
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

  const selectCategory = (value) => {
    setData({
      ...data,
      ['category_id']: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios.post('/client/reports/generate-perfomance', data).then((response) => {
      setCategory(response.data.category);
      setSummaries(response.data.summaries);
    });
  }
  
  return (
    <AuthenticatedLayout>
      <Head title="Car Performance Summary" />
      <div className="mx-auto p-4 md:p-0">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-200 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Car Performance Summary</h1>
                <p className="text-gray-600 mt-1">Shows each car’s average time, best time, total points, and number of races.</p>
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
                      Filter
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
              {category.name ? (
                <>
                  <div className="mx-5 my-5">
                    <h2 className="text-blue-600 text-xl uppercase tracking-wider">Car Performance Summary - {category.name}</h2>
                  </div>
                  <div className="mx-auto">
                    <table className="w-full border border-gray-300 rounded-md">
                      <thead className="py-3 bg-indigo-300">
                        <tr>
                          <th className='text-gray-800 py-2 tracking-wider'>Car #</th>
                          <th className='text-gray-800 py-2 tracking-wider'>Racer</th>
                          <th className='text-gray-800 py-2 tracking-wider'>Races</th>
                          <th className='text-gray-800 py-2 tracking-wider'>Avg Time</th>
                          <th className='text-gray-800 py-2 tracking-wider'>Best Time</th>
                          <th className='text-gray-800 py-2 tracking-wider'>Total Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(summaries) && summaries.length > 0 ? (
                          summaries.map((item, index)=> (
                          <tr>
                            <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{item.car}</td>
                            <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{item.racer}</td>
                            <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{item.races}</td>
                            <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{item.avg_time}</td>
                            <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{item.best_time}</td>
                            <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{item.points}</td>
                          </tr>
                          )
                        )) : (
                          <tr>
                            <td colSpan={7} className="text-center py-4">No items available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="mx-5 my-5 text-center bg-red-200 py-2">
                  <h1 className="text-red-500 uppercase text-lg tracking-wider font-semibold">No data available</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Performance;