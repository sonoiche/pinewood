<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\RaceSetting;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['setup'] = RaceSetting::find(1) ?? [];
        return Inertia::render('Admin/Settings/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        RaceSetting::updateOrCreate(
            ['id'   => 1],
            [
                'warn_timer'            => $request['warn_timer'],
                'lane_reverse'          => $request['lane_reverse'],
                'track_lanes'           => $request['track_lanes'],
                'track_length'          => $request['track_length'],
                'precision'             => $request['precision'],
                'heat_linger'           => $request['heat_linger'],
                'full_roster'           => $request['full_roster'],
                'sub_division'          => $request['sub_division'],
                'racer_name'            => $request['racer_name'],
                'assigned_car_number'   => $request['assigned_car_number'],
                'place_increments'      => $request['place_increments'],
                'trophies_pack_level'   => $request['trophies_pack_level'],
                'trophies_per_group'    => $request['trophies_per_group'],
                'trophies_per_subgroup' => $request['trophies_per_subgroup'],
                'one_trophy_per_race'   => $request['one_trophy_per_race'],
                'exclusive_scout'       => $request['exclusive_scout'],
                'scout_award_name'      => $request['scout_award_name'],
                'image_set'             => $request['image_set'],
                'racing_display'        => $request['racing_display'],
                'deck_display'          => $request['deck_display'],
                'racer_results'         => is_array($request['racer_results']) ? implode(',', $request['racer_results']) : $request['racer_results'],
                'upload_replay'         => $request['upload_replay'],
                'interleave_heats'      => $request['interleave_heats'],
                'race_by_points'        => $request['race_by_points'],
                'single_run'            => $request['single_run'],
                'scoring_method'        => $request['scoring_method']
            ]
        );

        return redirect()->to('/client/settings')->with('message', 'Race settings has been updated.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
