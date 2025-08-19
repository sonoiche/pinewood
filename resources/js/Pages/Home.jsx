import { useEffect, useState } from 'react';
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const Home = () => {

  const [data, setData] = useState({
    eventsCount: 0,
    categoriesCount: 0,
    carsCount: 0,
    heatsCount: 0,
    completedHeats: 0,
  });

  useEffect(() => {
    axios.get('/client/dashboard')
      .then(res => setData(res.data))
      .catch(err => console.error('Dashboard stats error:', err));
  }, []);

  const StatCard = ({ title, value, color }) => {
    return (
      <div className={`rounded-lg shadow p-5 text-white ${color}`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl mt-2">{value}</p>
      </div>
    );
  }

  const QuickLink = ({ label, href }) => {
    return (
      <a
        href={href}
        className="px-4 py-3 bg-white border rounded shadow hover:bg-gray-50 transition flex items-center justify-center w-full space-x-3"
      >
        {label}
      </a>
    );
  }

  return (
    <AuthenticatedLayout>
      <Head title='Dashboard' />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className='col-span-12'>
          <h1 className="text-3xl font-bold mb-6">🏁 Pinewood Derby Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Total Events" value={data.eventsCount} color="bg-blue-500" />
            <StatCard title="Categories" value={data.categoriesCount} color="bg-green-500" />
            <StatCard title="Cars Registered" value={data.carsCount} color="bg-yellow-500" />
            <StatCard title="Total Heats" value={data.heatsCount} color="bg-indigo-500" />
            <StatCard title="Completed Heats" value={data.completedHeats} color="bg-purple-500" />
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-row gap-3">
              <QuickLink label="➕ Add New Event" href="/client/events/create" />
              <QuickLink label="🏎️ Manage Cars" href="/client/racers/create" />
              <QuickLink label="🔥 View Heats" href="/client/heats" />
              <QuickLink label="🎖️ View Awards" href="/client/awards" />
              <QuickLink label="📊 View Summary" href="/client/results" />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Home;