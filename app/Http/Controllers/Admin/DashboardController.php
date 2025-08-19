<?php

namespace App\Http\Controllers\Admin;

use App\Models\Car;
use App\Models\Heat;
use App\Models\Event;
use App\Models\RaceCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['eventsCount']        = Event::count();
        $data['categoriesCount']    = RaceCategory::count();
        $data['carsCount']          = Car::count();
        $data['heatsCount']         = Heat::count();
        $data['completedHeats']     = Heat::where('status', 'completed')->count();

        return response()->json($data);
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
        //
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
