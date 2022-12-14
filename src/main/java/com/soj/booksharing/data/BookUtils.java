package com.soj.booksharing.data;

import com.soj.booksharing.entity.Book;
import com.soj.booksharing.repository.BooksRepository;

import java.util.Objects;

public class BookUtils {

    public static Book getById(Long id, BooksRepository booksRepository){
        return booksRepository.findById(id).get();
    }

    public static void updateBook(Book book, Book toBeUpdated){
        if (Objects.nonNull(book.getBookTitle())
                && !"".equalsIgnoreCase(
                book.getBookTitle())) {
            toBeUpdated.setBookTitle(
                    book.getBookTitle());
        }

        if (Objects.nonNull(book.getAuthor())
                && !"".equalsIgnoreCase(
                book.getBookTitle())) {
            toBeUpdated.setAuthor(
                    book.getAuthor());
        }
    }
}
