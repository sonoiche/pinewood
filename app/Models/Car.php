<?php

namespace App\Models;

use App\Models\Racer;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $table = "cars";
    protected $guarded = [];

    public function racer()
    {
        return $this->belongsTo(Racer::class, 'user_id');
    }
}
