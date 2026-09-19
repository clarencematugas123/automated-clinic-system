import { Head, Link, router, useForm } from '@inertiajs/react';
import { Activity, ArrowLeft, CheckCircle2, Clock3, UserPlus, XCircle } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';

type Student = { id: number; student_id: string; name: string };
type QueueEntry = { id: number; queue_number: number; service: string; status: string; student: Student };
type Props = { students: Student[]; queueEntries: QueueEntry[]; success?: string };

const services = ['Medical', 'Dental', 'Laboratory', 'Clearance'];
const statusLabels: Record<string, string> = { waiting: 'Waiting', in_progress: 'In Progress', completed: 'Completed', cancelled: 'Cancelled' };

export default function QueueIndex({ students, queueEntries, success }: Props) {
    const form = useForm({ student_id: '', service: 'Medical' });

    function addToQueue(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post('/queue', { onSuccess: () => form.reset('student_id') });
    }

    function updateStatus(id: number, status: string) {
        router.patch(`/queue/${id}/status`, { status }, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Queue Management" />
            <main className="min-h-screen bg-[#dbe8e9] bg-[url('/campus-background.png')] bg-cover bg-center bg-fixed font-sans text-black">
                <div className="min-h-screen bg-white/45 p-3 sm:p-5 lg:p-7"><div className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1500px]">
                    <header className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/60 px-5 py-4 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:px-8"><div className="flex items-center gap-3"><img src="/brokenshire-logo.png" alt="Brokenshire Clinic" className="h-11 w-11 object-contain" /><div><p className="text-xs font-black uppercase tracking-widest text-[#075c49]">Clinic operations</p><h1 className="text-xl font-black uppercase sm:text-2xl">Queue Management</h1></div></div><Link href="/dashboard" className="flex items-center gap-2 text-xs font-black uppercase text-[#075c49] hover:text-[#0b996e]"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Dashboard</span></Link></header>
                    {success && <div className="mb-4 rounded-2xl border border-[#8ad8bd] bg-[#e0f7ed]/90 px-5 py-3 text-sm font-bold text-[#075c49]">{success}</div>}
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_350px]">
                        <section className="rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:p-8"><div className="mb-6 flex items-center justify-between"><div className="flex items-center gap-2"><Activity className="h-5 w-5 text-[#075c49]" /><h2 className="text-xl font-black uppercase sm:text-2xl">Today&apos;s Queue</h2></div><span className="rounded-full bg-[#b9e9d7] px-3 py-1 text-xs font-black uppercase text-[#075c49]">{queueEntries.filter((entry) => entry.status === 'waiting').length} waiting</span></div><div className="space-y-3">{queueEntries.map((entry) => <div key={entry.id} className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white/45 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#075c49] text-lg font-black text-white">{String(entry.queue_number).padStart(2, '0')}</div><div><p className="font-black uppercase">{entry.student.name}</p><p className="text-xs font-bold uppercase text-black/55">{entry.student.student_id} · {entry.service}</p></div></div><div className="flex items-center gap-2"><span className={`rounded-full px-3 py-1 text-xs font-black uppercase ${entry.status === 'waiting' ? 'bg-[#f8e4a8] text-[#8a5b00]' : entry.status === 'in_progress' ? 'bg-[#c9e0ff] text-[#155aa0]' : entry.status === 'completed' ? 'bg-[#b9e9d7] text-[#075c49]' : 'bg-gray-200 text-gray-600'}`}>{statusLabels[entry.status]}</span>{entry.status === 'waiting' && <button type="button" onClick={() => updateStatus(entry.id, 'in_progress')} className="rounded-lg bg-[#075c49] p-2 text-white" title="Start consultation"><Clock3 className="h-4 w-4" /></button>}{entry.status === 'in_progress' && <button type="button" onClick={() => updateStatus(entry.id, 'completed')} className="rounded-lg bg-[#075c49] p-2 text-white" title="Complete queue entry"><CheckCircle2 className="h-4 w-4" /></button>}{(entry.status === 'waiting' || entry.status === 'in_progress') && <button type="button" onClick={() => updateStatus(entry.id, 'cancelled')} className="rounded-lg bg-red-600 p-2 text-white" title="Cancel queue entry"><XCircle className="h-4 w-4" /></button>}</div></div>)}{queueEntries.length === 0 && <div className="py-16 text-center"><Activity className="mx-auto h-10 w-10 text-[#075c49]/40" /><p className="mt-3 text-sm font-black uppercase text-black/45">No students in today&apos;s queue</p></div>}</div></section>
                        <section className="rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:p-7"><div className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-[#075c49]" /><h2 className="text-xl font-black uppercase">Add to Queue</h2></div><p className="mt-1 text-xs font-bold uppercase tracking-wide text-black/55">Register a student for service</p><form onSubmit={addToQueue} className="mt-6 space-y-4"><label className="block text-xs font-black uppercase tracking-wide text-black/65">Student<select required value={form.data.student_id} onChange={(event) => form.setData('student_id', event.target.value)} className="mt-1 w-full rounded-xl border border-black/20 bg-white/55 px-3 py-3 text-sm font-medium normal-case outline-none ring-[#0b996e] focus:ring-2"><option value="">Select student</option>{students.map((student) => <option key={student.id} value={student.id}>{student.student_id} - {student.name}</option>)}</select>{form.errors.student_id && <span className="mt-1 block normal-case text-red-700">{form.errors.student_id}</span>}</label><label className="block text-xs font-black uppercase tracking-wide text-black/65">Service<select required value={form.data.service} onChange={(event) => form.setData('service', event.target.value)} className="mt-1 w-full rounded-xl border border-black/20 bg-white/55 px-3 py-3 text-sm font-medium normal-case outline-none ring-[#0b996e] focus:ring-2">{services.map((service) => <option key={service}>{service}</option>)}</select></label><button disabled={form.processing} type="submit" className="w-full rounded-xl bg-[#075c49] px-4 py-3 text-xs font-black uppercase tracking-wide text-white hover:bg-[#0b996e] disabled:opacity-60">{form.processing ? 'Adding...' : 'Add to Queue'}</button></form></section>
                    </div>
                </div></div>
            </main>
        </>
    );
}

QueueIndex.layout = (page: ReactNode) => page;
