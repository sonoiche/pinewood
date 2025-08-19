<?php

namespace App\Models;

use App\Models\Car;
use Illuminate\Database\Eloquent\Model;

class RaceResultSummary extends Model
{
    protected $table = "race_result_summaries";
    protected $guarded = [];

    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id');
    }
}
