<?php

namespace App\Http\Controllers\Client;

use Illuminate\Http\Request;
use Vinkla\Hashids\Facades\Hashids;
use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Event;
use App\Models\Heat;
use App\Models\RaceCategory;
use Inertia\Inertia;

class RaceCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $event_id = $data['event_id'] = Hashids::decode($request['event_id'])[0];
        $data['event']  = Event::find($event_id);

        return Inertia::render('Client/RaceCategory/Create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name'          => 'required',
                'description'   => 'required'
            ],
            [
                'name.required' => 'The class name field is required.'
            ]
        );

        $category = new RaceCategory();
        $category->event_id     = $request['event_id'];
        $category->name         = $request['name'];
        $category->max_weight   = $request['max_weight'];
        $category->min_age      = $request['min_age'];
        $category->max_age      = $request['max_age'];
        $category->description  = $request['description'];
        $category->save();

        $event_id = Hashids::encode($category->event_id);

        return redirect()->to('/client/events/' .$event_id. '/edit')->with('message', 'Race class has been added.');
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
        $data['category']   = $category = RaceCategory::find($id);
        $data['event']      = Event::find($category->event_id);

        return Inertia::render('Client/RaceCategory/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $id = Hashids::decode($id)[0];
        $request->validate(
            [
                'name'          => 'required',
                'description'   => 'required'
            ],
            [
                'name.required' => 'The class name field is required.'
            ]
        );

        $category = RaceCategory::find($id);
        $category->name         = $request['name'];
        $category->max_weight   = $request['max_weight'];
        $category->min_age      = $request['min_age'];
        $category->max_age      = $request['max_age'];
        $category->description  = $request['description'];
        $category->save();

        $event_id = Hashids::encode($category->event_id);

        return redirect()->to('/client/events/' .$event_id. '/edit')->with('message', 'Race class has been updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $id = Hashids::decode($id)[0];
        $category = RaceCategory::find($id);
        $category->delete();

        return redirect()->back()->with('message', 'Race class has been deleted.');
    }

    public function selectHeat($category_id)
    {
        $data['heats'] = Heat::where('category_id', $category_id)->orderBy('heat_number')->get()->map(function($heat) {
            return [
                'value' => $heat->id,
                'label' => 'Heat #' . $heat->heat_number
            ];
        })->toArray();

        $data['racers'] = Car::with(['racer'])->where('category_id', $category_id)->orderBy('name')->get()->map(function($car) {
            return [
                'value' => $car->id,
                'label' => $car->name . ' (' .$car->racer->fullname. ')'
            ];
        })->toArray();

        return response()->json($data);
    }
}
