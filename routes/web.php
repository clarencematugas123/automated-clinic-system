<?php

use Illuminate\Support\Facades\Route;
use App\Models\Student;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\LabResultController;
use App\Http\Controllers\ClearanceController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\InventoryController;

Route::get('/', function () {
    return inertia('welcome');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        $recentActivities = collect([
            ...\App\Models\QueueEntry::with('student:id,name')->latest()->take(3)->get()->map(fn ($entry) => [
                'label' => "Queue · {$entry->service}",
                'status' => str_replace('_', ' ', $entry->status),
                'date' => $entry->created_at->format('M j, Y'),
            ]),
            ...\App\Models\Consultation::with('student:id,name')->latest()->take(3)->get()->map(fn ($consultation) => [
                'label' => "Consultation · {$consultation->service}",
                'status' => str_replace('_', ' ', $consultation->status),
                'date' => $consultation->created_at->format('M j, Y'),
            ]),
            ...\App\Models\LabResult::with('student:id,name')->latest()->take(2)->get()->map(fn ($result) => [
                'label' => "Laboratory · {$result->test_name}",
                'status' => $result->status,
                'date' => $result->created_at->format('M j, Y'),
            ]),
            ...\App\Models\Clearance::with('student:id,name')->latest()->take(2)->get()->map(fn ($clearance) => [
                'label' => "Clearance · {$clearance->clearance_type}",
                'status' => $clearance->status,
                'date' => $clearance->created_at->format('M j, Y'),
            ]),
        ])->take(6)->values();

        return inertia('dashboard', [
            'studentCount' => Student::count(),
            'queueCount' => \App\Models\QueueEntry::where('status', 'waiting')->count(),
            'consultationCount' => \App\Models\Consultation::whereDate('created_at', today())->count(),
            'labPendingCount' => \App\Models\LabResult::where('status', 'pending')->count(),
            'clearancePendingCount' => \App\Models\Clearance::where('status', 'pending')->count(),
            'inventoryLowCount' => \App\Models\InventoryItem::whereColumn('quantity', '<=', 'reorder_level')->count(),
            'recentActivities' => $recentActivities,
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

    Route::get('/lab-results', [LabResultController::class, 'index'])->name('lab-results.index');
    Route::post('/lab-results', [LabResultController::class, 'store'])->name('lab-results.store');
    Route::patch('/lab-results/{labResult}/status', [LabResultController::class, 'updateStatus'])->name('lab-results.status');

    Route::get('/clearance', [ClearanceController::class, 'index'])->name('clearance.index');
    Route::post('/clearance', [ClearanceController::class, 'store'])->name('clearance.store');
    Route::patch('/clearance/{clearance}/status', [ClearanceController::class, 'updateStatus'])->name('clearance.status');

    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

    Route::get('/inventory', [InventoryController::class, 'index'])->name('inventory.index');
    Route::post('/inventory', [InventoryController::class, 'store'])->name('inventory.store');
    Route::patch('/inventory/{inventoryItem}/stock', [InventoryController::class, 'updateStock'])->name('inventory.stock');

    Route::inertia('/security', 'security/index')->name('security.index');
});

require __DIR__.'/settings.php';