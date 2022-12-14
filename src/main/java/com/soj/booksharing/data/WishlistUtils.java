package com.soj.booksharing.data;

import com.soj.booksharing.entity.Book;
import com.soj.booksharing.entity.Wishlist;
import com.soj.booksharing.repository.BooksRepository;

import java.util.List;

public class WishlistUtils {
    public static Boolean isAlready(Long bookId, List<Wishlist> wishlist, BooksRepository booksRepository){
       List<Book> booksFromWishlist = wishlist.stream().map(Wishlist::getBook).toList();
       return (booksFromWishlist.contains(BookUtils.getById(bookId,booksRepository)));
    }
}
