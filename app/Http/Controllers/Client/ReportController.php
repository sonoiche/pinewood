<?php

namespace App\Http\Controllers\Client;

use App\Models\Heat;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\RaceCategory;
use Illuminate\Http\Request;
use App\Models\HeatParticipant;
use App\Http\Controllers\Controller;

class ReportController extends Controller
{
    public function performance()
    {
        $data['events'] = Event::orderBy('event_date')->orderBy('event_time')->get()->map(function($event) {
            return [
                'value' => $event->id,
                'label' => $event->title . ' - ' . $event->schedule
            ];
        })->toArray();
        
        return Inertia::render('Client/Reports/Performance', $data);
    }

    public function generatePerformance(Request $request)
    {
        $raceClassId = $request['category_id'];
        $raceClass   = $data['category'] = RaceCategory::findOrFail($raceClassId);
        $heats       = Heat::where('category_id', $raceClass->id)->where('status', 'Completed')->pluck('id');

        $results     = HeatParticipant::whereIn('heat_id', $heats)->with('car.racer')->get()->groupBy('car_id');
        $data['summaries']     = [];

        foreach ($results as $racerId => $entries) {
            $totalTime      = 0;
            $totalPoints    = 0;
            $bestTime       = null;

            foreach ($entries as $entry) {
                $place = $entry->position;
                $time  = $entry->finish_time;

                $totalTime += $time;
                $bestTime   = is_null($bestTime) || $time < $bestTime ? $time : $bestTime;

                // Dynamic points
                $count = HeatParticipant::where('heat_id', $entry->heat_id)->count();
                $totalPoints += max(1, $count - $place + 1);
            }

            $data['summaries'][] = [
                'racer'     => $entries[0]->car->racer->fullname ?? '',
                'avg_time'  => round($totalTime / count($entries), 3),
                'best_time' => $bestTime,
                'points'    => $totalPoints,
                'races'     => count($entries),
                'car'       => $entries[0]->car->name
            ];
        }

        return response()->json($data);
    }

    public function heatResults()
    {
        $data['events'] = Event::orderBy('event_date')->orderBy('event_time')->get()->map(function($event) {
            return [
                'value' => $event->id,
                'label' => $event->title . ' - ' . $event->schedule
            ];
        })->toArray();
        
        return Inertia::render('Client/Reports/HeatResults', $data);
    }

    public function generateHeats(Request $request)
    {
        $raceClass = $data['category'] = RaceCategory::findOrFail($request['category_id']);
        $round = $request->input('round');

        $heatsQuery = Heat::with(['participants.car.racer'])->where('category_id', $raceClass->id);
        if ($round) $heatsQuery->where('round_number', $round);

        $data['heats'] = $heatsQuery->orderBy('round_number')->orderBy('heat_number')->get();

        return response()->json($data);
    }

    public function leaderboards()
    {
        $data['events'] = Event::orderBy('event_date')->orderBy('event_time')->get()->map(function($event) {
            return [
                'value' => $event->id,
                'label' => $event->title . ' - ' . $event->schedule
            ];
        })->toArray();
        
        return Inertia::render('Client/Reports/Leaderboards', $data);
    }

    public function generateLeaderboards(Request $request)
    {
        $raceClassId = $request['category_id'];
        $raceClass   = $data['category'] = RaceCategory::findOrFail($raceClassId);
        $heats       = Heat::where('category_id', $raceClass->id)->where('status', 'Completed')->pluck('id');

        $results     = HeatParticipant::whereIn('heat_id', $heats)->with('car.racer')->get()->groupBy('car_id');
        $summaries   = [];

        foreach ($results as $racerId => $entries) {
            $totalTime      = 0;
            $totalPoints    = 0;
            $bestTime       = null;

            foreach ($entries as $entry) {
                $place = $entry->placement;
                $time  = $entry->finish_time;

                $totalTime += $time;
                $bestTime   = is_null($bestTime) || $time < $bestTime ? $time : $bestTime;

                // Dynamic points
                $count = HeatParticipant::where('heat_id', $entry->heat_id)->count();
                $totalPoints += max(1, $count - $place + 1);
            }

            $summaries[] = [
                'racer'     => $entries[0]->car->racer->fullname ?? '',
                'avg_time'  => round($totalTime / count($entries), 3),
                'best_time' => $bestTime,
                'points'    => $totalPoints,
                'races'     => count($entries),
                'car'       => $entries[0]->car->name
            ];
        }

        usort($summaries, function($a, $b) {
            return [$b['points'], $a['avg_time']] <=> [$a['points'], $b['avg_time']];
        });

        $data['summaries'] = $summaries;

        return response()->json($data);
    }
}
