package com.example.blog.repository;

import com.example.blog.entity.Author;
import com.example.blog.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByRole(Role role);
}
