package com.example.blog.controller;

import com.example.blog.dto.PostRequest;
import com.example.blog.dto.PostResponse;
import com.example.blog.entity.PostStatus;
import com.example.blog.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/author/posts") @RequiredArgsConstructor
public class AuthorPostController {
    private final PostService service;
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public PostResponse create(@Valid @RequestBody PostRequest request, Authentication auth) { return service.create(request, auth); }
    @GetMapping public Page<PostResponse> all(@RequestParam(required = false) PostStatus status, Pageable pageable, Authentication auth) { return service.own(auth, status, pageable); }
    @GetMapping("/{id}") public PostResponse one(@PathVariable Long id, Authentication auth) { return service.ownOne(id, auth); }
    @PutMapping("/{id}") public PostResponse update(@PathVariable Long id, @Valid @RequestBody PostRequest request, Authentication auth) { return service.update(id, request, auth); }
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id, Authentication auth) { service.delete(id, auth); }
}
