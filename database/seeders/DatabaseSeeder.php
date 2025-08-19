<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\RaceCategory;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // create default user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // setup a sample event and category for cars
        $event = Event::create([
            'user_id' => $user->id,
            'title' => 'Sample Event',
        ]);

        RaceCategory::create([
            'event_id' => $event->id,
            'name' => 'Sample Category',
        ]);

        // seed racers and cars
        $this->call([
            RacerSeeder::class,
            CarSeeder::class,
        ]);
    }
}
