<?php

namespace App\Http\Controllers;

use App\Models\Clearance;
use App\Models\Consultation;
use App\Models\LabResult;
use App\Models\QueueEntry;
use App\Models\Student;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('reports/index', [
            'summary' => [
                'students' => Student::count(),
                'queueToday' => QueueEntry::whereDate('created_at', today())->count(),
                'consultationsToday' => Consultation::whereDate('created_at', today())->count(),
                'labPending' => LabResult::where('status', 'pending')->count(),
                'clearancePending' => Clearance::where('status', 'pending')->count(),
            ],
            'statusBreakdown' => [
                'queueWaiting' => QueueEntry::where('status', 'waiting')->count(),
                'consultationsCompleted' => Consultation::where('status', 'completed')->count(),
                'labCompleted' => LabResult::where('status', 'completed')->count(),
                'clearancesApproved' => Clearance::where('status', 'approved')->count(),
            ],
        ]);
    }
}
