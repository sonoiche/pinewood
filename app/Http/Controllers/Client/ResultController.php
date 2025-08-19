<?php

namespace App\Http\Controllers\Client;

use App\Events\HeatResultsUpdated;
use App\Models\Heat;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Models\HeatParticipant;
use App\Models\RaceResultSummary;
use App\Http\Controllers\Controller;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['events'] = Event::orderBy('event_date')->orderBy('event_time')->get()->map(function($event) {
            return [
                'value' => $event->id,
                'label' => $event->title . ' - ' . $event->schedule
            ];
        })->toArray();
        
        return Inertia::render('Client/Results/Index', $data);
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
        $category_id = $request['category_id'];
        $heat_id     = $request['heat_id'];
        $results     = $request['results'];
        $heat_ids    = $request['heat_ids'];
        $heat        = Heat::find($heat_id);

        foreach ($results as $participant_id => $data) {
            HeatParticipant::where('id', $participant_id)->update([
                'finish_time'   => $data['finish_time'],
                'placement'     => $data['placement'],
            ]);
        }

        $heat->status = 'Completed';
        $heat->save();

        // broadcast
        broadcast(new HeatResultsUpdated($heat_id, $category_id, $heat_ids))->toOthers();

        $data['heat']    = $active_heat = Heat::with(['participants.car.racer'])->where('category_id', $category_id)->whereNotIn('id', $heat_ids)->orderBy('heat_number')->first();
        $active_heat->status = 'Running';
        $active_heat->save(); 
        
        $data['message'] = 'Race Summary has been saved.';

        return response()->json($data);
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

    public function filter(Request $request)
    {
        $heat_id        = $request['heat_id'];
        $category_id    = $request['category_id'];
        $heat_ids       = $request['heat_ids'] ?? $heat_id;

        $data['heat']   = $heat = Heat::with(['participants.car.racer'])->find($heat_id);
        $heat->status   = 'Running';
        $heat->save(); 

        // broadcast
        broadcast(new HeatResultsUpdated($heat_id, $category_id, $heat_ids))->toOthers();

        return response()->json($data);
    }

    public function summary()
    {
        $data['events'] = Event::orderBy('event_date')->orderBy('event_time')->get()->map(function($event) {
            return [
                'value' => $event->id,
                'label' => $event->title . ' - ' . $event->schedule
            ];
        })->toArray();

        return Inertia::render('Client/Results/Summary', $data);
    }

    public function generateSummary(Request $request)
    {
        $category_id = $request['category_id'];
        $event_id    = $request['event_id'];

        $event       = Event::find($event_id);

        $carResults  = HeatParticipant::whereHas('heat', function ($q) use ($category_id) {
            $q->where('category_id', $category_id)->where('status', 'completed');
        })->get()->groupBy('car_id');

        $summary = [];

        foreach ($carResults as $carId => $results) {
            $totalTime      = 0;
            $totalPoints    = 0;
            $bestTime       = null;

            foreach ($results as $result) {
                $time = $result->finish_time;
                $place = $result->placement;

                $totalTime += $time;
                $participantsCount = HeatParticipant::where('heat_id', $result->heat_id)->count();
                $totalPoints += max(1, $participantsCount - $place + 1);

                // points if only the top 3
                // $totalPoints += match ($place) {
                //     1 => 4,
                //     2 => 3,
                //     3 => 2,
                //     default => 1
                // };

                if (is_null($bestTime) || $time < $bestTime) {
                    $bestTime = $time;
                }
            }

            $avgTime = $totalTime / count($results);

            $summary[] = [
                'event_id'      => $event->id,
                'category_id'   => $category_id,
                'car_id'        => $carId,
                'average_time'  => $avgTime,
                'best_time'     => $bestTime,
                'total_points'  => $totalPoints,
                'races_count'   => count($results),
            ];
        }

        // Store results
        RaceResultSummary::where('event_id', $event->id)
            ->where('category_id', $category_id)
            ->delete(); // clear old

        foreach ($summary as $data) {
            RaceResultSummary::create($data);
        }

        // Update rank
        $ranked = collect($summary)->sortBy('average_time')->values();
        foreach ($ranked as $i => $data) {
            RaceResultSummary::where('event_id', $event->id)
                ->where('category_id', $category_id)
                ->where('car_id', $data['car_id'])
                ->update(['rank' => $i + 1]);
        }

        $data['summaries'] = RaceResultSummary::with(['car.racer'])
            ->where('event_id', $event->id)
            ->where('category_id', $category_id)
            ->get();

        return response()->json($data);
    }
}
