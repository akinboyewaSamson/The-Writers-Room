import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getApiError } from '../api/client';
import { createPost, getAuthorPost, listCategories, updatePost } from '../api/services';
import PostForm from '../components/PostForm';

export default function AuthorPostEditor() {
  const { id } = useParams(); const navigate = useNavigate(); const editing = Boolean(id); const [post, setPost] = useState(null); const [categories, setCategories] = useState([]); const [error, setError] = useState(''); const [loading, setLoading] = useState(editing); const [submitting, setSubmitting] = useState(false);
  useEffect(() => { listCategories().then((res) => setCategories(res.data)).catch((err) => setError(getApiError(err))); if (editing) getAuthorPost(id).then((res) => setPost(res.data)).catch((err) => setError(getApiError(err))).finally(() => setLoading(false)); }, [id, editing]);
  const submit = async (payload) => { setSubmitting(true); setError(''); try { if (editing) await updatePost(id, payload); else await createPost(payload); navigate('/author/posts'); } catch (err) { setError(err.response?.status === 403 ? 'You can only write in your assigned category.' : getApiError(err)); } finally { setSubmitting(false); } };
  if (loading) return <p className="py-16 text-center text-sm text-ink/60">Loading draft...</p>;
  const readOnly = post?.status === 'PUBLISHED';
  return <div className="mx-auto max-w-3xl"><Link to="/author/posts" className="text-xs font-bold uppercase tracking-[0.16em] text-rust">← Back to my posts</Link><h1 className="mt-8 font-display text-5xl font-bold">{readOnly ? 'Published post' : editing ? 'Edit draft' : 'New draft'}</h1>{error && <p className="mt-6 border-l-4 border-rust bg-rust/10 px-4 py-3 text-sm">{error}</p>}<div className="mt-10"><PostForm categories={categories} initialPost={post} onSubmit={submit} submitting={submitting} readOnly={readOnly} /></div></div>;
}
