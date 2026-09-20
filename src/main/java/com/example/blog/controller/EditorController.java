package com.example.blog.controller;

import com.example.blog.dto.PostResponse;
import com.example.blog.entity.PostStatus;
import com.example.blog.service.CategoryService;
import com.example.blog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/editor") @RequiredArgsConstructor
public class EditorController {
    private final PostService posts;
    private final CategoryService categories;
    @GetMapping("/posts") public Page<PostResponse> all(@RequestParam(required = false) PostStatus status, @RequestParam(required = false) Long categoryId, Pageable pageable, Authentication auth) { return posts.editorPosts(status, categoryId, pageable, auth); }
    @PutMapping("/posts/{id}/publish") public PostResponse publish(@PathVariable Long id, Authentication auth) { return posts.publish(id, auth); }
    @PutMapping("/categories/{categoryId}/author/{authorId}") @ResponseStatus(org.springframework.http.HttpStatus.NO_CONTENT) public void assign(@PathVariable Long categoryId, @PathVariable Long authorId, Authentication auth) { categories.assign(categoryId, authorId, auth); }
}
