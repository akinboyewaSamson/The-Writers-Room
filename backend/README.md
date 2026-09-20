# Blog backend

Java 25, Spring Boot 3, Spring Data JPA, MySQL, and HTTP Basic authentication.

## Setup

1. Create a MySQL database/user, or allow the configured user to create the `blog` database.
2. Set `DB_HOST`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `BLOG_EDITOR_NAME`, `BLOG_EDITOR_EMAIL`, and `BLOG_EDITOR_PASSWORD` as needed.
3. Start the application with `mvn spring-boot:run`.

Hibernate uses `ddl-auto=update`. Startup seeds the six required categories and the configured editor account. Passwords are stored as BCrypt hashes.

## Endpoints

Replace `BASE` with `http://localhost:8080/api`, `EDITOR_EMAIL` and `EDITOR_PASSWORD` with the configured editor credentials, and `AUTHOR_EMAIL` and `AUTHOR_PASSWORD` with a registered author's credentials.

```bash
# Register an author
curl -X POST "$BASE/authors/register" -H 'Content-Type: application/json' -d '{"name":"Ada Author","email":"ada@example.com","password":"authorpass"}'

# Public reads
curl "$BASE/categories"
curl "$BASE/posts?page=0&size=10"
curl "$BASE/posts/1"
curl "$BASE/posts?categoryId=1"

# Author operations
curl -u AUTHOR_EMAIL:AUTHOR_PASSWORD -X POST "$BASE/author/posts" -H 'Content-Type: application/json' -d '{"title":"Draft title","content":"Draft content","categoryId":1}'
curl -u AUTHOR_EMAIL:AUTHOR_PASSWORD "$BASE/author/posts?status=DRAFT"
curl -u AUTHOR_EMAIL:AUTHOR_PASSWORD "$BASE/author/posts/1"
curl -u AUTHOR_EMAIL:AUTHOR_PASSWORD -X PUT "$BASE/author/posts/1" -H 'Content-Type: application/json' -d '{"title":"Updated title","content":"Updated content","categoryId":1}'
curl -u AUTHOR_EMAIL:AUTHOR_PASSWORD -X DELETE "$BASE/author/posts/1"

# Editor operations
curl -u EDITOR_EMAIL:EDITOR_PASSWORD "$BASE/editor/posts?status=DRAFT&categoryId=1"
curl -u EDITOR_EMAIL:EDITOR_PASSWORD -X PUT "$BASE/editor/posts/1/publish"
curl -u EDITOR_EMAIL:EDITOR_PASSWORD -X PUT "$BASE/editor/categories/1/author/2"
```

All protected requests use HTTP Basic authentication. Public post responses never expose drafts.
