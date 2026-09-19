import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Boxes, Check, Minus, PackagePlus, Plus, Search, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

type InventoryItem = { id: number; name: string; category: string; unit: string; quantity: number; reorder_level: number };
type Props = { items: InventoryItem[]; success?: string };

export default function InventoryIndex({ items, success }: Props) {
    const form = useForm({ name: '', category: '', unit: 'pieces', quantity: '0', reorder_level: '5' });
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [lowOnly, setLowOnly] = useState(false);
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const categories = [...new Set(items.map((item) => item.category))].sort();
    const lowCount = items.filter((item) => item.quantity <= item.reorder_level).length;
    const totalUnits = items.reduce((total, item) => total + item.quantity, 0);
    const visibleItems = items.filter((item) => {
        const matchesSearch = `${item.name} ${item.category}`.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'all' || item.category === category;
        const matchesStock = !lowOnly || item.quantity <= item.reorder_level;
        return matchesSearch && matchesCategory && matchesStock;
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post('/inventory', { onSuccess: () => form.reset() });
    }

    function currentQuantity(item: InventoryItem) {
        return quantities[item.id] ?? item.quantity;
    }

    function setQuantity(item: InventoryItem, quantity: number) {
        setQuantities((current) => ({ ...current, [item.id]: Math.max(0, quantity) }));
    }

    function saveQuantity(item: InventoryItem) {
        router.patch(`/inventory/${item.id}/stock`, { quantity: currentQuantity(item) }, { preserveScroll: true, onSuccess: () => setQuantities((current) => { const next = { ...current }; delete next[item.id]; return next; }) });
    }

    return <><Head title="Inventory" /><main className="min-h-screen bg-[#dbe8e9] bg-[url('/campus-background.png')] bg-cover bg-center bg-fixed font-sans text-black"><div className="min-h-screen bg-white/45 p-3 sm:p-5 lg:p-7"><div className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1500px]">
        <header className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/60 px-5 py-4 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:px-8"><div className="flex items-center gap-3"><img src="/brokenshire-logo.png" alt="Brokenshire Clinic" className="h-11 w-11 object-contain" /><div><p className="text-xs font-black uppercase tracking-widest text-[#075c49]">Clinic operations</p><h1 className="text-xl font-black uppercase sm:text-2xl">Inventory</h1></div></div><Link href="/dashboard" className="flex items-center gap-2 text-xs font-black uppercase text-[#075c49] hover:text-[#0b996e]"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Dashboard</span></Link></header>
        {success && <div className="mb-4 flex items-center gap-2 rounded-2xl border border-[#8ad8bd] bg-[#e0f7ed]/90 px-5 py-3 text-sm font-bold text-[#075c49]"><Check className="h-4 w-4" />{success}</div>}
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-xl"><p className="text-xs font-black uppercase text-black/55">Items tracked</p><p className="mt-1 text-3xl font-black">{items.length}</p></div><div className="rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-xl"><p className="text-xs font-black uppercase text-black/55">Total units</p><p className="mt-1 text-3xl font-black">{totalUnits}</p></div><div className="rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-xl"><p className="text-xs font-black uppercase text-black/55">Low stock</p><p className="mt-1 text-3xl font-black text-[#a26b00]">{lowCount}</p></div></div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_350px]"><section className="rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:p-8"><div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between"><div className="flex items-center gap-2"><Boxes className="h-5 w-5 text-[#075c49]" /><h2 className="text-xl font-black uppercase sm:text-2xl">Stock Items</h2></div><div className="flex flex-wrap gap-2"><label className="flex items-center gap-2 rounded-xl border border-black/15 bg-white/55 px-3 py-2"><Search className="h-4 w-4 text-black/45" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search items" className="w-32 bg-transparent text-sm outline-none placeholder:text-black/40" /></label><select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-black/15 bg-white/55 px-3 py-2 text-xs font-bold uppercase outline-none"><option value="all">All categories</option>{categories.map((itemCategory) => <option key={itemCategory}>{itemCategory}</option>)}</select><button type="button" onClick={() => setLowOnly(!lowOnly)} className={`rounded-xl px-3 py-2 text-xs font-black uppercase ${lowOnly ? 'bg-[#075c49] text-white' : 'border border-black/15 bg-white/55'}`}><TriangleAlert className="mr-1 inline h-3 w-3" />Low stock</button></div></div><div className="space-y-3">{visibleItems.map((item) => { const quantity = currentQuantity(item); const low = quantity <= item.reorder_level; const changed = quantity !== item.quantity; return <div key={item.id} className="rounded-2xl border border-black/10 bg-white/45 p-4"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="truncate font-black uppercase">{item.name}</p><p className="text-xs font-bold uppercase text-black/55">{item.category} · reorder at {item.reorder_level} {item.unit}</p></div><div className="flex items-center gap-3"><div className="flex items-center rounded-xl border border-black/15 bg-white/60"><button type="button" onClick={() => setQuantity(item, quantity - 1)} className="p-2 text-[#075c49] hover:bg-[#b9e9d7]" title="Decrease quantity"><Minus className="h-4 w-4" /></button><span className="min-w-16 text-center text-sm font-black">{quantity} {item.unit}</span><button type="button" onClick={() => setQuantity(item, quantity + 1)} className="p-2 text-[#075c49] hover:bg-[#b9e9d7]" title="Increase quantity"><Plus className="h-4 w-4" /></button></div>{changed && <button type="button" onClick={() => saveQuantity(item)} className="rounded-lg bg-[#075c49] p-2 text-white hover:bg-[#0b996e]" title="Save quantity"><Check className="h-4 w-4" /></button>}<span className={`rounded-full px-3 py-1 text-xs font-black uppercase ${low ? 'bg-[#f8e4a8] text-[#8a5b00]' : 'bg-[#b9e9d7] text-[#075c49]'}`}>{low ? 'Low stock' : 'In stock'}</span></div></div></div>; })}{visibleItems.length === 0 && <div className="py-12 text-center text-sm font-black uppercase text-black/45">No matching inventory items</div>}</div></section>
        <section className="rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_55px_rgba(23,57,54,0.16)] backdrop-blur-xl sm:p-7"><div className="flex items-center gap-2"><PackagePlus className="h-5 w-5 text-[#075c49]" /><h2 className="text-xl font-black uppercase">Add Item</h2></div><p className="mt-1 text-xs font-bold uppercase tracking-wide text-black/55">Add stock once, then adjust quantities inline.</p><form onSubmit={submit} className="mt-6 space-y-4">{(['name', 'category', 'unit'] as const).map((field) => <label key={field} className="block text-xs font-black uppercase tracking-wide text-black/65">{field}<input required value={form.data[field]} onChange={(event) => form.setData(field, event.target.value)} className="mt-1 w-full rounded-xl border border-black/20 bg-white/55 px-3 py-2.5 text-sm normal-case outline-none ring-[#0b996e] focus:ring-2" /></label>)}<div className="grid grid-cols-2 gap-3"><label className="block text-xs font-black uppercase tracking-wide text-black/65">Quantity<input required type="number" min="0" value={form.data.quantity} onChange={(event) => form.setData('quantity', event.target.value)} className="mt-1 w-full rounded-xl border border-black/20 bg-white/55 px-3 py-2.5 text-sm outline-none ring-[#0b996e] focus:ring-2" /></label><label className="block text-xs font-black uppercase tracking-wide text-black/65">Reorder level<input required type="number" min="0" value={form.data.reorder_level} onChange={(event) => form.setData('reorder_level', event.target.value)} className="mt-1 w-full rounded-xl border border-black/20 bg-white/55 px-3 py-2.5 text-sm outline-none ring-[#0b996e] focus:ring-2" /></label></div><button disabled={form.processing} type="submit" className="w-full rounded-xl bg-[#075c49] px-4 py-3 text-xs font-black uppercase text-white hover:bg-[#0b996e] disabled:opacity-60">{form.processing ? 'Saving...' : 'Add Inventory Item'}</button></form></section></div>
    </div></div></main></>;
}

InventoryIndex.layout = (page: ReactNode) => page;
