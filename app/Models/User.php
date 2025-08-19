<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'fname',
        'mname',
        'lname',
        'email',
        'password',
        'role',
        'status',
        'contact_number',
        'birthdate',
        'photo',
        'address',
        'city',
        'state'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
    protected $appends = ['fullname','display_photo'];

    public function getFullnameAttribute()
    {
        return $this->fname . ' ' . $this->lname;
    }

    public function getDisplayPhotoAttribute()
    {
        $photo = $this->photo;
        if($photo) {
            return url($photo);
        }

        return "https://ui-avatars.com/api/?name=$this->fullname&background=random";
    }
}
