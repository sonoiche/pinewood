<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\Event;
use App\Models\Racer;
use App\Models\RaceCategory;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $event = Event::first();
        $category = RaceCategory::first();
        $racerIds = Racer::pluck('id')->all();

        if (!$event || !$category || empty($racerIds)) {
            return;
        }

        for ($i = 0; $i < 50; $i++) {
            Car::create([
                'racer_id' => $faker->randomElement($racerIds),
                'event_id' => $event->id,
                'category_id' => $category->id,
                'name' => $faker->word() . ' Car',
                'weight' => $faker->numberBetween(100, 200),
                'approved' => $faker->boolean(),
            ]);
        }
    }
}
