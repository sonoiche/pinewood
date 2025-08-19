<?php

namespace App\Imports;

use App\Models\Award;
use Maatwebsite\Excel\Concerns\ToModel;

class AwardImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Award([
            'title'         => $row['title'],
            'category'      => $row['category'],
            'award_group'   => $row['award_group']
        ]);
    }
}
