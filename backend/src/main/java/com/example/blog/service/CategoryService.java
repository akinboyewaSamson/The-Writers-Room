package com.example.blog.service;

import com.example.blog.dto.CategoryResponse;
import com.example.blog.entity.Author;
import com.example.blog.entity.Category;
import com.example.blog.entity.Role;
import com.example.blog.exception.ApiException;
import com.example.blog.repository.AuthorRepository;
import com.example.blog.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;

import java.util.List;

@Service @RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categories;
    private final AuthorRepository authors;
    private final MappingService mapper;

    @Transactional(readOnly = true)
    public List<CategoryResponse> all() { return categories.findAll().stream().map(mapper::category).toList(); }

    @Transactional
    public void assign(Long categoryId, Long authorId, Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof Author editor) || editor.getRole() != Role.EDITOR) throw ApiException.forbidden("Editor role required");
        Category category = categories.findById(categoryId).orElseThrow(() -> ApiException.notFound("Category not found"));
        Author author = authors.findById(authorId).orElseThrow(() -> ApiException.notFound("Author not found"));
        if (author.getRole() != Role.AUTHOR) throw ApiException.badRequest("Only authors can be assigned to categories");
        categories.findAll().stream().filter(other -> other.getAuthor() != null && other.getAuthor().getId().equals(authorId) && !other.getId().equals(categoryId)).findAny().ifPresent(other -> { throw ApiException.conflict("Author is already assigned to another category"); });
        category.setAuthor(author);
        categories.save(category);
    }
}
