package com.example.blog.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Getter @Setter @NoArgsConstructor
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String title;
    @Column(nullable = false, columnDefinition = "TEXT") private String content;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private PostStatus status = PostStatus.DRAFT;
    @Column(nullable = false, updatable = false) private LocalDateTime createdAt;
    @Column(nullable = false) private LocalDateTime updatedAt;
    private LocalDateTime publishedAt;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) private Author author;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) private Category category;

    @PrePersist void onCreate() { createdAt = LocalDateTime.now(); updatedAt = createdAt; }
    @PreUpdate void onUpdate() { updatedAt = LocalDateTime.now(); }
}
