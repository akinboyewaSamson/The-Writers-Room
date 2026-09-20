import React, { useEffect, useState } from 'react';
import { getApiError } from '../api/client';
import { listCategories, listPosts } from '../api/services';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

export default function Home() {
  const [data, setData] = useState({ content: [], number: 0, totalPages: 0 });
  const [categories, setCategories] = useState([]); const [categoryId, setCategoryId] = useState(''); const [page, setPage] = useState(0); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { listCategories().then((res) => setCategories(res.data)).catch((err) => setError(getApiError(err))); }, []);
  useEffect(() => { setLoading(true); setError(''); listPosts({ page, size: 6, ...(categoryId ? { categoryId } : {}) }).then((res) => setData(res.data)).catch((err) => setError(getApiError(err))).finally(() => setLoading(false)); }, [page, categoryId]);
  return <><section className="mb-12 border-b border-line pb-10"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-rust">Independent publishing</p><h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.05] sm:text-7xl">Ideas worth<br /><em className="font-normal">lingering over.</em></h1><p className="mt-6 max-w-xl text-base leading-7 text-ink/65">A small corner for considered stories, curious perspectives, and the people who make them.</p></section>
    <div className="mb-8 flex flex-wrap items-center gap-2"><button className={`rounded-full border px-4 py-2 text-xs font-bold transition ${!categoryId ? 'border-ink bg-ink text-paper' : 'border-line hover:border-rust hover:text-rust'}`} onClick={() => { setCategoryId(''); setPage(0); }}>All stories</button>{categories.map((category) => <button key={category.id} className={`rounded-full border px-4 py-2 text-xs font-bold transition ${String(category.id) === String(categoryId) ? 'border-ink bg-ink text-paper' : 'border-line hover:border-rust hover:text-rust'}`} onClick={() => { setCategoryId(category.id); setPage(0); }}>{category.name}</button>)}</div>
    {error && <p className="mb-8 border-l-4 border-rust bg-rust/10 px-4 py-3 text-sm">{error}</p>}
    {loading ? <p className="py-16 text-center text-sm text-ink/60">Loading stories...</p> : data.content?.length ? <><div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{data.content.map((post) => <PostCard key={post.id} post={post} />)}</div><Pagination page={data.number ?? page} totalPages={data.totalPages} onChange={setPage} /></> : <p className="border-t border-line py-16 text-center font-display text-2xl">No published stories here yet.</p>}
  </>;
}
