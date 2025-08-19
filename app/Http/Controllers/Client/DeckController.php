<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Heat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Client/Deck/Index');
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
    public function show(Request $request, string $id)
    {
        $category_id = $request['category_id'];
        $heat_ids    = $request['heat_ids'] ?? $id;
        $heat        = Heat::with(['participants.car.racer'])->where('category_id', $category_id)
            ->when($heat_ids, function($query, $heat_ids) {
                $ids = explode(',', $heat_ids);
                return $query->whereNotIn('id', $ids);
            })
            ->where('status', 'Pending')
            ->orderBy('heat_number')
            ->first();

        $data['heat']           = $heat;

        return response()->json($data);
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
