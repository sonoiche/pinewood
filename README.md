# Pinewood Derby Heat Management and Race Monitoring Module

This deliverable contains the complete implementation of the **Heat Management and Race Monitoring System** for the Pinewood Derby Race web application. It is designed to streamline the process of running heats, managing race results, and providing real-time race visibility through an intuitive user interface.

---

## 📌 Features

- **Start & End Heat Flow**: Admins can start a heat, enter results (place or time), and end the heat. Automatically loads the next heat.
- **Manual Entry Support**: Allows race officials to manually enter placement and/or timing data.
- **Real-Time “On Deck” Monitor**: Displays upcoming racers to both officials and spectators.
- **Heat History & Results Summary**: Supports reviewing past heats and exporting race summaries.
- **Data Validation**: Prevents duplicate placements or invalid values on result entry.
- **Modular Architecture**: Clean separation of backend (Laravel) and frontend (ReactJS).

---

## 📂 Project Structure
### Since Laravel serves as both the backend and the foundation for the frontend, everything is typically kept inside a single project folder in a Laravel + React project setup.
```
pinewood-derby-heat-management-module/
│
├── app/ # Laravel app code (Models, Controllers) - (Backend)
├── database/ # Migrations and seeders - (Backend)
├── public/ # Public web assets
├── resources/
│ ├── js/ # ReactJS components and pages - (Frontend)
│ └── views/ # Blade templates - (Frontend)
├── routes/ # Laravel routes (web.php, api.php) - (Backend)
├── storage/ - (Backend)
├── tests/ - (Backend)
├── screenshots/ # Feature screenshots
├── pinewood_derby_sample_data.json # Sample race data (provided)
└── README.md # Project documentation
```
---

## 🔄 Using the Sample JSON Data

The file pinewood_derby_sample_data.json contains mock data for development and testing purposes. It includes:

- 17 racers with car names and profiles
- 5 race lanes
- 10 laps worth of heat schedules with racer assignments

You can use this file in two ways:

## Option A: Load via Seeder (Recommended)

1. Move the JSON file to the database/data/ folder (create if needed).
2. Create a custom seeder, for example: php artisan make:seeder SampleRaceDataSeeder
3. In the seeder, load and parse the JSON like so:
```
use Illuminate\Support\Facades\File;

public function run()
{
    $json = File::get(database_path('data/pinewood_derby_sample_data.json'));
    $data = json_decode($json, true);

    foreach ($data['racers'] as $racer) {
        \App\Models\Racer::create($racer);
    }

    foreach ($data['heats'] as $heat) {
        \App\Models\Heat::create($heat);
    }
}

```
4. Register the seeder in DatabaseSeeder.php and run:
```
php artisan db:seed
```

## Option B: Load Directly in UI (For Static Demos)

If you're not using a database:

1. Place the file in public/data/ or another accessible location.
2. In your React component, fetch it on mount:
```
useEffect(() => {
  fetch('/data/pinewood_derby_sample_data.json')
    .then(response => response.json())
    .then(data => {
        setRacers(data.racers);
        setHeats(data.heats);
    });
}, []);
```
---

## ⚙️ Setup Instructions

### 1. Backend (Laravel)
**Requirements**: PHP 8+, Composer, MySQL

```
cd pinewood_derby_web_application
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### 2. Frontend (ReactJS)
**Requirements**: NodeJS 16
```
cd pinewood_derby_web_application
npm install
npm run dev
```

### 3. Database Seeding
Populate the database with sample racers and cars:
```
php artisan migrate:refresh --seed
```
This seeds 50 racers and 50 cars and also creates a default user you can use to log in:

- **Email**: `jelson@saperemarketing.com`
- **Password**: `Pa$$w0rd2025`

## Step-by-step Instructions on How to run PHP tests
1. Open Terminal and navigate to laravel project
`cd pinewood_derby_web_application`
2. Run all Tests
To run all tests in the `tests/` folder:
```
php artisan test
```
Alternatively: Use PHPUnit Directly
```
vendor/bin/phpunit
```
3. Run a specific test file
```
php artisan test tests/Feature/ExampleTest.php
```
4. Run a Specific Test Method in a File
```
php artisan test --filter test_method_name
```

## Example Test Command Output
```
PASS  Tests\Feature\ExampleTest
✓ basic test

Tests:  1 passed
Time:   0.45s
```