<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Vinkla\Hashids\Facades\Hashids;

class Event extends Model
{
    protected $table = "events";
    protected $guarded = [];
    protected $appends = ['hashid','schedule'];

    public function getHashidAttribute()
    {
        return Hashids::encode($this->id);
    }

    public function getScheduleAttribute()
    {
        $date = $this->event_date;
        $time = $this->event_time;

        if($date && $time) {
            return Carbon::parse($date)->format('d F, Y') . ' ' . Carbon::parse($time)->format('h:i A');
        }

        return '';
    }
}
