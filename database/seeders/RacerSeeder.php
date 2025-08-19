<?php

namespace Database\Seeders;

use App\Models\Racer;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class RacerSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 50; $i++) {
            Racer::create([
                'fname' => $faker->firstName(),
                'lname' => $faker->lastName(),
            ]);
        }
    }
}
