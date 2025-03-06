<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DocumentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Route::get('documents', function () {
    //     return Inertia::render('documents');
    // })->name('documents');

    Route::get('/documents', [DocumentController::class, 'index'])
        ->name('documents.index');

    Route::get('/documents/create', [DocumentController::class, 'create'])
        ->name('documents.create');

    Route::post('/documents', [DocumentController::class, 'store'])
        ->name('documents.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
