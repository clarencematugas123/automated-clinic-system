import { Head, Link } from '@inertiajs/react';
import { Activity, ArrowLeft, ClipboardCheck, FileBarChart, FlaskConical, GraduationCap, Stethoscope } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = { summary: { students: number; queueToday: number; consultationsToday: number; labPending: number; clearancePending: number }; statusBreakdown: { queueWaiting: number; consultationsCompleted: number; labCompleted: number; clearancesApproved: number } };

export default function ReportsIndex({ summary, statusBreakdown }: Props) {
    const cards = [
        { label: 'Students', value: summary.students, detail: 'Total records', icon: GraduationCap },
        { label: 'Queue Today', value: summary.queueToday, detail: 'Visits logged', icon: Activity },
        { label: 'Consultations', value: summary.consultationsToday, detail: 'Today', icon: Stethoscope },
        { label: 'Lab Pending', value: summary.labPending, detail: 'Need results', icon: FlaskConical },
        { label: 'Clearance Pending', value: summary.clearancePending, detail: 'Need review', icon: ClipboardCheck },
    ];
    const breakdown = [
        ['Waiting queue', statusBreakdown.queueWaiting],
        ['Completed consultations', statusBreakdown.consultationsCompleted],
        ['Completed lab results', statusBreakdown.labCompleted],
        ['Approved clearances', statusBreakdown.clearancesApproved],
    ];

    return <><Head title="Reports" /><main className="min-h-screen bg-[#dbe8e9] bg-[url('/campus-background.png')] bg-cover bg-center bg-fixed font-sans text-black"><div className="min-h-screen bg-white/45 p-3 sm:p-5 lg:p-7"><div className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1500px]">
        <header className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/60 px-5 py-4 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:px-8"><div className="flex items-center gap-3"><img src="/brokenshire-logo.png" alt="Brokenshire Clinic" className="h-11 w-11 object-contain" /><div><p className="text-xs font-black uppercase tracking-widest text-[#075c49]">Clinic analytics</p><h1 className="text-xl font-black uppercase sm:text-2xl">Reports</h1></div></div><Link href="/dashboard" className="flex items-center gap-2 text-xs font-black uppercase text-[#075c49] hover:text-[#0b996e]"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Dashboard</span></Link></header>
        <section className="rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:p-8"><div className="flex items-center gap-2"><FileBarChart className="h-5 w-5 text-[#075c49]" /><h2 className="text-xl font-black uppercase sm:text-2xl">Clinic Summary</h2></div><p className="mt-1 text-xs font-bold uppercase tracking-wide text-black/55">Live activity across all clinic modules</p><div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-5">{cards.map(({ label, value, detail, icon: Icon }) => <div key={label} className="rounded-2xl border border-black/10 bg-white/45 p-4"><Icon className="h-5 w-5 text-[#075c49]" /><p className="mt-4 text-3xl font-black">{value}</p><p className="mt-1 text-xs font-black uppercase">{label}</p><p className="mt-1 text-xs font-medium uppercase text-black/50">{detail}</p></div>)}</div></section>
        <section className="mt-4 rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:p-8"><h2 className="text-xl font-black uppercase">Status Breakdown</h2><div className="mt-5 divide-y divide-black/10">{breakdown.map(([label, value]) => <div key={label} className="flex items-center justify-between py-4"><p className="text-sm font-bold uppercase">{label}</p><span className="rounded-full bg-[#b9e9d7] px-4 py-1 text-sm font-black text-[#075c49]">{value}</span></div>)}</div></section>
    </div></div></main></>;
}

ReportsIndex.layout = (page: ReactNode) => page;
