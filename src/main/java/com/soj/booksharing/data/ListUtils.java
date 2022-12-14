package com.soj.booksharing.data;

import com.soj.booksharing.entity.Book;
import com.soj.booksharing.entity.RentedBook;
import com.soj.booksharing.entity.User;

import java.util.List;

public class ListUtils {


    private static List<RentedBook> getRentalsWithSameBook(List<RentedBook> rentedBooks, Book book){
        return rentedBooks.stream().filter(r->r.getBook().equals(book)).toList();
    }

    public static List<User> getOwnersThatRentedThisBook(List<RentedBook> rentedBooks, Book book){
        return getRentalsWithSameBook(rentedBooks,book).stream().map(RentedBook::getUser).toList();
    }

    public static List<User> getOwnersOfBooks(Book book){
        return book.getUsers();
    }

    public static List<Book> getBooksFromRentals(List<RentedBook> rentedBooks){
        return rentedBooks.stream().map(RentedBook::getBook).toList();
    }

}
