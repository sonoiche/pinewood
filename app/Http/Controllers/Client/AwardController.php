<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use App\Models\Award;
use App\Models\Event;
use App\Imports\AwardImport;
use Illuminate\Http\Request;
use App\Models\RaceResultSummary;
use Vinkla\Hashids\Facades\Hashids;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;

class AwardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['awards'] = Award::orderBy('title')->paginate(10);
        return Inertia::render('Client/Awards/Index', $data);
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

        return Inertia::render('Client/Awards/Create', $data);
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
                'title'         => 'required',
                'car_id'        => 'required'
            ],
            [
                'event_id.required'     => 'The event field is required.',
                'category_id.required'  => 'The race category field is required.',
                'car_id.required'       => 'The car racer field is required.'
            ]
        );

        Award::create([
            'event_id'      => $request['event_id'],
            'category_id'   => $request['category_id'],
            'title'         => $request['title'],
            'description'   => $request['description'],
            'car_id'        => $request['car_id']
        ]);

        return redirect()->to('client/awards')->with('message', 'Award has been successfully added.');
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
        $data['events'] = Event::orderBy('event_date')->orderBy('event_time')->get()->map(function($event) {
            return [
                'value' => $event->id,
                'label' => $event->title . ' - ' . $event->schedule
            ];
        })->toArray();
        $id             = Hashids::decode($id)[0];
        $data['award']  = Award::find($id);

        return Inertia::render('Client/Awards/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate(
            [
                'event_id'      => 'required',
                'category_id'   => 'required',
                'title'         => 'required',
                'car_id'        => 'required'
            ],
            [
                'event_id.required'     => 'The event field is required.',
                'category_id.required'  => 'The race category field is required.',
                'car_id.required'       => 'The car racer field is required.'
            ]
        );

        $award = Award::find($id);
        $award->title         = $request['title'];
        $award->event_id      = $request['event_id'];
        $award->category_id   = $request['category_id'];
        $award->description   = $request['description'];
        $award->car_id        = $request['car_id'];
        $award->save();

        return redirect()->to('client/awards')->with('message', 'Award has been successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $id     = Hashids::decode($id)[0];
        $award  = Award::find($id);
        $award->delete();

        return redirect()->to('client/awards')->with('message', 'Award has been successfully deleted.');
    }

    public function import()
    {
        return Inertia::render('Client/Awards/Import');
    }

    public function importAwards(Request $request)
    {
        $file = $request->file('file');
        $document = time().'.'.$file->getClientOriginalExtension();
        
        $path = Storage::disk('public')->putFileAs(
            'uploads/awards',
            $file,
            $document,
            'public'
        );

        $filePath = storage_path('app/public/' . $path);
        Excel::import(new AwardImport, $filePath);

        return redirect()->to('/client/awards')->with('message', 'Awards has been imported.');
    }

    public function autoAssignFastest(Request $request)
    {
        $event_id       = $request['event_id'];
        $category_id    = $request['category_id'];

        $fastest = RaceResultSummary::where('event_id', $event_id)
            ->where('category_id', $category_id)
            ->orderBy('average_time', 'asc')
            ->first();

        if (!$fastest) {
            return back()->with('error', 'No race results found for this category.');
        }

        $existing = Award::where('event_id', $event_id)
            ->where('category_id', $category_id)
            ->where('title', 'Fastest Car')
            ->first();

        if ($existing) {
            return back()->with('info', 'Fastest Car award already assigned.');
        }

        Award::create([
            'event_id'      => $event_id,
            'category_id'   => $category_id,
            'car_id'        => $fastest->car_id,
            'title'         => 'Fastest Car',
            'description'   => 'Awarded to the car with the best average time.',
        ]);

        return back()->with('success', 'Fastest Car award assigned!');
    }

    public function awardList()
    {
        $data['awards'] = Award::with(['car.racer','event','category'])->orderBy('title')->paginate(10);
        return response()->json($data);
    }
}
