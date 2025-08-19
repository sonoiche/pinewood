<?php

namespace App\Imports;

use App\Models\Racer;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class RacerImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Racer([
            'fname'                 => $row['first_name'] ?? '',
            'lname'                 => $row['last_name'] ?? '',
            'car_name'              => $row['car_name'] ?? '',
            'car_number'            => $row['car_number'] ?? '',
            'status'                => 'Active',
            'team_id'               => 1,
            'division_id'           => 1,
            'den_id'                => 1,
            'trophy_eligibility'    => 0
        ]);
    }
}
