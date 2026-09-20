package com.example.blog.config;

import com.example.blog.entity.Author;
import com.example.blog.entity.Category;
import com.example.blog.entity.Role;
import com.example.blog.repository.AuthorRepository;
import com.example.blog.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@Configuration @RequiredArgsConstructor
public class SeedConfig {
    private final CategoryRepository categories;
    private final AuthorRepository authors;
    private final PasswordEncoder encoder;
    @Value("${blog.default-editor.name}") private String editorName;
    @Value("${blog.default-editor.email}") private String editorEmail;
    @Value("${blog.default-editor.password}") private String editorPassword;

    @Bean CommandLineRunner seed() { return args -> seedData(); }
    @Transactional
    void seedData() {
        if (!authors.existsByRole(Role.EDITOR)) authors.save(new Author(editorName, editorEmail.toLowerCase(), encoder.encode(editorPassword), Role.EDITOR));
        for (String name : new String[]{"Entertainment", "Sports", "Culture", "Business", "Technology", "Lifestyle"}) if (categories.findByName(name).isEmpty()) categories.save(new Category(name));
    }
}
