<?php

namespace App\Models;

use App\Models\Car;
use App\Models\Event;
use App\Models\RaceCategory;
use Vinkla\Hashids\Facades\Hashids;
use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    protected $table = "awards";
    protected $guarded = [];
    protected $appends = ['hashid'];

    public function getHashidAttribute()
    {
        return Hashids::encode($this->id);
    }

    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function category()
    {
        return $this->belongsTo(RaceCategory::class, 'category_id');
    }
}
