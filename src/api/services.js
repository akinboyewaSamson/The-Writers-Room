import api from './client';

export const listPosts = (params = {}) => api.get('/posts', { params });
export const getPost = (id) => api.get(`/posts/${id}`);
export const listCategories = () => api.get('/categories');
export const registerAuthor = (payload) => api.post('/authors/register', payload);
export const listAuthorPosts = (params = {}) => api.get('/author/posts', { params });
export const getAuthorPost = (id) => api.get(`/author/posts/${id}`);
export const createPost = (payload) => api.post('/author/posts', payload);
export const updatePost = (id, payload) => api.put(`/author/posts/${id}`, payload);
export const deletePost = (id) => api.delete(`/author/posts/${id}`);
export const listEditorPosts = (params = {}) => api.get('/editor/posts', { params });
export const publishPost = (id) => api.put(`/editor/posts/${id}/publish`);
export const assignCategoryAuthor = (categoryId, authorId) => api.put(`/editor/categories/${categoryId}/author/${authorId}`);
