<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConsultationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('consultations/index', [
            'students' => Student::orderBy('name')->get(['id', 'student_id', 'name']),
            'consultations' => Consultation::with('student:id,student_id,name')
                ->whereDate('created_at', today())
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'service' => 'required|string|in:Medical,Dental',
            'complaint' => 'required|string|max:2000',
            'diagnosis' => 'nullable|string|max:2000',
            'notes' => 'nullable|string|max:2000',
        ]);

        Consultation::create($validated);

        return to_route('consultations.index')->with('success', 'Consultation recorded successfully.');
    }

    public function updateStatus(Request $request, Consultation $consultation): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:waiting,in_progress,completed',
        ]);

        $consultation->update($validated);

        return back();
    }
}
