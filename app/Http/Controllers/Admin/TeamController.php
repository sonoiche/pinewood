<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['teams'] = Team::all();
        return Inertia::render('Admin/Teams/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Teams/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            ['name' => 'required'],
            ['name.requirede' => 'The team name field is required.']
        );

        Team::create($request->all());

        $message = 'Team successfully added.';
        return redirect()->to('/client/teams')->with('message', $message);
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
        $data['team'] = Team::find($id);
        return Inertia::render('Admin/Teams/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate(
            ['name' => 'required'],
            ['name.requirede' => 'The team name field is required.']
        );

        Team::find($id)->update($request->all());

        $message = 'Team successfully udpated.';
        return redirect()->to('/client/teams')->with('message', $message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $team = Team::find($id);
        $team->delete();
        $message = 'Team successfully deleted.';

        return redirect()->to('/client/teams')->with('message', $message);
    }
}
