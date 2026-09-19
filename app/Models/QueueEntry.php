<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QueueEntry extends Model
{
    protected $fillable = [
        'student_id',
        'service',
        'status',
        'queue_number',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
