package com.soj.booksharing.services;

import com.soj.booksharing.entity.Wishlist;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface WishlistService {

    ResponseEntity<List<Wishlist>> allWishes();

    ResponseEntity<Wishlist> wishById(Long id);
}
