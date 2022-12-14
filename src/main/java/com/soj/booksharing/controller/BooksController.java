package com.soj.booksharing.controller;

import com.soj.booksharing.entity.Book;
import com.soj.booksharing.exception.ExceptionHandling;
import com.soj.booksharing.services.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/books")

public class BooksController {

    private final BookService bookService;

    public BooksController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<Book>> readBooks() {
        return bookService.fetchAll();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Book> getById(@PathVariable(value = "id") Long id) {
        return bookService.fetchById(id);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<List<String>> getByName(@PathVariable(value = "title") String title) {
        return bookService.booksWithTitle(title);
    }

    @GetMapping("/author/{author}")
    public ResponseEntity<List<String>> getByAuthor(@PathVariable(value = "author") String author) {
        return bookService.booksWithAuthor(author);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteById(@PathVariable(value = "id") Long id) {
        return bookService.deleteById(id);
    }

    @PostMapping
    public ResponseEntity<String> add(@RequestBody Book book) {
        return bookService.add(book);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<String> update(@RequestBody Book book, @PathVariable("id") Long id) {
        return bookService.update(book, id);
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> validationCheck(MethodArgumentNotValidException e) {
        return ExceptionHandling.handleForValidationErrors(e);
    }
}
