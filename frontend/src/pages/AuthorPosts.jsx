import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, listAuthorPosts } from '../api/services';
import { getApiError } from '../api/client';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

export default function AuthorPosts() {
  const [status, setStatus] = useState(''); const [page, setPage] = useState(0); const [data, setData] = useState({ content: [], totalPages: 0 }); const [error, setError] = useState(''); const [loading, setLoading] = useState(true);
  const load = () => { setLoading(true); listAuthorPosts({ page, size: 6, ...(status ? { status } : {}) }).then((res) => setData(res.data)).catch((err) => setError(getApiError(err))).finally(() => setLoading(false)); };
  useEffect(load, [page, status]);
  const remove = async (id) => { if (!window.confirm('Delete this draft?')) return; try { await deletePost(id); load(); } catch (err) { setError(getApiError(err)); } };
  return <><div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-b border-line pb-7"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-rust">Author desk</p><h1 className="mt-2 font-display text-5xl font-bold">My posts</h1></div><Link className="button-primary" to="/author/posts/new">New draft +</Link></div><div className="mb-8 flex gap-2">{[['', 'All'], ['DRAFT', 'Draft'], ['PUBLISHED', 'Published']].map(([value, label]) => <button key={value} onClick={() => { setStatus(value); setPage(0); }} className={`rounded-full border px-4 py-2 text-xs font-bold ${status === value ? 'border-ink bg-ink text-paper' : 'border-line'}`}>{label}</button>)}</div>{error && <p className="mb-8 border-l-4 border-rust bg-rust/10 px-4 py-3 text-sm">{error}</p>}{loading ? <p className="py-16 text-center text-sm text-ink/60">Loading your posts...</p> : data.content?.length ? <><div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{data.content.map((post) => <PostCard key={post.id} post={post} to={`/author/posts/${post.id}/edit`} actions={<div className="flex gap-4 text-xs font-bold"><Link className="text-rust" to={`/author/posts/${post.id}/edit`}>{post.status === 'DRAFT' ? 'Edit draft' : 'View post'}</Link>{post.status === 'DRAFT' && <button className="text-ink/50 hover:text-rust" onClick={() => remove(post.id)}>Delete</button>}</div>} />)}</div><Pagination page={data.number ?? page} totalPages={data.totalPages} onChange={setPage} /></> : <p className="border-t border-line py-16 text-center font-display text-2xl">No posts match this filter.</p>}</>;
}
