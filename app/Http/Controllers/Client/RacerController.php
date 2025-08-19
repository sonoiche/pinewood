<?php

namespace App\Http\Controllers\Client;

use App\Models\Car;
use App\Models\Den;
use App\Models\Team;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Racer;
use App\Models\Division;
use Illuminate\Http\Request;
use Vinkla\Hashids\Facades\Hashids;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class RacerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['racers'] = Racer::with(['car','team'])->orderBy('lname')->paginate(10);
        return Inertia::render('Client/Racers/Index', $data);
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

        return Inertia::render('Client/Racers/Create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'fname'         => 'required',
                'lname'         => 'required',
                'car_name'      => 'required',
                'team'          => 'required',
                'category_id'   => 'required',
                'event_id'      => 'required'
            ],
            [
                'fname.required'        => 'The first name field is required.',
                'lname.required'        => 'The last name field is required.',
                'team.required'         => 'The team name field is requried.',
                'category_id.required'  => 'The race category field is required.',
                'event_id.requied'      => 'The event field is required.'
            ]
        );

        // check teams
        $team   = Team::firstOrCreate([
            'name'      => $request['team'],
            'event_id'  => $request['event_id'],
        ]);

        $racer  = Racer::create([
            'fname'                 => $request['fname'],
            'lname'                 => $request['lname'],
            'team_id'               => $team->id
        ]);

        // add car information
        $car = new Car();
        $car->user_id       = $racer->id;
        $car->event_id      = $request['event_id'];
        $car->category_id   = $request['category_id'];
        $car->name          = $request['car_name'];
        $car->weight        = $request['weight'];

        if(isset($request['image_path']) && $request['image_path'] !== 'No file chosen' && $request['image_path'] !== null && $request->has('image_path')) {
            $file   = $request->file('image_path');
            $photo  = time().'.'.$file->getClientOriginalExtension();
            $path   = Storage::disk('public')->putFileAs(
                'uploads/cars',
                $file,
                $photo,
                'public'
            );

            $car->image_path = config('app.url') . '/' . $path;
        }

        $car->save();

        return redirect()->to('client/racers')->with('message', 'Racer has been successfully added.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $id = Hashids::decode($id)[0];
        $data['racer']  = Racer::with(['car','team'])->find($id);
        $data['events'] = Event::orderBy('event_date')->orderBy('event_time')->get()->map(function($event) {
            return [
                'value' => $event->id,
                'label' => $event->title . ' - ' . $event->schedule
            ];
        })->toArray();

        return Inertia::render('Client/Racers/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate(
            [
                'fname'         => 'required',
                'lname'         => 'required',
                'car_name'      => 'required',
                'team'          => 'required',
                'category_id'   => 'required',
                'event_id'      => 'required'
            ],
            [
                'fname.required'        => 'The first name field is required.',
                'lname.required'        => 'The last name field is required.',
                'team.required'         => 'The team name field is requried.',
                'category_id.required'  => 'The race category field is required.',
                'event_id.requied'      => 'The event field is required.'
            ]
        );

        $team   = Team::firstOrCreate([
            'name'      => $request['team'],
            'event_id'  => $request['event_id'],
        ]);

        $racer = Racer::find($id);
        $racer->fname               = $request['fname'];
        $racer->lname               = $request['lname'];
        $racer->team_id             = $team->id;
        $racer->save();

        // add car information
        $car = Car::where('user_id', $racer->id)->where('event_id', $request['event_id'])->where('category_id', $request['category_id'])->first();
        $car->user_id       = $racer->id;
        $car->event_id      = $request['event_id'];
        $car->category_id   = $request['category_id'];
        $car->name          = $request['car_name'];
        $car->weight        = $request['weight'];

        if(isset($request['image_path']) && $request['image_path'] !== 'No file chosen' && $request['image_path'] !== null && $request->has('image_path')) {
            $file   = $request->file('image_path');
            $photo  = time().'.'.$file->getClientOriginalExtension();
            $path   = Storage::disk('public')->putFileAs(
                'uploads/cars',
                $file,
                $photo,
                'public'
            );

            $car->image_path = config('app.url') . '/' . $path;
        }

        $car->save();

        return redirect()->to('client/racers')->with('message', 'Racer has been successfully updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $id     = Hashids::decode($id)[0];
        $racer  = Racer::find($id);
        $racer->delete();

        return redirect()->to('client/racers')->with('message', 'Racer has been successfully deleted.');
    }

    private function createTagOption($what, $request)
    {
        switch ($what) {
            case 'team':
                
                $result = Team::updateOrCreate(['name' => $request['label']]);
                return $result->id;

                break;
            
            case 'division':
                
                $result = Division::updateOrCreate(['name' => $request['label']]);
                return $result->id;

                break;

            case 'den':
                
                $result = Den::updateOrCreate(['name' => $request['label']]);
                return $result->id;

                break;
        }
    }
}
