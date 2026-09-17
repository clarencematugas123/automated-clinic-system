import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard({ studentCount = 0 }: { studentCount?: number }) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-[#F5F7FA]">

                {/* HEADER */}
                <div className="bg-[#12355B] px-6 py-5 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold tracking-wide">
                                BROKENSHIRE AUTOMATED CLINIC SERVICES
                            </h1>

                            <p className="mt-1 text-sm text-blue-100">
                                Automated Campus Clinic Records System
                            </p>
                        </div>

                        <div className="rounded-lg bg-white/10 px-4 py-2 text-sm">
                            👤 ADMIN / CLINIC STAFF
                        </div>
                    </div>
                </div>


                {/* CONTENT */}
                <div className="p-6 lg:p-8">

                    {/* TITLE */}
                    <div className="mb-7">
                        <h2 className="text-3xl font-bold text-[#12355B]">
                            DASHBOARD
                        </h2>

                        <p className="mt-1 text-gray-500">
                            Welcome back, Clinic Staff!
                        </p>
                    </div>


                    {/* SUMMARY CARDS */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

                        {/* STUDENTS */}
                        <div className="rounded-xl border border-gray-200 border-l-4 border-l-[#2F80ED] bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-bold text-gray-500">
                                    STUDENTS
                                </p>

                                <span className="text-2xl">👨‍🎓</span>
                            </div>

                            <p className="mt-3 text-3xl font-bold text-[#12355B]">
                                {studentCount}
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Records
                            </p>
                        </div>


                        {/* QUEUE */}
                        <div className="rounded-xl border border-gray-200 border-l-4 border-l-[#F2C94C] bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-bold text-gray-500">
                                    QUEUE
                                </p>

                                <span className="text-2xl">🏥</span>
                            </div>

                            <p className="mt-3 text-3xl font-bold text-[#12355B]">
                                08
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Waiting
                            </p>
                        </div>


                        {/* CONSULTATION */}
                        <div className="rounded-xl border border-gray-200 border-l-4 border-l-[#27AE60] bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-bold text-gray-500">
                                    CONSULT
                                </p>

                                <span className="text-2xl">👨‍⚕️</span>
                            </div>

                            <p className="mt-3 text-3xl font-bold text-[#12355B]">
                                12
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Today
                            </p>
                        </div>


                        {/* LAB */}
                        <div className="rounded-xl border border-gray-200 border-l-4 border-l-[#2F80ED] bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-bold text-gray-500">
                                    LAB
                                </p>

                                <span className="text-2xl">🧪</span>
                            </div>

                            <p className="mt-3 text-3xl font-bold text-[#12355B]">
                                05
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Pending
                            </p>
                        </div>


                        {/* CLEARANCE */}
                        <div className="rounded-xl border border-gray-200 border-l-4 border-l-[#EB5757] bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-bold text-gray-500">
                                    CLEARANCE
                                </p>

                                <span className="text-2xl">📋</span>
                            </div>

                            <p className="mt-3 text-3xl font-bold text-[#12355B]">
                                07
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Pending
                            </p>
                        </div>

                    </div>


                    {/* LOWER SECTION */}
                    <div className="mt-8 grid gap-6 lg:grid-cols-3">

                        {/* QUICK ACCESS */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1">

                            <h3 className="text-lg font-bold text-[#12355B]">
                                Quick Access
                            </h3>

                            <p className="mb-5 mt-1 text-sm text-gray-400">
                                Clinic system modules
                            </p>


                            <div className="space-y-2">

                                <Link
                                    href="/students"
                                    className="flex items-center gap-3 rounded-lg bg-[#EAF4FF] px-4 py-3 text-sm font-semibold text-[#2F80ED] transition hover:bg-blue-100"
                                >
                                    <span>👨‍🎓</span>
                                    Student Records
                                </Link>


                                <a
                                    href="#"
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-[#EAF4FF] hover:text-[#2F80ED]"
                                >
                                    <span>🏥</span>
                                    Queue Management
                                </a>


                                <a
                                    href="#"
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-[#EAF4FF] hover:text-[#2F80ED]"
                                >
                                    <span>👨‍⚕️</span>
                                    Consultation
                                </a>


                                <a
                                    href="#"
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-[#EAF4FF] hover:text-[#2F80ED]"
                                >
                                    <span>🧪</span>
                                    Laboratory Results
                                </a>


                                <a
                                    href="#"
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-[#EAF4FF] hover:text-[#2F80ED]"
                                >
                                    <span>📋</span>
                                    Clearance
                                </a>


                                <a
                                    href="#"
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-[#EAF4FF] hover:text-[#2F80ED]"
                                >
                                    <span>📊</span>
                                    Reports
                                </a>


                                <a
                                    href="#"
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-[#EAF4FF] hover:text-[#2F80ED]"
                                >
                                    <span>📦</span>
                                    Inventory
                                </a>


                                <a
                                    href="#"
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-[#EAF4FF] hover:text-[#2F80ED]"
                                >
                                    <span>🔐</span>
                                    Security
                                </a>

                            </div>
                        </div>


                        {/* RECENT ACTIVITY */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">

                            <div className="mb-5 flex items-center justify-between">

                                <div>
                                    <h3 className="text-lg font-bold text-[#12355B]">
                                        Recent Clinic Activity
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-400">
                                        Latest activities in the clinic
                                    </p>
                                </div>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                    ● LIVE
                                </span>

                            </div>


                            <div className="space-y-1">

                                {/* ACTIVITY 1 */}
                                <div className="flex items-center justify-between border-b border-gray-100 py-4">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                            ✓
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-700">
                                                Medical Completed
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                September 5, 2026
                                            </p>
                                        </div>

                                    </div>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                        COMPLETED
                                    </span>

                                </div>


                                {/* ACTIVITY 2 */}
                                <div className="flex items-center justify-between border-b border-gray-100 py-4">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                            ✓
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-700">
                                                Dental Completed
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                September 5, 2026
                                            </p>
                                        </div>

                                    </div>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                        COMPLETED
                                    </span>

                                </div>


                                {/* ACTIVITY 3 */}
                                <div className="flex items-center justify-between border-b border-gray-100 py-4">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                                            ⏱
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-700">
                                                Medical Waiting
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                September 4, 2026
                                            </p>
                                        </div>

                                    </div>

                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                        WAITING
                                    </span>

                                </div>


                                {/* ACTIVITY 4 */}
                                <div className="flex items-center justify-between py-4">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                            🧪
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-700">
                                                Laboratory Completed
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                September 4, 2026
                                            </p>
                                        </div>

                                    </div>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                        COMPLETED
                                    </span>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};