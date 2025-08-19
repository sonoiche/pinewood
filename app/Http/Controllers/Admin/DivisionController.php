<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Division;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DivisionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['divisions'] = Division::all();
        return Inertia::render('Admin/Divisions/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Divisions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            ['name' => 'required'],
            ['name.requirede' => 'The division name field is required.']
        );

        Division::create($request->all());

        $message = 'Division successfully added.';
        return redirect()->to('/client/divisions')->with('message', $message);
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
        $data['division'] = Division::find($id);
        return Inertia::render('Admin/Divisions/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate(
            ['name' => 'required'],
            ['name.requirede' => 'The division name field is required.']
        );

        Division::find($id)->update($request->all());

        $message = 'Division successfully udpated.';
        return redirect()->to('/client/divisions')->with('message', $message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $division = Division::find($id);
        $division->delete();
        $message = 'Division successfully deleted.';

        return redirect()->to('/client/divisions')->with('message', $message);
    }
}
