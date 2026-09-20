import React, { useEffect, useState } from 'react';

export default function PostForm({ categories, initialPost, onSubmit, submitting, readOnly = false }) {
  const [form, setForm] = useState({ title: '', content: '', categoryId: '' });
  useEffect(() => { if (initialPost) setForm({ title: initialPost.title || '', content: initialPost.content || '', categoryId: initialPost.categoryId || '' }); }, [initialPost]);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => { event.preventDefault(); onSubmit({ ...form, categoryId: Number(form.categoryId) }); };
  return <form onSubmit={submit} className="space-y-6">
    <div><label className="label" htmlFor="title">Title</label><input className="field" id="title" name="title" value={form.title} onChange={update} maxLength="255" required disabled={readOnly} /></div>
    <div><label className="label" htmlFor="categoryId">Category</label><select className="field" id="categoryId" name="categoryId" value={form.categoryId} onChange={update} required disabled={readOnly}><option value="">Choose a category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
    <div><label className="label" htmlFor="content">Story</label><textarea className="field min-h-72 resize-y leading-7" id="content" name="content" value={form.content} onChange={update} required disabled={readOnly} /></div>
    {!readOnly && <button className="button-primary" disabled={submitting}>{submitting ? 'Saving...' : 'Save draft'}</button>}
  </form>;
}
