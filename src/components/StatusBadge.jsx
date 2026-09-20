import React from 'react';

export default function StatusBadge({ status }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${status === 'PUBLISHED' ? 'bg-moss/15 text-moss' : 'bg-rust/15 text-rust'}`}>{status}</span>;
}
