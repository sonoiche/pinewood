<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Client/Account/Index');
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
        $request->validate([
            'fname'         => 'required',
            'lname'         => 'required',
            'email'         => 'required|email|unique:users,email,' . (($id) ? $id : null) . ',id',
            'password'      => 'nullable|sometimes|min:8|confirmed'
        ]);

        $user = User::find($id);
        $user->fname = $request['fname'];
        $user->lname = $request['lname'];
        $user->email = $request['email'];

        if(isset($request['password'])) {
            $user->password = bcrypt($request['password']);
        }

        $user->save();

        return redirect()->to('/client/accounts')->with('message', 'Account has been updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
