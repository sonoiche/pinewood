<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\RaceCategory;
use App\Models\HeatParticipant;
use Vinkla\Hashids\Facades\Hashids;
use Illuminate\Database\Eloquent\Model;

class Heat extends Model
{
    protected $table = "heats";
    protected $fillable = [
        'event_id',
        'heat_number',
        'scheduled_at',
        'status',
        'category_id'
    ];
    protected $appends = ['hashid','scheduled'];

    public function getHashidAttribute()
    {
        return Hashids::encode($this->id);
    }

    public function getScheduledAttribute()
    {
        $scheduled_at = $this->scheduled_at;
        if($scheduled_at) {
            return Carbon::parse($scheduled_at)->format('d F, Y - h:i A');
        }

        return '';
    }

    public function category()
    {
        return $this->belongsTo(RaceCategory::class, 'category_id');
    }

    public function participants()
    {
        return $this->hasMany(HeatParticipant::class, 'heat_id');
    }
}
