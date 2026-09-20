package com.example.blog.service;

import com.example.blog.dto.*;
import com.example.blog.entity.*;
import org.springframework.stereotype.Component;

@Component
public class MappingService {
    public AuthorResponse author(Author value) { return value == null ? null : new AuthorResponse(value.getId(), value.getName(), value.getEmail(), value.getRole().name()); }
    public CategoryResponse category(Category value) { return new CategoryResponse(value.getId(), value.getName(), author(value.getAuthor())); }
    public PostResponse post(Post value) { return new PostResponse(value.getId(), value.getTitle(), value.getContent(), value.getStatus().name(), value.getCreatedAt(), value.getUpdatedAt(), value.getPublishedAt(), value.getAuthor().getId(), value.getAuthor().getName(), value.getCategory().getId(), value.getCategory().getName()); }
}
