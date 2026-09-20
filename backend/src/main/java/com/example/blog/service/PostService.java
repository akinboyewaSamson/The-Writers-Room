package com.example.blog.service;

import com.example.blog.dto.PostRequest;
import com.example.blog.dto.PostResponse;
import com.example.blog.entity.*;
import com.example.blog.exception.ApiException;
import com.example.blog.repository.CategoryRepository;
import com.example.blog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service @RequiredArgsConstructor
public class PostService {
    private final PostRepository posts;
    private final CategoryRepository categories;
    private final MappingService mapper;

    @Transactional(readOnly = true)
    public Page<PostResponse> publicPosts(Long categoryId, Pageable pageable) { return categoryId == null ? posts.findByStatus(PostStatus.PUBLISHED, pageable).map(mapper::post) : posts.findByStatusAndCategoryId(PostStatus.PUBLISHED, categoryId, pageable).map(mapper::post); }
    @Transactional(readOnly = true)
    public PostResponse publicPost(Long id) { return mapper.post(posts.findById(id).filter(p -> p.getStatus() == PostStatus.PUBLISHED).orElseThrow(() -> ApiException.notFound("Published post not found"))); }

    @Transactional
    public PostResponse create(PostRequest request, Authentication authentication) {
        Author author = currentAuthor(authentication);
        Category category = category(request.categoryId());
        Post post = new Post(); post.setTitle(request.title().trim()); post.setContent(request.content()); post.setAuthor(author); post.setCategory(category); post.setStatus(PostStatus.DRAFT);
        return mapper.post(posts.save(post));
    }
    @Transactional(readOnly = true)
    public Page<PostResponse> own(Authentication auth, PostStatus status, Pageable pageable) { Author author = currentAuthor(auth); return (status == null ? posts.findByAuthorId(author.getId(), pageable) : posts.findByAuthorIdAndStatus(author.getId(), status, pageable)).map(mapper::post); }
    @Transactional(readOnly = true)
    public PostResponse ownOne(Long id, Authentication auth) { return mapper.post(ownDraftOrAny(id, currentAuthor(auth))); }
    @Transactional
    public PostResponse update(Long id, PostRequest request, Authentication auth) { Author author = currentAuthor(auth); Post post = ownDraftOrAny(id, author); post.setTitle(request.title().trim()); post.setContent(request.content()); post.setCategory(category(request.categoryId())); return mapper.post(posts.save(post)); }
    @Transactional
    public void delete(Long id, Authentication auth) { posts.delete(ownDraftOrAny(id, currentAuthor(auth))); }

    @Transactional(readOnly = true)
    public Page<PostResponse> editorPosts(PostStatus status, Long categoryId, Pageable pageable, Authentication auth) {
        requireEditor(auth);
        Page<Post> result;
        if (status != null && categoryId != null) result = posts.findByStatusAndCategoryId(status, categoryId, pageable);
        else if (status != null) result = posts.findByStatus(status, pageable);
        else if (categoryId != null) result = posts.findByCategoryId(categoryId, pageable);
        else result = posts.findAll(pageable);
        return result.map(mapper::post);
    }
    @Transactional
    public PostResponse publish(Long id, Authentication auth) { requireEditor(auth); Post post = posts.findById(id).orElseThrow(() -> ApiException.notFound("Post not found")); if (post.getStatus() != PostStatus.DRAFT) throw ApiException.conflict("Only draft posts can be published"); post.setStatus(PostStatus.PUBLISHED); post.setPublishedAt(LocalDateTime.now()); return mapper.post(posts.save(post)); }

    private Author currentAuthor(Authentication auth) { if (!(auth.getPrincipal() instanceof Author author) || author.getRole() != Role.AUTHOR) throw ApiException.forbidden("Author role required"); return author; }
    private void requireEditor(Authentication auth) { if (!(auth.getPrincipal() instanceof Author author) || author.getRole() != Role.EDITOR) throw ApiException.forbidden("Editor role required"); }
    private Category category(Long id) { return categories.findById(id).orElseThrow(() -> ApiException.notFound("Category not found")); }
    private Post ownDraftOrAny(Long id, Author author) { Post post = posts.findById(id).orElseThrow(() -> ApiException.notFound("Post not found")); if (!post.getAuthor().getId().equals(author.getId())) throw ApiException.forbidden("You may only access your own posts"); if (post.getStatus() != PostStatus.DRAFT) throw ApiException.forbidden("Only draft posts may be changed or accessed here"); return post; }
}
