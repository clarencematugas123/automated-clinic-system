<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(): Response
    {
        $students = Student::latest()->get(['id', 'student_id', 'name', 'course', 'year_level']);

        return Inertia::render('students/index', [
            'students' => $students,
        ]);
    }

    public function search(Request $request): Response
    {
        $request->validate([
            'student_id' => 'required|string',
        ]);

        $student = Student::where('student_id', $request->student_id)->first();

        if (! $student) {
            return Inertia::render('students/index', [
                'students' => Student::latest()->get(['id', 'student_id', 'name', 'course', 'year_level']),
                'error' => 'Student ID not found.',
            ]);
        }

        return Inertia::render('students/index', [
            'students' => collect([$student]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|string|unique:students,student_id',
            'name' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'year_level' => 'required|integer|between:1,4',
        ]);

        Student::create($validated);

        return redirect()
            ->route('students.index')
            ->with('success', 'Student registered successfully.');
    }
}