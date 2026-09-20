package com.example.blog.repository;

import com.example.blog.entity.Post;
import com.example.blog.entity.PostStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByStatus(PostStatus status, Pageable pageable);
    Page<Post> findByStatusAndCategoryId(PostStatus status, Long categoryId, Pageable pageable);
    Page<Post> findByAuthorId(Long authorId, Pageable pageable);
    Page<Post> findByAuthorIdAndStatus(Long authorId, PostStatus status, Pageable pageable);
    Page<Post> findByCategoryId(Long categoryId, Pageable pageable);
    Page<Post> findByStatusAndCategoryIdOrStatus(PostStatus status, Long categoryId, PostStatus sameStatus, Pageable pageable);
}
