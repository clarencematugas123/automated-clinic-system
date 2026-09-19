import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import {
    Activity,
    ClipboardList,
    FlaskConical,
    GraduationCap,
    LayoutDashboard,
    LockKeyhole,
    Menu,
    Package,
    Stethoscope,
    UserRound,
    UsersRound,
} from 'lucide-react';
import { dashboard } from '@/routes';

type DashboardProps = { studentCount?: number; queueCount?: number; consultationCount?: number; labPendingCount?: number; clearancePendingCount?: number };

const navItems = [
    { label: 'Student Records', icon: GraduationCap, href: '/students', active: true },
    { label: 'Queue Management', icon: Activity, href: '/queue' },
    { label: 'Consultation', icon: Stethoscope, href: '/consultations' },
    { label: 'Lab Results', icon: FlaskConical, href: '/lab-results' },
    { label: 'Clearance', icon: ClipboardList, href: '/clearance' },
    { label: 'Reports', icon: LayoutDashboard, href: '/reports' },
    { label: 'Inventory', icon: Package, href: '#' },
    { label: 'Security', icon: LockKeyhole, href: '#' },
];

const activities = [
    { label: 'Medical', status: 'Completed', date: 'September 5, 2026', tone: 'success' },
    { label: 'Dental', status: 'Completed', date: 'September 5, 2026', tone: 'success' },
    { label: 'Medical', status: 'Waiting', date: 'September 4, 2026', tone: 'warning' },
    { label: 'Laboratory', status: 'Completed', date: 'September 4, 2026', tone: 'success' },
];

export default function Dashboard({ studentCount = 0, queueCount = 0, consultationCount = 0, labPendingCount = 0, clearancePendingCount = 0 }: DashboardProps) {
    const stats = [
        { label: 'Students', value: studentCount, detail: 'Records', icon: GraduationCap },
        { label: 'Queue', value: queueCount, detail: 'Waiting', icon: Activity },
        { label: 'Consult', value: consultationCount, detail: 'Today', icon: Stethoscope },
        { label: 'Lab', value: labPendingCount, detail: 'Pending', icon: FlaskConical },
        { label: 'Clearance', value: clearancePendingCount, detail: 'Pending', icon: ClipboardList },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <main className="min-h-screen bg-[#dbe8e9] bg-[url('/campus-background.png')] bg-cover bg-center bg-fixed font-sans text-black">
                <div className="min-h-screen bg-white/45 p-3 sm:p-5 lg:p-7">
                    <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1500px] gap-4 lg:grid-cols-[270px_minmax(0,1fr)]">
                        <aside className="overflow-hidden rounded-[28px] border border-white/65 bg-white/60 shadow-[0_20px_55px_rgba(23,57,54,0.18)] backdrop-blur-xl">
                            <div className="flex items-center gap-3 px-5 py-6 sm:px-7 lg:block lg:px-7">
                                <img src="/brokenshire-logo.png" alt="Brokenshire Clinic" className="h-11 w-11 shrink-0 object-contain" />
                                <p className="max-w-[190px] text-center text-xs font-extrabold uppercase leading-tight tracking-wide lg:mt-3">Brokenshire Automated<br />Clinic Services</p>
                                <button type="button" className="ml-auto rounded-full p-2 lg:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></button>
                            </div>
                            <div className="hidden border-y border-white/70 bg-gradient-to-r from-[#119b78] to-[#0c654e] px-7 py-4 text-sm font-extrabold uppercase text-white lg:block">Quick Access</div>
                            <nav className="grid grid-cols-2 gap-1 p-3 sm:grid-cols-4 lg:block lg:p-4">
                                {navItems.map(({ label, icon: Icon, href, active }) => (
                                    <Link key={label} href={href} className={`flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-xs font-extrabold uppercase transition sm:px-4 lg:rounded-none lg:px-3 ${active ? 'bg-white/50 text-[#075c49] lg:bg-transparent' : 'text-black/80 hover:bg-white/45'}`}>
                                        <Icon className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                                        <span>{label}</span>
                                    </Link>
                                ))}
                            </nav>
                        </aside>

                        <section className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/55 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl">
                            <header className="flex items-center justify-between gap-4 px-6 py-6 sm:px-10 sm:py-7">
                                <div>
                                    <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">Dashboard</h1>
                                    <p className="mt-8 text-base font-bold uppercase sm:text-lg">Welcome back, clinic staff!</p>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-extrabold uppercase sm:text-base"><span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-white/55"><UserRound className="h-6 w-6" /></span>Admin</div>
                            </header>

                            <div className="px-6 pb-7 sm:px-10">
                                <div className="grid grid-cols-2 gap-x-5 gap-y-6 border-b border-black/15 pb-7 sm:grid-cols-5 sm:gap-4">
                                    {stats.map(({ label, value, detail, icon: Icon }) => (
                                        <div key={label} className="min-w-0">
                                            <div className="flex items-center gap-2"><Icon className="h-5 w-5" strokeWidth={2.5} /><p className="truncate text-sm font-black uppercase sm:text-base">{label}</p></div>
                                            <p className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">{value}</p>
                                            <p className="mt-1 text-xs font-bold uppercase sm:text-sm">{detail}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-7 grid gap-8 xl:grid-cols-[minmax(0,1fr)_330px]">
                                    <div>
                                        <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black uppercase sm:text-2xl">Recent Clinic Activity</h2><span className="flex items-center gap-2 text-xs font-black uppercase"><span className="h-2 w-2 rounded-full bg-[#0b996e]" />Live</span></div>
                                        <div className="divide-y divide-black/15">
                                            {activities.map((activity) => <div key={`${activity.label}-${activity.status}`} className="flex items-center justify-between gap-4 py-4"><div className="flex items-center gap-4"><div className={`flex h-9 w-9 items-center justify-center rounded-full ${activity.tone === 'success' ? 'bg-[#b9e9d7]' : 'bg-[#f8e4a8]'}`}><UsersRound className="h-4 w-4" /></div><div><p className="text-sm font-bold uppercase">{activity.label}</p><p className="text-xs font-medium uppercase text-black/60">{activity.date}</p></div></div><span className={`text-xs font-black uppercase ${activity.tone === 'success' ? 'text-[#087653]' : 'text-[#a26b00]'}`}>{activity.status}</span></div>)}
                                        </div>
                                    </div>
                                    <div className="border-t border-black/15 pt-5 xl:border-l xl:border-t-0 xl:pl-7"><p className="text-xs font-black uppercase tracking-widest text-black/60">System status</p><div className="mt-4 flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-[#0b996e] shadow-[0_0_0_5px_rgba(11,153,110,0.15)]" /><p className="text-lg font-black uppercase">Clinic online</p></div><p className="mt-3 text-sm font-medium leading-relaxed text-black/65">All core services are operating normally.</p></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

Dashboard.layout = (page: ReactNode) => page;
