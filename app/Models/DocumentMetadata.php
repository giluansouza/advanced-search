<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentMetadata extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'author', 'date', 'type', 'content'];
}
