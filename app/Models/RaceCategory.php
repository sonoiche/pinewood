<?php

namespace App\Models;

use App\Models\Event;
use Vinkla\Hashids\Facades\Hashids;
use Illuminate\Database\Eloquent\Model;

class RaceCategory extends Model
{
    protected $table = "race_categories";
    protected $guarded = [];
    protected $appends = ['hashid'];

    public function getHashidAttribute()
    {
        return Hashids::encode($this->id);
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }
}
