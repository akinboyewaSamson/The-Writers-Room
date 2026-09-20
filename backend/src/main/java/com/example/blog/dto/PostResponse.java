package com.example.blog.dto;

import java.time.LocalDateTime;

public record PostResponse(Long id, String title, String content, String status,
                           LocalDateTime createdAt, LocalDateTime updatedAt,
                           LocalDateTime publishedAt, Long authorId, String authorName,
                           Long categoryId, String categoryName) {}
