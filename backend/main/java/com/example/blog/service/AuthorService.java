package com.example.blog.service;

import com.example.blog.dto.AuthorResponse;
import com.example.blog.dto.RegisterRequest;
import com.example.blog.entity.Author;
import com.example.blog.entity.Role;
import com.example.blog.exception.ApiException;
import com.example.blog.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @RequiredArgsConstructor
public class AuthorService {
    private final AuthorRepository authors;
    private final PasswordEncoder passwordEncoder;
    private final MappingService mapper;

    @Transactional
    public AuthorResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        if (authors.existsByEmail(email)) throw ApiException.conflict("Email is already registered");
        return mapper.author(authors.save(new Author(request.name().trim(), email, passwordEncoder.encode(request.password()), Role.AUTHOR)));
    }
}
