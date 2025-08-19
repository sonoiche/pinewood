import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import axios from "axios";

const DeckIndex = () => {

  const [participants, setParticipants] = useState([]);
  const [heatNumber, setHeatNumber] = useState(null);
  const [roundNumber, setRoundNumber] = useState(null);

  useEffect(() => {
    const channel = window.Echo.channel('heat-update').listen('HeatResultsUpdated', event => {
      async function fetchData() {
        await axios.get(`/client/on-deck/${event.heat_id}?category_id=${event.category_id}&heat_ids=${event.heat_ids}`).then((response) => {
          console.log(response.data.heat?.participants);
          
          setParticipants(response.data.heat?.participants);
          setHeatNumber(response.data.heat?.heat_number);
          setRoundNumber(response.data.heat?.round_number);
        });
      }

      fetchData();
    });
  }, []);

  return (
    <AuthenticatedLayout>
      <Head title="On Dec" />
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 bg-white rounded-lg form-container overflow-hidden shadow-xl">
          <div className="bg-indigo-400 p-6 text-white">
            <h1 className="text-2xl font-semibold">🔜 &nbsp; On Deck</h1>
          </div>
        </div>
        <div className="col-span-12">
          {participants.length === 0 ? (
            <p className="text-xl text-red-400 tracking-wider">Waiting for the next heat...</p>
          ) : (
            <>
              <p className="text-xl mb-4 font-bold">Heat #{heatNumber} • Round {roundNumber}</p>
              <table className="w-full max-w-5xl text-lg border-collapse">
                <thead className="py-3 bg-indigo-300">
                  <tr>
                    <th className="text-gray-800 py-2 tracking-wider text-center ">Lane</th>
                    <th className="text-gray-800 py-2 tracking-wider">Car Name</th>
                    <th className="text-gray-800 py-2 tracking-wider">Racer Name</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((item, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide text-center ">{item.lane_number}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide font-semibold">{item.car?.name}</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-gray-600 text-base tracking-wide">{item.car?.racer?.fullname}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default DeckIndex;