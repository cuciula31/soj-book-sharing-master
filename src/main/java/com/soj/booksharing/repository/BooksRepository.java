package com.soj.booksharing.repository;

import com.soj.booksharing.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BooksRepository extends JpaRepository<Book, Long> {
    List<Book> findByBookTitleIgnoreCaseContaining(final String bookTitle);
    List<Book> findByAuthorIgnoreCaseContaining(final String author);
}
