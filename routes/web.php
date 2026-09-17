<?php

use Illuminate\Support\Facades\Route;
use App\Models\Student;
use App\Http\Controllers\StudentController;

Route::get('/', function () {
    return inertia('welcome');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return inertia('dashboard', [
            'studentCount' => Student::count(),
        ]);
    })->name('dashboard');

    Route::get('/students', [StudentController::class, 'index'])
        ->name('students.index');

    Route::post('/students/search', [StudentController::class, 'search'])
        ->name('students.search');

    Route::post('/students', [StudentController::class, 'store'])
        ->name('students.store');
});

require __DIR__.'/settings.php';