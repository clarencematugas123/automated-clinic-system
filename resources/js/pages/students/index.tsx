import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import students from '@/routes/students';

type Student = {
    id: number;
    student_id: string;
    name: string;
    course: string;
    year_level: number;
};

type StudentsPageProps = {
    students: Student[];
    error?: string;
};

export default function StudentsIndex({ students: studentRecords, error }: StudentsPageProps) {
    const registrationForm = useForm({
        student_id: '',
        name: '',
        course: '',
        year_level: '',
    });
    const searchForm = useForm({ student_id: '' });

    function registerStudent(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        registrationForm.post(students.store.url(), {
            onSuccess: () => registrationForm.reset(),
        });
    }

    function searchStudents(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        searchForm.post(students.search.url());
    }

    return (
        <>
            <Head title="Student Records" />
            <div className="min-h-screen bg-[#F5F7FA] p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2F80ED]">Clinic records</p>
                            <h1 className="mt-2 text-3xl font-bold text-[#12355B]">Student Records</h1>
                            <p className="mt-1 text-gray-500">Register and find students in the clinic system.</p>
                        </div>
                        <a href="/dashboard" className="text-sm font-semibold text-[#2F80ED] hover:underline">Back to dashboard</a>
                    </div>

                    {error && <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
                        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-bold text-[#12355B]">Registered students</h2>
                                    <p className="mt-1 text-sm text-gray-400">{studentRecords.length} record{studentRecords.length === 1 ? '' : 's'}</p>
                                </div>
                                <form onSubmit={searchStudents} className="flex gap-2">
                                    <input
                                        value={searchForm.data.student_id}
                                        onChange={(event) => searchForm.setData('student_id', event.target.value)}
                                        placeholder="Search student ID"
                                        className="w-40 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-[#2F80ED] focus:ring-2"
                                    />
                                    <button type="submit" className="rounded-lg bg-[#2F80ED] px-4 py-2 text-sm font-semibold text-white hover:bg-[#216dcc]">Search</button>
                                </form>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[34rem] text-left text-sm">
                                    <thead className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                                        <tr><th className="px-3 py-3">Student ID</th><th className="px-3 py-3">Name</th><th className="px-3 py-3">Course</th><th className="px-3 py-3">Year</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {studentRecords.map((student) => <tr key={student.id} className="text-gray-700"><td className="px-3 py-4 font-semibold text-[#12355B]">{student.student_id}</td><td className="px-3 py-4">{student.name}</td><td className="px-3 py-4">{student.course}</td><td className="px-3 py-4">{student.year_level}</td></tr>)}
                                    </tbody>
                                </table>
                                {studentRecords.length === 0 && <p className="py-10 text-center text-sm text-gray-400">No student records found.</p>}
                            </div>
                        </section>

                        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-[#12355B]">Register student</h2>
                            <form onSubmit={registerStudent} className="mt-5 space-y-4">
                                {(['student_id', 'name', 'course', 'year_level'] as const).map((field) => <label key={field} className="block text-sm font-medium text-gray-700"><span className="mb-1 block">{field === 'student_id' ? 'Student ID' : field === 'year_level' ? 'Year level' : field.charAt(0).toUpperCase() + field.slice(1)}</span><input required type={field === 'year_level' ? 'number' : 'text'} min={field === 'year_level' ? 1 : undefined} max={field === 'year_level' ? 12 : undefined} value={registrationForm.data[field]} onChange={(event) => registrationForm.setData(field, event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-[#2F80ED] focus:ring-2" />{registrationForm.errors[field] && <span className="mt-1 block text-xs text-red-600">{registrationForm.errors[field]}</span>}</label>)}
                                <button disabled={registrationForm.processing} type="submit" className="w-full rounded-lg bg-[#12355B] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0d2946] disabled:opacity-60">{registrationForm.processing ? 'Saving...' : 'Register student'}</button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
