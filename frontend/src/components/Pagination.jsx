import React from 'react';

export default function Pagination({ page, totalPages, onChange }) {
  if (!totalPages || totalPages < 2) return null;
  return <div className="mt-10 flex items-center justify-between border-t border-line pt-5 text-sm">
    <button className="button-secondary px-3 py-2" disabled={page === 0} onClick={() => onChange(page - 1)}>Previous</button>
    <span className="text-ink/60">Page <strong className="text-ink">{page + 1}</strong> of {totalPages}</span>
    <button className="button-secondary px-3 py-2" disabled={page >= totalPages - 1} onClick={() => onChange(page + 1)}>Next</button>
  </div>;
}
