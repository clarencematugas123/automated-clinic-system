import { Head, Link, useForm } from '@inertiajs/react';
import { CheckCircle2, KeyRound, LockKeyhole, LogOut, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';

export default function SecurityIndex() {
    const logout = useForm({});

    function signOut() {
        logout.post('/logout');
    }

    return <><Head title="Security" /><main className="min-h-screen bg-[#dbe8e9] bg-[url('/campus-background.png')] bg-cover bg-center bg-fixed font-sans text-black"><div className="min-h-screen bg-white/45 p-3 sm:p-5 lg:p-7"><div className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1100px]">
        <header className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/60 px-5 py-4 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:px-8"><div className="flex items-center gap-3"><img src="/brokenshire-logo.png" alt="Brokenshire Clinic" className="h-11 w-11 object-contain" /><div><p className="text-xs font-black uppercase tracking-widest text-[#075c49]">System administration</p><h1 className="text-xl font-black uppercase sm:text-2xl">Security Center</h1></div></div><Link href="/dashboard" className="text-xs font-black uppercase text-[#075c49] hover:text-[#0b996e]">Dashboard</Link></header>
        <section className="rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:p-8"><div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b9e9d7] text-[#075c49]"><LockKeyhole className="h-6 w-6" /></span><div><h2 className="text-xl font-black uppercase">Account protection</h2><p className="text-sm font-medium text-black/55">Manage access and account security settings.</p></div></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><Link href="/settings/profile" className="rounded-2xl border border-black/10 bg-white/45 p-5 transition hover:bg-white/70"><UserRound className="h-5 w-5 text-[#075c49]" /><h3 className="mt-4 font-black uppercase">Profile</h3><p className="mt-1 text-sm text-black/55">Review your staff identity and email address.</p></Link><Link href="/settings/security" className="rounded-2xl border border-black/10 bg-white/45 p-5 transition hover:bg-white/70"><KeyRound className="h-5 w-5 text-[#075c49]" /><h3 className="mt-4 font-black uppercase">Password & two-factor</h3><p className="mt-1 text-sm text-black/55">Update your password and available protection options.</p></Link></div><div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#8ad8bd] bg-[#e0f7ed]/80 p-4"><CheckCircle2 className="h-5 w-5 text-[#075c49]" /><div><p className="text-sm font-black uppercase text-[#075c49]">Session protected</p><p className="text-xs font-medium text-[#075c49]/75">Your account is signed in through the clinic authentication system.</p></div></div><button type="button" onClick={signOut} disabled={logout.processing} className="mt-6 flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-black uppercase text-white hover:bg-red-700 disabled:opacity-60"><LogOut className="h-4 w-4" />{logout.processing ? 'Signing out...' : 'Sign out'}</button></section>
    </div></div></main></>;
}

SecurityIndex.layout = (page: ReactNode) => page;
