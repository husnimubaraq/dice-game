<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Leaderboard extends Model
{
    use HasFactory;

    protected $fillable = [
        'history_id',
        'name',
        'score',
        'image'
    ];

    public function history(): BelongsTo
    {
        return $this->belongsTo(History::class, 'history_id');
    }

}
