import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthorPosts from './pages/AuthorPosts';
import AuthorPostEditor from './pages/AuthorPostEditor';
import EditorPosts from './pages/EditorPosts';
import EditorCategories from './pages/EditorCategories';

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute role="AUTHOR" />}>
            <Route path="/author/posts" element={<AuthorPosts />} />
            <Route path="/author/posts/new" element={<AuthorPostEditor />} />
            <Route path="/author/posts/:id/edit" element={<AuthorPostEditor />} />
          </Route>
          <Route element={<ProtectedRoute role="EDITOR" />}>
            <Route path="/editor/posts" element={<EditorPosts />} />
            <Route path="/editor/categories" element={<EditorCategories />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
