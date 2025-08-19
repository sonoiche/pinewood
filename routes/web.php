<?php

use App\Http\Controllers\Admin\DashboardController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Client\AccountController;
use App\Http\Controllers\Client\AwardController;
use App\Http\Controllers\Client\DeckController;
use App\Http\Controllers\Client\EventController;
use App\Http\Controllers\Client\HeatController;
use App\Http\Controllers\Client\RaceCategoryController;
use App\Http\Controllers\Client\RacerController;
use App\Http\Controllers\Client\ReportController;
use App\Http\Controllers\Client\ResultController;
use App\Http\Controllers\Client\RosterController;

Route::get('/', function () {
    return redirect()->to('login');
});

Route::get('/login', function () {
    if(Auth::check()) {
        return Inertia::render('Home');
    }
    return Inertia::render('Auth/Login');
});
Route::post('/login', [LoginController::class, 'store'])->name('login');
Route::delete('/client/login/{id}', [LoginController::class, 'destroy']);

Route::get('/register', function () {
    if(Auth::check()) {
        return Inertia::render('Home');
    }
    return Inertia::render('Auth/Register');
});
Route::post('/register', [RegisterController::class, 'store'])->name('register');

Route::middleware('auth')->group(function (){
    Route::resource('home', HomeController::class);
    Route::prefix('client')->group(function (){
        Route::resource('accounts', AccountController::class);
        Route::resource('racers', RacerController::class);
        Route::get('events-select/{event}', [EventController::class, 'selectCategory']);
        Route::resource('events', EventController::class);

        Route::post('heats-filter', [HeatController::class, 'filter']);
        Route::resource('heats', HeatController::class);

        Route::get('import-awards', [AwardController::class, 'import']);
        Route::post('import-awards', [AwardController::class, 'importAwards']);
        Route::get('auto-awards', [AwardController::class, 'autoAssignFastest']);
        Route::get('awards-list', [AwardController::class, 'awardList']);
        Route::resource('awards', AwardController::class);
        Route::resource('import-roster', RosterController::class);

        Route::get('category-select/{category}', [RaceCategoryController::class, 'selectHeat']);
        Route::resource('race-categories', RaceCategoryController::class);

        Route::post('results-filter', [ResultController::class, 'filter']);
        Route::post('results-summary', [ResultController::class, 'generateSummary']);
        Route::get('results-summary', [ResultController::class, 'summary']);
        Route::resource('results', ResultController::class);

        Route::post('reports/generate-perfomance', [ReportController::class, 'generatePerformance']);
        Route::get('reports/performance', [ReportController::class, 'performance']);
        Route::post('reports/generate-heats', [ReportController::class, 'generateHeats']);
        Route::get('reports/heat-results', [ReportController::class, 'heatResults']);
        Route::post('reports/generate-leaderboards', [ReportController::class, 'generateLeaderboards']);
        Route::get('reports/leaderboards', [ReportController::class, 'leaderboards']);

        Route::resource('dashboard', DashboardController::class);
        Route::resource('on-deck', DeckController::class);
    });
});

require __DIR__.'/admin.php';