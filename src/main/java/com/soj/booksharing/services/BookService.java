package com.soj.booksharing.services;

import com.soj.booksharing.entity.Book;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BookService {

    ResponseEntity<List<Book>> fetchAll();
    ResponseEntity<Book> fetchById(Long id);
    ResponseEntity<String> deleteById(Long id);
    ResponseEntity<String> update( Book book, Long id);
    ResponseEntity<String> add(Book book);

    ResponseEntity<List<String>> booksWithTitle(String title);
    ResponseEntity<List<String>> booksWithAuthor(String author);

}
