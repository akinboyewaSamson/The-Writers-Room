import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getApiError } from '../api/client';
import { getPost } from '../api/services';
import StatusBadge from '../components/StatusBadge';

export default function PostDetails() {
  const { id } = useParams(); const [post, setPost] = useState(null); const [error, setError] = useState('');
  useEffect(() => { getPost(id).then((res) => setPost(res.data)).catch((err) => setError(getApiError(err))); }, [id]);
  if (error) return <p className="border-l-4 border-rust bg-rust/10 px-4 py-3 text-sm">{error}</p>;
  if (!post) return <p className="py-16 text-center text-sm text-ink/60">Loading story...</p>;
  return <article className="mx-auto max-w-3xl"><Link to="/" className="text-xs font-bold uppercase tracking-[0.16em] text-rust">← Back to stories</Link><div className="mt-10 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-ink/50"><span>{post.categoryName}</span><span>·</span><span>{post.authorName}</span>{post.status && <StatusBadge status={post.status} />}</div><h1 className="mt-5 font-display text-5xl font-bold leading-tight sm:text-7xl">{post.title}</h1><p className="mt-5 text-sm text-ink/50">Published {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}</p><div className="mt-12 whitespace-pre-wrap border-t border-line pt-10 text-lg leading-9 text-ink/80">{post.content}</div></article>;
}
