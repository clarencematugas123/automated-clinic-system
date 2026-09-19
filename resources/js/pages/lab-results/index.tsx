import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, FlaskConical, FilePlus2, UserRound } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';

type Student = { id: number; student_id: string; name: string };
type LabResult = { id: number; test_name: string; result: string | null; remarks: string | null; status: string; student: Student };
type Props = { students: Student[]; labResults: LabResult[]; success?: string };

export default function LabResultsIndex({ students, labResults, success }: Props) {
    const form = useForm({ student_id: '', test_name: '', result: '', remarks: '' });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post('/lab-results', { onSuccess: () => form.reset() });
    }

    function completeResult(id: number) {
        router.patch(`/lab-results/${id}/status`, { status: 'completed' }, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Laboratory Results" />
            <main className="min-h-screen bg-[#dbe8e9] bg-[url('/campus-background.png')] bg-cover bg-center bg-fixed font-sans text-black"><div className="min-h-screen bg-white/45 p-3 sm:p-5 lg:p-7"><div className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1500px]">
                <header className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/60 px-5 py-4 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:px-8"><div className="flex items-center gap-3"><img src="/brokenshire-logo.png" alt="Brokenshire Clinic" className="h-11 w-11 object-contain" /><div><p className="text-xs font-black uppercase tracking-widest text-[#075c49]">Clinic operations</p><h1 className="text-xl font-black uppercase sm:text-2xl">Laboratory Results</h1></div></div><Link href="/dashboard" className="flex items-center gap-2 text-xs font-black uppercase text-[#075c49] hover:text-[#0b996e]"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Dashboard</span></Link></header>
                {success && <div className="mb-4 rounded-2xl border border-[#8ad8bd] bg-[#e0f7ed]/90 px-5 py-3 text-sm font-bold text-[#075c49]">{success}</div>}
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_370px]">
                    <section className="rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:p-8"><div className="mb-6 flex items-center justify-between"><div className="flex items-center gap-2"><FlaskConical className="h-5 w-5 text-[#075c49]" /><h2 className="text-xl font-black uppercase sm:text-2xl">Lab Results</h2></div><span className="rounded-full bg-[#f8e4a8] px-3 py-1 text-xs font-black uppercase text-[#8a5b00]">{labResults.filter((result) => result.status === 'pending').length} pending</span></div><div className="space-y-3">{labResults.map((labResult) => <article key={labResult.id} className="rounded-2xl border border-black/10 bg-white/45 p-4"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="font-black uppercase">{labResult.student.name}</p><p className="text-xs font-bold uppercase text-black/55">{labResult.student.student_id} · {labResult.test_name}</p>{labResult.result && <p className="mt-3 text-sm font-medium"><span className="font-black uppercase text-[#075c49]">Result:</span> {labResult.result}</p>}{labResult.remarks && <p className="mt-1 text-sm font-medium"><span className="font-black uppercase text-[#075c49]">Remarks:</span> {labResult.remarks}</p>}</div><div className="flex items-center gap-2"><span className={`rounded-full px-3 py-1 text-xs font-black uppercase ${labResult.status === 'pending' ? 'bg-[#f8e4a8] text-[#8a5b00]' : 'bg-[#b9e9d7] text-[#075c49]'}`}>{labResult.status}</span>{labResult.status === 'pending' && <button type="button" onClick={() => completeResult(labResult.id)} className="rounded-lg bg-[#075c49] p-2 text-white" title="Mark completed"><CheckCircle2 className="h-4 w-4" /></button>}</div></div></article>)}{labResults.length === 0 && <div className="py-16 text-center"><FlaskConical className="mx-auto h-10 w-10 text-[#075c49]/40" /><p className="mt-3 text-sm font-black uppercase text-black/45">No laboratory results recorded</p></div>}</div></section>
                    <section className="rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:p-7"><div className="flex items-center gap-2"><FilePlus2 className="h-5 w-5 text-[#075c49]" /><h2 className="text-xl font-black uppercase">New Lab Request</h2></div><p className="mt-1 text-xs font-bold uppercase tracking-wide text-black/55">Record a laboratory test</p><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-xs font-black uppercase tracking-wide text-black/65"><span className="flex items-center gap-1">Student<UserRound className="h-3 w-3" /></span><select required value={form.data.student_id} onChange={(event) => form.setData('student_id', event.target.value)} className="mt-1 w-full rounded-xl border border-black/20 bg-white/55 px-3 py-3 text-sm font-medium normal-case outline-none ring-[#0b996e] focus:ring-2"><option value="">Select student</option>{students.map((student) => <option key={student.id} value={student.id}>{student.student_id} - {student.name}</option>)}</select></label><label className="block text-xs font-black uppercase tracking-wide text-black/65">Test Name<input required value={form.data.test_name} onChange={(event) => form.setData('test_name', event.target.value)} placeholder="e.g. CBC, urinalysis" className="mt-1 w-full rounded-xl border border-black/20 bg-white/55 px-3 py-2.5 text-sm font-medium normal-case outline-none ring-[#0b996e] focus:ring-2" /></label><label className="block text-xs font-black uppercase tracking-wide text-black/65">Result<textarea value={form.data.result} onChange={(event) => form.setData('result', event.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-black/20 bg-white/55 px-3 py-2.5 text-sm font-medium normal-case outline-none ring-[#0b996e] focus:ring-2" /></label><label className="block text-xs font-black uppercase tracking-wide text-black/65">Remarks<textarea value={form.data.remarks} onChange={(event) => form.setData('remarks', event.target.value)} rows={2} className="mt-1 w-full rounded-xl border border-black/20 bg-white/55 px-3 py-2.5 text-sm font-medium normal-case outline-none ring-[#0b996e] focus:ring-2" /></label><button disabled={form.processing} type="submit" className="w-full rounded-xl bg-[#075c49] px-4 py-3 text-xs font-black uppercase tracking-wide text-white hover:bg-[#0b996e] disabled:opacity-60">{form.processing ? 'Saving...' : 'Save Lab Result'}</button></form></section>
                </div>
            </div></div></main>
        </>
    );
}

LabResultsIndex.layout = (page: ReactNode) => page;
