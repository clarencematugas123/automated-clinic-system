<?php

namespace App\Http\Controllers;

use App\Models\LabResult;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LabResultController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('lab-results/index', [
            'students' => Student::orderBy('name')->get(['id', 'student_id', 'name']),
            'labResults' => LabResult::with('student:id,student_id,name')->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'test_name' => 'required|string|max:255',
            'result' => 'nullable|string|max:4000',
            'remarks' => 'nullable|string|max:2000',
        ]);

        LabResult::create($validated);

        return to_route('lab-results.index')->with('success', 'Laboratory request recorded successfully.');
    }

    public function updateStatus(Request $request, LabResult $labResult): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,completed',
        ]);

        $labResult->update($validated);

        return back();
    }
}
