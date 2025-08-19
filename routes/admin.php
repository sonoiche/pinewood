<?php

use App\Http\Controllers\Admin\DivisionController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Admin\SettingsController;
use Illuminate\Support\Facades\Route;

Route::prefix('client')->middleware('auth')->group(function (){
    Route::resource('divisions', DivisionController::class);
    Route::resource('teams', TeamController::class);
    Route::resource('settings', SettingsController::class);
});