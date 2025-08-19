<?php

namespace App\Models;

use App\Models\Car;
use App\Models\Heat;
use Illuminate\Database\Eloquent\Model;

class HeatParticipant extends Model
{
    protected $table = "heat_participants";
    protected $guarded = [];

    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id');
    }

    public function heat()
    {
        return $this->belongsTo(Heat::class, 'heat_id');
    }
}
