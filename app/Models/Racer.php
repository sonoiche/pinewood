<?php

namespace App\Models;

use App\Models\Car;
use Vinkla\Hashids\Facades\Hashids;
use Illuminate\Database\Eloquent\Model;

class Racer extends Model
{
    protected $table = "racers";
    protected $guarded = [];
    protected $appends = ['hashid','fullname'];

    public function getHashidAttribute()
    {
        return Hashids::encode($this->id);
    }

    public function getFullnameAttribute()
    {
        return $this->fname . ' ' . $this->lname;
    }

    public function car()
    {
        return $this->hasOne(Car::class, 'racer_id');
    }

    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id');
    }
}
