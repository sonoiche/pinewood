import axios from 'axios';
import SelectBox from '../../../Components/SelectBox';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import PrimaryButton from "../../../Components/PrimaryButton";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from 'react';

const HeatIndex = ({ events }) => {

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

  const handleEdit = (id) => {
    router.get(`/client/heats/${id}/edit`);
  }

  const handleDelete = (id) => {
    if(confirm('Are you sure you want to delete this?')) {
      router.delete(`/client/heats/${id}`);
    }
  }

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
    
    await axios.post('/client/heats-filter', data).then((response) => {
      setCategory(response.data.category);
      setHeats(response.data.heats);
    });
  }

  useEffect(() => {
    async function fetchHeats() {
      await axios.post('/client/heats-filter', {
        category_id: categoryId
      }).then( async (response) => {
        setCategory(response.data.category);
        setHeats(response.data.heats);

        await axios.get(`/client/events-select/${response.data.category.event_id}`).then((response) => {
          setCategories(response.data.categories);
        });

        setData({
          ...data,
          ['event_id']: response.data.category.event_id,
          ['category_id']: response.data.category.id,
        });
      });
    }

    if(categoryId) {
      fetchHeats();
    }
  }, [categoryId]);

  return (
    <AuthenticatedLayout title="">
      <Head title="Manage Heats" />
      <div className="mx-auto p-4 md:p-0">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-200 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">List of Heats</h1>
                <p className="text-gray-600 mt-1">Manage Heats</p>
              </div>
              <div className="flex space-x-2">
                <Link href="/client/heats/create" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add New Heat
                </Link>
              </div>
            </div>
          </div>

          <div className="custom-scrollbar">
            <form onSubmit={() => handleSubmit()}>
              <div className='grid grid-cols-12 gap-1'>
                <div className='col-span-5'></div>
                <div className='col-span-3 py-2'>
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
                    selected={data.category_id}
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
            {category.name && (
              <div className='my-5 w-full'>
                <div className='mx-5 pb-2'>
                  <h2 className="mb-2 uppercase tracking-wider text-blue-600 text-xl">Heats for Race Category: {category.name}</h2>
                </div>
                {heats?.length === 0 ? (
                  <p className='text-red-600 mx-5'>No heats have been generated yet for this race category.</p>
                ) : (
                  heats.map((heat) => (
                    <div key={heat.id} className="bg-white w-full shadow-2xl py-2">
                      <div className="text-blue-600 uppercase tracking-wider text-2xl flex justify-between mx-5 mb-2">
                        <h2 className='text-lg font-semibold'>Round {`${heat.round_number} - Heat #${heat.heat_number}`}</h2>
                        {!heat.scheduled_at && (
                          <div className='text-lg'>Not scheduled</div>
                        )}
                      </div>
                      {heat.scheduled_at && (
                        <div className='mx-5 border border-gray-300 px-5 py-5 rounded-lg'>
                          <div className='mb-3 font-semibold text-blue-600 tracking-wider'>Scheduled: {heat.scheduled}</div>
                          <table className="w-full border border-gray-300 rounded-md">
                            <thead className="py-3 bg-indigo-300">
                              <tr>
                                <th className='text-gray-800 py-2 tracking-wider'>Lane</th>
                                <th className='text-gray-800 py-2 tracking-wider'>Racer Name</th>
                                <th className='text-gray-800 py-2 tracking-wider'>Team</th>
                                <th className='text-gray-800 py-2 tracking-wider'>Car Number</th>
                                <th className='text-gray-800 py-2 tracking-wider'>Finish Time</th>
                                <th className='text-gray-800 py-2 tracking-wider'>Position</th>
                              </tr>
                            </thead>
                            <tbody>
                              {heat.participants.map((participant) => (
                                <tr key={participant.id}>
                                  <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{participant.lane_number}</td>
                                  <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{participant.car?.racer?.fullname}</td>
                                  <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{participant.car?.racer?.team?.name ?? '—'}</td>
                                  <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{participant.car?.name}</td>
                                  <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>
                                    {participant.finish_time ? number_format(participant.finish_time, 2) + ' s' : '—'}
                                  </td>
                                  <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>
                                    {participant.placement ?? '—'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default HeatIndex;