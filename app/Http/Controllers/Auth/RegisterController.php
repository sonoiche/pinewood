<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'fname'             => 'required',
                'lname'             => 'required',
                'email'             => 'required|email|unique:users,email',
                'password'          => 'required|min:8',
                'contact_number'    => 'required'
            ],
            [
                'fname.required'    => 'The first name field is required.',
                'lname.required'    => 'The last name field is required.'
            ]
        );

        $user = User::create([
            'fname'             => $request['fname'],
            'lname'             => $request['lname'],
            'email'             => $request['email'],
            'password'          => bcrypt($request['password']),
            'contact_number'    => $request['contact_number'],
            'role'              => $request['role']
        ]);

        Auth::loginUsingId($user->id);

        return redirect()->to('home');
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
