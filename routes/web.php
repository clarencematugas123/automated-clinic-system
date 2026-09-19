<?php

use Illuminate\Support\Facades\Route;
use App\Models\Student;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\ConsultationController;

Route::get('/', function () {
    return inertia('welcome');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return inertia('dashboard', [
            'studentCount' => Student::count(),
            'queueCount' => \App\Models\QueueEntry::where('status', 'waiting')->count(),
            'consultationCount' => \App\Models\Consultation::whereDate('created_at', today())->count(),
        ]);
    })->name('dashboard');

    Route::get('/students', [StudentController::class, 'index'])
        ->name('students.index');

    Route::post('/students/search', [StudentController::class, 'search'])
        ->name('students.search');

    Route::post('/students', [StudentController::class, 'store'])
        ->name('students.store');

    Route::get('/queue', [QueueController::class, 'index'])->name('queue.index');
    Route::post('/queue', [QueueController::class, 'store'])->name('queue.store');
    Route::patch('/queue/{queueEntry}/status', [QueueController::class, 'updateStatus'])->name('queue.status');

    Route::get('/consultations', [ConsultationController::class, 'index'])->name('consultations.index');
    Route::post('/consultations', [ConsultationController::class, 'store'])->name('consultations.store');
    Route::patch('/consultations/{consultation}/status', [ConsultationController::class, 'updateStatus'])->name('consultations.status');
});

require __DIR__.'/settings.php';