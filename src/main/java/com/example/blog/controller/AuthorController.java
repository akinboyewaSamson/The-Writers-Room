package com.example.blog.controller;

import com.example.blog.dto.AuthorResponse;
import com.example.blog.dto.RegisterRequest;
import com.example.blog.service.AuthorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/authors") @RequiredArgsConstructor
public class AuthorController {
    private final AuthorService service;
    @PostMapping("/register") @ResponseStatus(HttpStatus.CREATED)
    public AuthorResponse register(@Valid @RequestBody RegisterRequest request) { return service.register(request); }
}
