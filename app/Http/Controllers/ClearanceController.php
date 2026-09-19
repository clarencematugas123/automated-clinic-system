<?php

namespace App\Http\Controllers;

use App\Models\Clearance;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClearanceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('clearance/index', [
            'students' => Student::orderBy('name')->get(['id', 'student_id', 'name']),
            'clearances' => Clearance::with('student:id,student_id,name')->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'clearance_type' => 'required|string|in:Medical,Dental,General',
            'remarks' => 'nullable|string|max:2000',
        ]);

        Clearance::create($validated);

        return to_route('clearance.index')->with('success', 'Clearance request recorded successfully.');
    }

    public function updateStatus(Request $request, Clearance $clearance): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $clearance->update($validated);

        return back();
    }
}
