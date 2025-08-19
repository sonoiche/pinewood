<?php

namespace App\Http\Controllers\Client;

use Carbon\Carbon;
use App\Models\Car;
use App\Models\Heat;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Models\HeatParticipant;
use Vinkla\Hashids\Facades\Hashids;
use App\Http\Controllers\Controller;
use App\Models\RaceCategory;

class HeatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['heats'] = [];
        $data['events'] = Event::orderBy('event_date')->orderBy('event_time')->get()->map(function($event) {
            return [
                'value' => $event->id,
                'label' => $event->title
            ];
        })->toArray();

        return Inertia::render('Client/Heats/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['events'] = Event::orderBy('event_date')->orderBy('event_time')->get()->map(function($event) {
            return [
                'value' => $event->id,
                'label' => $event->title . ' - ' . $event->schedule
            ];
        })->toArray();

        return Inertia::render('Client/Heats/Create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'event_id'      => 'required',
                'category_id'   => 'required',
                'status'        => 'required'
            ],
            [
                'event_id.required'     => 'The event field is required.',
                'category_id.required'  => 'The race category field is required.'
            ]
        );

        $categoryId     = $request['category_id'];
        $eventId        = $request['event_id'];

        $event          = Event::find($eventId);
        $cars           = Car::where('category_id', $categoryId)->get()->shuffle();
        $totalRacers    = $cars->count();
        $lanes          = $rounds = $event->num_lanes;
        $schedule       = Carbon::parse($event->event_date . ' ' . $event->event_time);

        if($totalRacers == 0) {
            throw new \Exception("No racers found for this class.");
        }

        $heatCount  = 1;
        $racerPool  = $cars->toArray();

        for ($round = 1; $round <= $rounds; $round++) {
            shuffle($racerPool);
            $chunks = array_chunk($racerPool, $lanes);

            foreach ($chunks as $heatGroup) {
                $heat = Heat::create([
                    'category_id'   => $categoryId,
                    'heat_number'   => $heatCount++,
                    'round_number'  => $round,
                    'scheduled_at'  => $schedule->addMinutes(($heatCount - 1) * 5),
                ]);

                foreach ($heatGroup as $i => $racerData) {
                    HeatParticipant::create([
                        'heat_id'       => $heat->id,
                        'heat_number'   => $heatCount++,
                        'car_id'        => $racerData['id'],
                        'lane_number'   => $i + 1,
                    ]);
                }
            }
        }

        return redirect()->to('client/heats?category_id=' . Hashids::encode($categoryId))->with('message', 'Heat has been successfully added.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $id = Hashids::decode($id)[0];
        $data['heat'] = Heat::with(['participants.car.racer'])->find($id);

        return Inertia::render('Client/Heats/Show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $data['heat'] = Heat::find($id);
        return Inertia::render('Client/Heats/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'event_id'      => 'required',
            'heat_number'   => 'required',
            'scheduled_at'  => 'required',
            'status'        => 'required'
        ]);

        $heat = Heat::find($id);
        $heat->event_id     = $request['event_id'];
        $heat->heat_number  = $request['heat_number'];
        $heat->scheduled_at = $request['scheduled_at'];
        $heat->status       = $request['status'];
        $heat->save();

        return redirect()->to('client/heats')->with('message', 'Heat has been successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $heat = Heat::find($id);
        $heat->delete();

        return redirect()->to('client/heats')->with('message', 'Heat has been successfully deleted.');
    }

    public function filter(Request $request)
    {
        $category_id        = Hashids::decode($request['category_id'])[0];
        $data['category']   = RaceCategory::find($category_id);
        $data['heats']      = Heat::with(['category.event','participants' => function($query) {
                $query->orderBy('lane_number');
            },'participants.car.racer.team'])
            ->where('category_id', $category_id)
            ->latest()->get();

        return response()->json($data);
    }
}
