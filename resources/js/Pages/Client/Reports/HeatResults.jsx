import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import SelectBox from "../../../Components/SelectBox";
import PrimaryButton from "../../../Components/PrimaryButton";
import { useEffect, useState } from "react";
import axios from "axios";

const HeatResults = ({ events }) => {

  const { data, setData, post, processing, errors } = useForm({
    event_id: '',
    category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [heats, setHeats] = useState([]);
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const categoryId = urlParams.get('category_id');
  const eventId = urlParams.get('event_id');

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
    
    await axios.post('/client/reports/generate-heats', data).then((response) => {
      setCategory(response.data.category);
      setHeats(response.data.heats);
    });
  }

  useEffect(() => {
    async function fetchData() {
      await axios.post('/client/reports/generate-heats', {
        category_id: categoryId,
        event_id: eventId
      }).then((response) => {
        setCategory(response.data.category);
        setHeats(response.data.heats);
      });

      await axios.get(`/client/events-select/${eventId}`).then((response) => {
        setCategories(response.data.categories);
      });
    }

    if(categoryId && eventId) {
      fetchData();
      setData({
        ...data,
        ['event_id']: eventId,
        ['category_id']: categoryId,
      });
    }
  }, [categoryId, eventId]);

  return (
    <AuthenticatedLayout>
      <Head title="Heat Results Report" />
      <div className="mx-auto p-4 md:p-0">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-200 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Heat Results Report</h1>
                <p className="text-gray-600 mt-1">Shows each heat and the results (placements, times, etc.) per racer.</p>
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
                    selected={data.event_id}
                  />
                </div>
                <div className='col-span-3 py-2'>
                  <SelectBox
                    title="Select Race Category"
                    options={categories}
                    placeholder="Type in the race category"
                    onChange={selectCategory}
                    selected={categoryId}
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
                  {heats.map((heat) => (
                    <>
                      <div className="mx-5 my-5">
                        <div className="flex justify-between">
                          <h2 className="text-blue-600 text-lg uppercase tracking-wider font-semibold">Round {heat.round_number} - Heat #{heat.heat_number}</h2>
                          <div className="flex items-center text-gray-700">
                            Scheduled: {heat.scheduled ?? '—'}
                          </div>
                        </div>
                      </div>
                      <div className="mx-auto">
                        <table className="w-full border border-gray-300 rounded-md">
                          <thead className="py-3 bg-indigo-300">
                            <tr>
                              <th className='text-gray-800 py-2 tracking-wider'>Lane</th>
                              <th className='text-gray-800 py-2 tracking-wider'>Car #</th>
                              <th className='text-gray-800 py-2 tracking-wider'>Name</th>
                              <th className='text-gray-800 py-2 tracking-wider'>Finish Time</th>
                              <th className='text-gray-800 py-2 tracking-wider'>Position</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(heat.participants) && heat.participants.length > 0 ? (
                              heat.participants.map((item, index)=> (
                              <tr key={`participant-${item.id}`}>
                                <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{item.lane_number}</td>
                                <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{item.car?.name}</td>
                                <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{item.car?.racer?.fullname}</td>
                                <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{item.finish_time}</td>
                                <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{item.placement}</td>
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
                    </>
                  ))}
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

export default HeatResults;