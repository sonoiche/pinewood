<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use App\Models\Event;
use App\Models\RaceCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Vinkla\Hashids\Facades\Hashids;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['events'] = Event::latest()->paginate(10);
        return Inertia::render('Client/Events/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Client/Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'title'             => 'required',
                'event_date'        => 'required',
                'event_time'        => 'required',
                'event_location'    => 'required'
            ],
            [
                'title.required'        => 'The event title field is required.'
            ]
        );

        $event = new Event();
        $event->title           = $request['title'];
        $event->event_date      = $request['event_date'];
        $event->event_time      = $request['event_time'];
        $event->event_location  = $request['event_location'];
        $event->user_id         = $request['user_id'];
        $event->details         = $request['details'];
        $event->num_lanes       = $request['num_lanes'];
        $event->num_laps        = $request['num_laps'];
        $event->status          = $request['status'];

        if(isset($request['poster_photo']) && $request['poster_photo'] !== 'No file chosen' && $request['poster_photo'] !== null && $request->has('poster_photo')) {
            $file  = $request->file('poster_photo');
            $photo =  time().'.'.$file->getClientOriginalExtension();
            $path = Storage::disk('public')->putFileAs(
                'uploads/events',
                $file,
                $photo,
                'public'
            );

            $event->poster_photo = config('app.url') . $path;
        }

        $event->save();

        return redirect()->to('client/events')->with('message', 'Event has been successfully added.');
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
        $id = Hashids::decode($id)[0];
        $data['event']      = Event::find($id);
        $data['categories'] = RaceCategory::where('event_id', $id)->get();

        return Inertia::render('Client/Events/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $id = Hashids::decode($id)[0];
        $request->validate(
            [
                'title'             => 'required',
                'event_date'        => 'required',
                'event_time'        => 'required',
                'event_location'    => 'required'
            ],
            [
                'title.required'        => 'The event title field is required.'
            ]
        );

        $event = Event::find($id);
        $event->title           = $request['title'];
        $event->event_date      = $request['event_date'];
        $event->event_time      = $request['event_time'];
        $event->event_location  = $request['event_location'];
        $event->details         = $request['details'];
        $event->num_lanes       = $request['num_lanes'];
        $event->num_laps        = $request['num_laps'];

        if(isset($request['poster_photo']) && $request['poster_photo'] !== 'No file chosen' && $request['poster_photo'] !== null && $request->has('poster_photo')) {
            $file  = $request->file('poster_photo');
            $photo =  time().'.'.$file->getClientOriginalExtension();
            $path = Storage::disk('public')->putFileAs(
                'uploads/events',
                $file,
                $photo,
                'public'
            );

            $event->poster_photo = config('app.url') . $path;
        }

        $event->save();

        return redirect()->to('client/events')->with('message', 'Event has been successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $id = Hashids::decode($id)[0];
        $event = Event::find($id);

        // delete poster
        if($event->poster_photo !== null && $event->poster_photo !== '') {
            Storage::disk('public')->delete('uploads/events/' . basename($event->poster_photo));
        }

        $event->delete();

        return redirect()->to('client/events')->with('message', 'Event has been successfully deleted.');
    }

    public function selectCategory($event_id)
    {
        $data['categories'] = RaceCategory::where('event_id', $event_id)->orderBy('name')->get()->map(function($category) {
            return [
                'value' => $category->id,
                'label' => $category->name
            ];
        })->toArray();

        return response()->json($data);
    }
}
