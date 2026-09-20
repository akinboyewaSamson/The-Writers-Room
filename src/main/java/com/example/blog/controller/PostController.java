package com.example.blog.controller;

import com.example.blog.dto.PostResponse;
import com.example.blog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/posts") @RequiredArgsConstructor
public class PostController {
    private final PostService service;
    @GetMapping public Page<PostResponse> all(@RequestParam(required = false) Long categoryId, Pageable pageable) { return service.publicPosts(categoryId, pageable); }
    @GetMapping("/{id}") public PostResponse one(@PathVariable Long id) { return service.publicPost(id); }
}
