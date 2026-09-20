import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function PostCard({ post, to = `/posts/${post.id}`, actions }) {
  return <article className="group flex h-full flex-col border-t-2 border-ink pt-4">
    <div className="mb-4 flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[0.14em] text-rust">{post.categoryName || 'Uncategorized'}</span>{post.status && <StatusBadge status={post.status} />}</div>
    <h2 className="font-display text-2xl font-bold leading-tight group-hover:text-rust sm:text-3xl"><Link to={to}>{post.title}</Link></h2>
    <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink/65">{post.content}</p>
    <div className="mt-auto flex items-center justify-between pt-6 text-xs text-ink/50"><span>By {post.authorName || 'Field Notes'}</span>{post.createdAt && <span>{new Date(post.createdAt).toLocaleDateString()}</span>}</div>
    {actions && <div className="mt-4 border-t border-line pt-3">{actions}</div>}
  </article>;
}
