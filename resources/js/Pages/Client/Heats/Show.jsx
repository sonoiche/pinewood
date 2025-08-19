import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const HeatShow = ({ heat }) => {
  return (
    <AuthenticatedLayout>
      <Head title="Heats" />
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-700 bg-gray-100">
                <th className="px-6 py-3 font-semibold uppercase tracking-wider">Heat #</th>
                {heat.participants.map((participant, index) => (
                  <th className="px-6 py-3 font-semibold uppercase tracking-wider" key={`lanel-${index}`}>Lane {index+1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4 text-gray-700 font-medium">Heat 1</td>
                {heat.participants.map((participant, index) => (
                  <td className="px-6 py-4 text-gray-700 font-medium" key={`par-${participant.id}`}>
                    <div>{participant.car?.name}</div>
                    <small>{participant.car?.racer?.fullname}</small>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default HeatShow;