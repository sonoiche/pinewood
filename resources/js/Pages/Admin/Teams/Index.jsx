import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link, router } from "@inertiajs/react";

const TeamIndex = ({ teams }) => {

  const handleEdit = (id) => {
    router.get(`/client/teams/${id}/edit`);
  }

  const handleDelete = (id) => {
    if(confirm('Are you sure you want to delete this?')) {
      router.delete(`/client/teams/${id}`);
    }
  }

  return (
    <AuthenticatedLayout title="">
      <Head title="Manage Teams" />
      {teams.length > 0 ? (
      <div className="mx-auto p-4 md:p-0">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-200 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">List of Teams</h1>
                <p className="text-gray-600 mt-1">Manage Teams</p>
              </div>
              <div className="flex space-x-2">
                <Link href="/client/teams/create" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Team
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-700 bg-gray-100">
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider w-[3%]">#</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider w-2/6">Team</th>
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider w-1/6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {teams.map((team, index) => (
                  <tr className="hover-animate">
                    <td className="px-6 py-4 text-gray-700 font-medium">{index+1}</td>
                    <td className="px-6 py-4 text-gray-600">{team.name}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="p-2 text-blue-500 hover:text-blue-700 transition-colors cursor-pointer" onClick={() => handleEdit(team.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="p-2 text-red-500 hover:text-red-700 transition-colors cursor-pointer" onClick={() => handleDelete(team.id)}>
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
          
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-500">Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">24</span> results</div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 rounded-md border border-blue-500 bg-blue-500 text-white hover:bg-blue-600">1</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">2</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">3</button>
              <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
      ) : (
      <div id="emptyState">
        <div className="py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No teams found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new team.</p>
          <div className="mt-6">
            <Link
              href="/client/teams/create"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Team
            </Link>
          </div>
        </div>
      </div>
      )}
    </AuthenticatedLayout>
  );
}

export default TeamIndex;