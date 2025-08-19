import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TextInput from "../../../Components/TextInput";
import { useEffect, useState } from "react";
import SelectBox from "../../../Components/SelectBox";
import options from "../../../Constant/options";
import PrimaryButton from "../../../Components/PrimaryButton";

const SettingIndex = ({ setup }) => {

  const [data, setData] = useState({
    warn_timer: setup.warn_timer ?? false,
    lane_reverse: setup.lane_reverse ?? false,
    track_lanes: setup.track_lanes ?? '',
    track_length: setup.track_length ?? '',
    precision: setup.precision ?? '',
    heat_linger: setup.heat_linger ?? '',
    full_roster: setup.full_roster ?? '',
    sub_division: setup.sub_division ?? '',
    racer_name: setup.racer_name ?? '',
    assigned_car_number: setup.assigned_car_number ?? '',
    place_increments: setup.place_increments ?? '',
    trophies_pack_level: setup.trophies_pack_level ?? '',
    trophies_per_group: setup.trophies_per_subgroup ?? '',
    trophies_per_subgroup: setup.trophies_per_subgroup ?? '',
    one_trophy_per_race: setup.one_trophy_per_race ?? '',
    exclusive_scout: setup.exclusive_scout ?? '',
    scout_award_name: setup.scout_award_name ?? '',
    image_set: setup.image_set ?? '',
    racing_display: setup.racing_display ?? '',
    deck_display: setup.deck_display ?? '',
    racer_results: setup.racer_results ?? [],
    upload_replay: setup.upload_replay ?? '',
    interleave_heats: setup.interleave_heats ?? '',
    race_by_points: setup.race_by_points ?? '',
    single_run: setup.single_run ?? '',
    scoring_method: setup.scoring_method ?? ''
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCheckChange = (e) => {
    const { name, type, checked, value } = e.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRadioChange = (e) => {
    const { name, type, checked, value } = e.target;
    setData({
      ...data,
      [name]: type === 'radio' ? checked : value,
    });
  };

  const handleMultipleCheckBox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the value to the array if checked
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      // Remove the value from the array if unchecked
      setSelectedOptions((prev) => prev.filter((option) => option !== value));
    }
  };

  const selectImageSet = (value) => {
    setData({
      ...data,
      ['image_set']: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    router.post('/client/settings', data);
  }

  useEffect(() => {
    if(selectedOptions.length) {
      setData({
        ...data,
        ['racer_results']: selectedOptions,
      });
    }
  }, [selectedOptions]);
  
  return (
    <AuthenticatedLayout>
      <Head title="Settings" />
      <div className="w-full max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg form-container shadow-xl pb-2">
            <div className="bg-indigo-400 p-6 text-white">
              <h1 className="text-2xl font-semibold">Settings</h1>
              <p className="opacity-80">Derby Settings</p>
            </div>
            <div className="grid grid-cols-12 gap-y-3 gap-x-5 p-6 border border-gray-300 m-3 rounded-xl">
              <div className="col-span-6 mt-7">
                <div className="flex items-center">
                  <input id="warn_timer" name="warn_timer" type="checkbox" onChange={handleCheckChange} checked={data.warn_timer} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="warn_timer" className="ml-2 block text-sm text-gray-700">
                    Warn when timer not connected
                  </label>
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">
                  <TextInput
                    id="track_lanes"
                    type="number"
                    name="track_lanes"
                    title="Number of lanes on the track"
                    onChange={handleChange}
                    value={data.track_lanes}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <p className="text-gray-700 font-medium text-sm mb-2">Lanes available for scheduling:</p>
                <div className="flex items-center">
                  <input id="lane_reverse" name="lane_reverse" type="checkbox" onChange={handleCheckChange} checked={data.lane_reverse} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="lane_reverse" className="ml-2 block text-sm text-gray-700">
                    Number lanes in reverse
                  </label>
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">
                  <TextInput
                    id="track_length"
                    type="number"
                    name="track_length"
                    title="Track length (in feet)"
                    onChange={handleChange}
                    value={data.track_length}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <p className="text-gray-700 font-medium text-sm mb-2">Displayed time precision:</p>
                <div className="flex space-x-3">
                  <div className="flex items-center">
                    <input type="radio" id="option1" name="precision" value="4 digits" onChange={handleChange} checked={data.precision === '4 digits'} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <label htmlFor="option1" className="ml-2 text-gray-700">4 digits (0.001)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="option2" name="precision" value="5 digits" onChange={handleChange} checked={data.precision === '5 digits'} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <label htmlFor="option2" className="ml-2 text-gray-700">5 digits (0.0001)</label>
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">
                  <TextInput
                    id="heat_linger"
                    type="number"
                    name="heat_linger"
                    title='Previous heat linger time (sec.) for "Now Racing"'
                    onChange={handleChange}
                    value={data.heat_linger}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-y-3 gap-x-5 p-6 border border-gray-300 m-3 rounded-xl">
              <div className="col-span-6">
                <div className="mb-2">
                  <TextInput
                    id="full_roster"
                    type="number"
                    name="full_roster"
                    title="The full roster is a (or the)"
                    onChange={handleChange}
                    value={data.full_roster}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">
                  <TextInput
                    id="sub_division"
                    type="number"
                    name="sub_division"
                    title="and a sub-division is a(n)"
                    onChange={handleChange}
                    value={data.sub_division}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <p className="text-gray-700 font-medium text-sm mb-2">Show racer name as:</p>
                <div className="flex items-center">
                  <input type="radio" id="option_name1" name="racer_name" value="fullname" onChange={handleChange} checked={data.racer_name == 'fullname'} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                  <label htmlFor="option_name1" className="ml-2 text-gray-700">First name and last name</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="option_name2" name="racer_name" value="initials" onChange={handleChange} checked={data.racer_name == 'initials'} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                  <label htmlFor="option_name2" className="ml-2 text-gray-700">First name and last initial</label>
                </div>
              </div>
              <div className="col-span-6">
                <p className="text-gray-700 font-medium text-sm mb-2">Assigned car numbers start at</p>
                <div className="flex space-x-3">
                  <div className="flex items-center">
                    <input type="radio" id="car_numbers1" name="assigned_car_number" value="101" onChange={handleChange} checked={data.assigned_car_number == 101} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <label htmlFor="car_numbers1" className="ml-2 text-gray-700">101</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="car_numbers2" name="assigned_car_number" value="1" onChange={handleChange} checked={data.assigned_car_number == 1} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <label htmlFor="car_numbers2" className="ml-2 text-gray-700">1</label>
                  </div>
                </div>
              </div>
              <div className="col-span-6 mt-3">
                <div className="flex items-center">
                  <input id="place_increments" name="place_increments" type="checkbox" onChange={handleCheckChange} checked={data.place_increments} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="place_increments" className="ml-2 block text-sm text-gray-700">
                    and the hundreds place increments for each den.
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-y-3 gap-x-5 p-6 border border-gray-300 m-3 rounded-xl">
              <div className="col-span-6">
                <div className="mb-2">
                  <TextInput
                    id="trophies_pack_level"
                    type="number"
                    name="trophies_pack_level"
                    title="Number of speed trophies at the pack level"
                    onChange={handleChange}
                    value={data.trophies_pack_level}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">
                  <TextInput
                    id="trophies_per_group"
                    type="number"
                    name="trophies_per_group"
                    title="Number of speed trophies per group"
                    onChange={handleChange}
                    value={data.trophies_per_group}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">
                  <TextInput
                    id="trophies_per_subgroup"
                    type="number"
                    name="trophies_per_subgroup"
                    title="Number of speed trophies per subgroup"
                    onChange={handleChange}
                    value={data.trophies_per_subgroup}
                  />
                </div>
              </div>
              <div className="col-span-6 mt-8">
                <div className="flex items-center">
                  <input id="one_trophy_per_race" name="one_trophy_per_race" type="checkbox" onChange={handleCheckChange} checked={data.one_trophy_per_race} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="one_trophy_per_race" className="ml-2 block text-sm text-gray-700">
                    At most one trophy per racer?
                  </label>
                </div>
              </div>
              <div className="col-span-6 mt-8">
                <div className="flex items-center">
                  <input id="exclusive_scout" name="exclusive_scout" type="checkbox" onChange={handleCheckChange} checked={data.exclusive_scout} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="exclusive_scout" className="ml-2 block text-sm text-gray-700">
                    Offer "Exclusively By Scout" award?
                  </label>
                </div>
              </div>
              <div className="col-span-6">
                <div className="mb-2">
                  <TextInput
                    id="scout_award_name"
                    type="text"
                    name="scout_award_name"
                    title='"Exclusively By Scout" award name (if used)'
                    onChange={handleChange}
                    value={data.scout_award_name}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-y-3 gap-x-5 p-6 border border-gray-300 m-3 rounded-xl">
              <div className="col-span-4">
                <div className="mb-2">
                  <SelectBox
                    title="Image set"
                    options={options.imageSetOptions}
                    onChange={selectImageSet}
                    selected={data.image_set}
                  />
                </div>
              </div>
              <div className="col-span-8">
                <p className="text-gray-700 font-medium text-sm mb-2">Now Racing display</p>
                <div className="flex space-x-3">
                  <div className="flex items-center">
                    <input type="radio" id="photos1" name="racing_display" value="No Photos" onChange={handleChange} checked={data.racing_display == 'No Photos'} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <label htmlFor="photos1" className="ml-2 text-gray-700">No Photos</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="photos2" name="racing_display" value="Racer Photos" onChange={handleChange} checked={data.racing_display == 'Racer Photos'} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <label htmlFor="photos2" className="ml-2 text-gray-700">Racer Photos</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="photos3" name="racing_display" value="Car Photos" onChange={handleChange} checked={data.racing_display == 'Car Photos'} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <label htmlFor="photos3" className="ml-2 text-gray-700">Car Photos</label>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <p className="text-gray-700 font-medium text-sm mb-2">On Deck display:</p>
                <div className="flex items-center">
                  <input id="deck_display" name="deck_display" type="checkbox" onChange={handleCheckChange} checked={data.deck_display} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="deck_display" className="ml-2 block text-sm text-gray-700">
                    Car Photos
                  </label>
                </div>
              </div>
              <div className="col-span-4">
                <p className="text-gray-700 font-medium text-sm mb-2">Racer Results display:</p>
                <div className="flex space-x-3">
                  <div className="flex items-center">
                    <input id="racer_results1" name="racer_results" value="Racer Photos" type="checkbox" onChange={handleMultipleCheckBox} checked={data.racer_results.includes('Racer Photos')} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="racer_results1" className="ml-2 block text-sm text-gray-700">
                      Racer Photos
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="racer_results2" name="racer_results" value="Car Photos" type="checkbox" onChange={handleMultipleCheckBox} checked={data.racer_results.includes('Car Photos')} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="racer_results2" className="ml-2 block text-sm text-gray-700">
                      Car Photos
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-span-4 mt-7">
                <div className="flex items-center">
                  <input id="upload_replay" name="upload_replay" type="checkbox" onChange={handleCheckChange} checked={data.upload_replay} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="upload_replay" className="ml-2 block text-sm text-gray-700">
                    Upload replay videos
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-y-3 gap-x-5 p-6 border border-gray-300 m-3 rounded-xl">
              <div className="col-span-12">
                <div className="flex items-center my-1.5">
                  <input id="interleave_heats" name="interleave_heats" type="checkbox" onChange={handleCheckChange} checked={data.interleave_heats} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="interleave_heats" className="ml-2 block text-sm text-gray-700">
                    Interleave heats from different groups
                  </label>
                </div>
                <div className="flex items-center my-1.5">
                  <input id="race_by_points" name="race_by_points" type="checkbox" onChange={handleCheckChange} checked={data.race_by_points} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="race_by_points" className="ml-2 block text-sm text-gray-700">
                    Race by points (place) instead of by times?
                  </label>
                </div>
                <div className="flex items-center my-1.5">
                  <input id="single_run" name="single_run" type="checkbox" onChange={handleCheckChange} checked={data.single_run} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="single_run" className="ml-2 block text-sm text-gray-700">
                    Abbreviated single-run-per-car schedule?
                  </label>
                </div>
              </div>
              <div className="col-span-12">
                <p className="text-gray-700 font-medium text-sm mb-2">Scoring method:</p>
                <div className="flex space-x-3">
                  <div className="flex items-center">
                    <input type="radio" id="scoring1" name="scoring_method" value="Average all heat times" onChange={handleChange} checked={data.scoring_method == 'Average all heat times'} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <label htmlFor="scoring1" className="ml-2 text-gray-700">Average all heat times</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="scoring2" name="scoring_method" value="Drop slowest heat" onChange={handleChange} checked={data.scoring_method == 'Drop slowest heat'} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <label htmlFor="scoring2" className="ml-2 text-gray-700">Drop slowest heat</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="scoring3" name="scoring_method" value="Take single fastest heat" onChange={handleChange} checked={data.scoring_method == 'Take single fastest heat'} className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <label htmlFor="scoring3" className="ml-2 text-gray-700">Take single fastest heat</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mr-3 mb-3">
              <PrimaryButton>
                Save Changes
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}

export default SettingIndex;