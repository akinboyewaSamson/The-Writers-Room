import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function navClass({ isActive }) { return `text-sm font-bold transition ${isActive ? 'text-rust' : 'text-ink/60 hover:text-ink'}`; }

export default function Navbar() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const dashboard = session?.role === 'EDITOR' ? '/editor/posts' : '/author/posts';
  return <header className="border-b border-line bg-paper/95">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-5 sm:px-8">
      <Link to="/" className="font-display text-2xl font-bold tracking-tight">The Writers' <span className="text-rust">Room</span></Link>
      <nav className="flex items-center gap-4 sm:gap-7">
        {session ? <>
          <NavLink to={dashboard} className={navClass}>{session.role === 'EDITOR' ? 'Editor desk' : 'My posts'}</NavLink>
          {session.role === 'EDITOR' && <NavLink to="/editor/categories" className={navClass}>Categories</NavLink>}
          <button className="text-sm font-bold text-ink/60 hover:text-rust" onClick={() => { logout(); navigate('/'); }}>Logout</button>
        </> : <>
          <NavLink to="/login" className={navClass}>Login</NavLink>
          <NavLink to="/register" className="button-primary px-4 py-2">Register</NavLink>
        </>}
      </nav>
    </div>
  </header>;
}
