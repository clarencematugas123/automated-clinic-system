import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, GraduationCap, Search, UserPlus } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
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

const yearLevels = [
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' },
];

export default function StudentsIndex({ students: studentRecords, error }: StudentsPageProps) {
    const registrationForm = useForm({ student_id: '', name: '', course: '', year_level: '' });
    const searchForm = useForm({ student_id: '' });

    function registerStudent(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        registrationForm.post(students.store.url(), { onSuccess: () => registrationForm.reset() });
    }

    function searchStudents(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        searchForm.post(students.search.url());
    }

    return (
        <>
            <Head title="Student Records" />
            <main className="min-h-screen bg-[#dbe8e9] bg-[url('/campus-background.png')] bg-cover bg-center bg-fixed font-sans text-black">
                <div className="min-h-screen bg-white/45 p-3 sm:p-5 lg:p-7">
                    <div className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1500px]">
                        <div className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/60 px-5 py-4 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:px-8">
                            <div className="flex items-center gap-3"><img src="/brokenshire-logo.png" alt="Brokenshire Clinic" className="h-11 w-11 object-contain" /><div><p className="text-xs font-black uppercase tracking-widest text-[#075c49]">Clinic records</p><h1 className="text-xl font-black uppercase sm:text-2xl">Student Records</h1></div></div>
                            <Link href="/dashboard" className="flex items-center gap-2 text-xs font-black uppercase text-[#075c49] transition hover:text-[#0b996e] sm:text-sm"><ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Dashboard</span></Link>
                        </div>

                        {error && <div className="mb-4 rounded-2xl border border-red-200/80 bg-red-50/85 px-5 py-3 text-sm font-semibold text-red-700 shadow-sm">{error}</div>}

                        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_350px]">
                            <section className="rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:p-8">
                                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-[#075c49]" /><h2 className="text-xl font-black uppercase sm:text-2xl">Registered Students</h2></div><p className="mt-1 text-xs font-bold uppercase tracking-wide text-black/55">{studentRecords.length} record{studentRecords.length === 1 ? '' : 's'} in the clinic system</p></div><form onSubmit={searchStudents} className="flex gap-2"><input value={searchForm.data.student_id} onChange={(event) => searchForm.setData('student_id', event.target.value)} placeholder="Search student ID" className="w-full rounded-xl border border-black/20 bg-white/55 px-3 py-2 text-sm font-medium outline-none ring-[#0b996e] placeholder:text-black/35 focus:ring-2 sm:w-44" /><button type="submit" className="flex items-center gap-2 rounded-xl bg-[#075c49] px-4 py-2 text-xs font-black uppercase text-white transition hover:bg-[#0b996e]"><Search className="h-4 w-4" />Search</button></form></div>
                                <div className="overflow-x-auto"><table className="w-full min-w-[35rem] text-left text-sm"><thead className="border-b border-black/15 text-xs font-black uppercase tracking-wide text-black/60"><tr><th className="px-3 py-3">Student ID</th><th className="px-3 py-3">Name</th><th className="px-3 py-3">Course</th><th className="px-3 py-3">Year Level</th></tr></thead><tbody className="divide-y divide-black/10">{studentRecords.map((student) => <tr key={student.id} className="font-medium"><td className="px-3 py-4 font-black text-[#075c49]">{student.student_id}</td><td className="px-3 py-4">{student.name}</td><td className="px-3 py-4">{student.course}</td><td className="px-3 py-4 font-bold">{yearLevels.find((year) => Number(year.value) === student.year_level)?.label ?? `${student.year_level}th Year`}</td></tr>)}</tbody></table>{studentRecords.length === 0 && <p className="py-12 text-center text-sm font-bold uppercase text-black/45">No student records found.</p>}</div>
                            </section>

                            <section className="rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:p-7"><div className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-[#075c49]" /><h2 className="text-xl font-black uppercase">Register Student</h2></div><p className="mt-1 text-xs font-bold uppercase tracking-wide text-black/55">Add a new clinic record</p><form onSubmit={registerStudent} className="mt-6 space-y-4">{(['student_id', 'name', 'course'] as const).map((field) => <label key={field} className="block text-sm font-bold"><span className="mb-1 block text-xs font-black uppercase tracking-wide text-black/65">{field === 'student_id' ? 'Student ID' : field}</span><input required type="text" value={registrationForm.data[field]} onChange={(event) => registrationForm.setData(field, event.target.value)} className="w-full rounded-xl border border-black/20 bg-white/55 px-3 py-2.5 outline-none ring-[#0b996e] focus:ring-2" />{registrationForm.errors[field] && <span className="mt-1 block text-xs text-red-700">{registrationForm.errors[field]}</span>}</label>)}<label className="block text-sm font-bold"><span className="mb-1 block text-xs font-black uppercase tracking-wide text-black/65">Year Level</span><select required value={registrationForm.data.year_level} onChange={(event) => registrationForm.setData('year_level', event.target.value)} className="w-full rounded-xl border border-black/20 bg-white/55 px-3 py-2.5 outline-none ring-[#0b996e] focus:ring-2"><option value="">Select year level</option>{yearLevels.map((year) => <option key={year.value} value={year.value}>{year.label}</option>)}</select>{registrationForm.errors.year_level && <span className="mt-1 block text-xs text-red-700">{registrationForm.errors.year_level}</span>}</label><button disabled={registrationForm.processing} type="submit" className="w-full rounded-xl bg-[#075c49] px-4 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#0b996e] disabled:opacity-60">{registrationForm.processing ? 'Saving...' : 'Register Student'}</button></form></section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

StudentsIndex.layout = (page: ReactNode) => page;
