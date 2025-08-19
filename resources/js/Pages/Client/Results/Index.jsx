import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import SelectBox from "../../../Components/SelectBox";
import axios from "axios";
import { useEffect, useState } from "react";
import PrimaryButton from "../../../Components/PrimaryButton";
import Modal from "../../../Components/Modal";

const ResultIndex = ({ events }) => {

  const { data, setData, post, processing, errors } = useForm({
    event_id: '',
    category_id: '',
    heat_id: '',
    heat_ids: []
  });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [heats, setHeats] = useState([]);
  const [heat, setHeat] = useState({});
  const [results, setResults] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [activeHeat, setActiveHeat] = useState(0);
  const [totalHeats, setTotalHeats] = useState(0);
  const [heatIds, setHeatIds] = useState([]);
  
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
      setHeats(response.data.heats);
      setTotalHeats(response.data.heats.length);
    });
  }

  const selectHeat = (value) => {
    setData({
      ...data,
      ['heat_id']: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios.post('/client/results-filter', data).then((response) => {
      setCategory(response.data.category);
      setHeat(response.data.heat);

      setResults(() => {
        const initial = {};
        response.data.heat?.participants.map((p) => {
          initial[p.id] = {
            finish_time: p.finish_time || '',
            placement: p.placement || '',
          };
        });
        return initial;
      });

      setHeatIds([...heatIds, data.heat_id]);
      setData({
        ...data,
        ['heat_ids']: [...heatIds, data.heat_id]
      });
      setActiveHeat(response.data.heat?.heat_number);
    });

    setIsOpen(true);
  }

  const handleChange = (id, field, value) => {
    setResults(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleResultSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      heat_id: data.heat_id,
      category_id: data.category_id,
      event_id: data.event_id,
      results: results,
      heat_ids: heatIds
    };

    try {
      await axios.post(`/client/results`, payload).then((response) => {
        setHeat(response.data.heat);
        setHeatIds([...heatIds, response.data.heat?.id]);
        setActiveHeat(response.data.heat?.heat_number);

        setResults(() => {
          const initial = {};
          response.data.heat?.participants.map((p) => {
            initial[p.id] = {
              finish_time: p.finish_time || '',
              placement: p.placement || '',
            };
          });
          return initial;
        });

        if(activeHeat === totalHeats) {
          router.get(`/client/reports/heat-results?event_id=${data.event_id}&category_id=${data.category_id}`);
        }
      });
    } catch (err) {
      console.error(err);
      alert('Error saving results.');
    }
  };
  
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AuthenticatedLayout>
      <Head title="Results Summary" />
      <div className="mx-auto p-4 md:p-0">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-200 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Results Per Heat</h1>
              </div>
            </div>
          </div>
          <div className="custom-scrollbar">
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-12 gap-1'>
                <div className='col-span-2'></div>
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
                <div className='col-span-2 py-2'>
                  <SelectBox
                    title="Select Heat"
                    options={heats}
                    placeholder="Select heats"
                    onChange={selectHeat}
                  />
                </div>
                <div className='col-span-1'>
                  <div className='mt-[33px]'>
                    <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-4 rounded cursor-pointer shadow transition duration-150 ease-in-out transform hover:-translate-y-0.5' onClick={toggleModal}>
                      Start Heat
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="">
        <div
          className={`fixed inset-0 bg-black bg-opacity-75 transition-opacity duration-300 ease-in-out z-40 ${isOpen ? 'opacity-75' : 'opacity-0 pointer-events-none'}`}
          onClick={toggleModal}
        ></div>
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-full max-w-7xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
          <div className="p-6">
            <div className="flex justify-end items-start mb-4">
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-12 gap-3 py-5 px-0">
                <div className="col-span-12">
                  <div className="my-2">
                    <h2 className="text-xl font-bold mb-4">Enter Results: Heat #{heat?.heat_number} (Round {heat?.round_number})</h2>
                  </div>
                  <form onSubmit={handleResultSubmit}>
                    <table className="w-full border border-gray-300 rounded-md">
                      <thead className="py-3 bg-indigo-300">
                        <tr>
                          <th className='text-gray-800 py-2 tracking-wider'>Lane</th>
                          <th className='text-gray-800 py-2 tracking-wider'>Car</th>
                          <th className='text-gray-800 py-2 tracking-wider'>Racer Name</th>
                          <th className='text-gray-800 py-2 tracking-wider'>Finish Time (sec)</th>
                          <th className='text-gray-800 py-2 tracking-wider'>Placement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(heat?.participants) && heat?.participants.length > 0 ? (
                        heat?.participants.map((p) => (
                        <tr key={`part-${p.id}`}>
                          <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>{p.lane_number}</td>
                          <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{p.car?.name}</td>
                          <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide'>{p.car?.racer?.fullname}</td>
                          <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>
                            <input
                              type="number"
                              step="0.001"
                              value={results[p.id].finish_time}
                              onChange={e => handleChange(p.id, 'finish_time', e.target.value)}
                              required
                              className="border rounded px-2 py-1 w-24 text-center appearance-none"
                            />
                          </td>
                          <td className='border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center'>
                            <input
                              type="number"
                              value={results[p.id].placement}
                              onChange={e => handleChange(p.id, 'placement', e.target.value)}
                              required
                              className="border rounded px-2 py-1 w-20 text-center appearance-none"
                            />
                          </td>
                        </tr>
                        )
                      )) : (
                        <tr>
                          <td colSpan={4} className="text-center py-4">No items available</td>
                        </tr>
                      )}
                      </tbody>
                    </table>
                    <div className="flex justify-end">
                      <button
                        onClick={toggleModal}
                        type="button"
                        className="mt-4 px-4 py-2 border border-red-500 text-red-600 cursor-pointer rounded mr-3 hover:bg-red-500 hover:text-white font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer">
                        {activeHeat !== totalHeats ? (
                          <>Next Heat</>
                        ) : (
                          <>End Heat</>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default ResultIndex;