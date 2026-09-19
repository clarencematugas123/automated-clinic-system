<?php

namespace App\Http\Controllers;

use App\Models\QueueEntry;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QueueController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('queue/index', [
            'students' => Student::orderBy('name')->get(['id', 'student_id', 'name']),
            'queueEntries' => QueueEntry::with('student:id,student_id,name')
                ->whereDate('created_at', today())
                ->orderBy('queue_number')
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'service' => 'required|string|in:Medical,Dental,Laboratory,Clearance',
        ]);

        $alreadyQueued = QueueEntry::where('student_id', $validated['student_id'])
            ->whereDate('created_at', today())
            ->whereIn('status', ['waiting', 'in_progress'])
            ->exists();

        if ($alreadyQueued) {
            return back()->withErrors(['student_id' => 'This student is already in the active queue.']);
        }

        QueueEntry::create([
            ...$validated,
            'queue_number' => (QueueEntry::whereDate('created_at', today())->max('queue_number') ?? 0) + 1,
        ]);

        return to_route('queue.index')->with('success', 'Student added to the queue.');
    }

    public function updateStatus(Request $request, QueueEntry $queueEntry): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:waiting,in_progress,completed,cancelled',
        ]);

        $queueEntry->update($validated);

        return back();
    }
}
