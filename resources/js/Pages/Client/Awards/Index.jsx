import { useEffect, useState } from 'react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link, router } from "@inertiajs/react";
import axios from 'axios';
import Pagination from '../../../Components/Pagination';
import PaginationLink from '../../../Components/PaginationLink';

const AwardIndex = () => {

  const [awards, setAwards] = useState([]);

  const handleEdit = (id) => {
    router.get(`/client/awards/${id}/edit`);
  }

  const handleDelete = (id) => {
    if(confirm('Are you sure you want to delete this?')) {
      router.delete(`/client/awards/${id}`);
    }
  }

  const handlePageChange = async (link) => {
    await axios.get(link).then((response) => {
      setAwards(response.data.awards);
    });
  }

  useEffect(() => {
    async function fetchData() {
      await axios.get('/client/awards-list').then((response) => {
        setAwards(response.data.awards);
      });
    }

    fetchData();
  }, []);

  return (
    <AuthenticatedLayout title="">
      <Head title="Manage Awards" />
      {Array.isArray(awards.data) && awards.data.length > 0 ? (
      <div className="mx-auto p-4 md:p-0">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-200 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">List of Awards</h1>
                <p className="text-gray-600 mt-1">Manage Awards</p>
              </div>
              <div className="flex space-x-2">
                <Link href="/client/awards/create" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add New Award
                </Link>
              </div>
            </div>
          </div>

          <div className="mx-3">
            <div className='my-3'>
              <h2 className="text-2xl text-blue-500 tracking-wider font-bold mb-4 mx-3">🏆 Award Winners</h2>
            </div>
            <table className="w-full border-gray-300 my-2">
              <thead className="py-3 bg-indigo-300">
                <tr>
                  <th className="text-gray-800 py-2 tracking-wider">Event</th>
                  <th className="text-gray-800 py-2 tracking-wider">Award Title</th>
                  <th className="text-gray-800 py-2 tracking-wider">Car Name</th>
                  <th className="text-gray-800 py-2 tracking-wider">Racer Name</th>
                  <th className="text-gray-800 py-2 tracking-wider">Description</th>
                  <th className="text-gray-800 py-2 tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {awards.data.map((award) => (
                  <tr key={award.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 text-gray-600 text-base tracking-wide">
                      <div>{award.event?.title}</div>
                      <small>{award.category?.name}</small>
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600 text-base tracking-wide">🏅 {award.title}</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600 text-base tracking-wide">{award.car?.name ?? '-'}</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600 text-base tracking-wide">{award.car?.racer?.fullname ?? '-'}</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600 text-base tracking-wide">{award.description ?? '—'}</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600 text-base tracking-wide">
                      <div className="flex justify-center space-x-1">
                        {award.title !== 'Fastest Car' && (
                          <button className="p-2 text-blue-500 hover:text-blue-700 transition-colors cursor-pointer" onClick={() => handleEdit(award.hashid)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                        )}
                        <button className="p-2 text-red-500 hover:text-red-700 transition-colors cursor-pointer" onClick={() => handleDelete(award.hashid)}>
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
                ))}
              </tbody>
            </table>
          </div>
          {awards.total > 10 && (
            <PaginationLink links={awards.links} from={awards.from} last_page={awards.last_page} total={awards.total} onChange={handlePageChange} />
          )}
        </div>
      </div>
      ) : (
      <div id="emptyState">
        <div className="py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No awards found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new award.</p>
          <div className="mt-6">
            <Link
              href="/client/awards/create"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Award
            </Link>
          </div>
        </div>
      </div>
      )}
    </AuthenticatedLayout>
  );
}

export default AwardIndex;