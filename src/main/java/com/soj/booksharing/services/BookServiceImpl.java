package com.soj.booksharing.services;

import com.soj.booksharing.data.BookUtils;
import com.soj.booksharing.data.RentalUtils;
import com.soj.booksharing.data.StringFormatters;
import com.soj.booksharing.entity.Book;

import com.soj.booksharing.repository.BooksRepository;
import com.soj.booksharing.repository.RentalRepository;
import com.sun.istack.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class BookServiceImpl implements BookService {

    private final BooksRepository booksRepository;
    private final RentalRepository rentalRepository;

    public BookServiceImpl(BooksRepository booksRepository, RentalRepository rentalRepository) {
        this.booksRepository = booksRepository;
        this.rentalRepository = rentalRepository;
    }

    @Override
    public ResponseEntity<List<Book>> fetchAll() {
        return ResponseEntity.ok(booksRepository.findAll());
    }

    @Override
    public ResponseEntity<Book> fetchById(@NotNull Long id) {

        if (booksRepository.findById(id).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(booksRepository.findById(id).get());
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        booksRepository.deleteById(id);
        return ResponseEntity.ok(StringFormatters.bookDeleted(id));
    }

    @Override
    public ResponseEntity<String> update(Book book, Long id) {
        Book toBeUpdated = booksRepository.findById(id).get();

        BookUtils.updateBook(book, toBeUpdated);

        booksRepository.save(toBeUpdated);

        return ResponseEntity.ok(StringFormatters.bookUpdated(id));

    }

    @Override
    public ResponseEntity<String> add(Book book) {
        booksRepository.save(book);
        return ResponseEntity.ok(StringFormatters.bookAdded(book.getId()));
    }

    @Override
    public ResponseEntity<List<String>> booksWithTitle(String title) {

        List<String> toReturn = new ArrayList<>();

        for (Book b : booksRepository.findByBookTitleIgnoreCaseContaining(title)) {
            if (RentalUtils.checkIfAvailable(b.getId(), booksRepository, rentalRepository)) {
                toReturn.add(StringFormatters.bookWithTitleIsAvailable(b));
            } else {
                toReturn.add(StringFormatters.bookWithTitleIsUnavailable(b));
            }
        }

        return ResponseEntity.ok(toReturn);
    }

    @Override
    public ResponseEntity<List<String>> booksWithAuthor(String author) {
        List<String> toReturn = new ArrayList<>();

        for (Book b : booksRepository.findByAuthorIgnoreCaseContaining(author)) {
            if (RentalUtils.checkIfAvailable(b.getId(), booksRepository, rentalRepository)) {
                toReturn.add(StringFormatters.bookWithTitleIsAvailable(b));
            } else {
                toReturn.add(StringFormatters.bookWithTitleIsUnavailable(b));
            }
        }

        return ResponseEntity.ok(toReturn);
    }


}
