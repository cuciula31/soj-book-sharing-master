package com.soj.booksharing.services;

import com.soj.booksharing.entity.Wishlist;
import com.soj.booksharing.repository.WishlistRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistServiceImpl implements WishlistService{

    private final WishlistRepository wishlistRepository;

    public WishlistServiceImpl(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }


    @Override
    public ResponseEntity<List<Wishlist>> allWishes() {
       return ResponseEntity.ok(wishlistRepository.findAll());
    }

    @Override
    public ResponseEntity<Wishlist> wishById(Long id) {

        if (wishlistRepository.findById(id).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(wishlistRepository.findById(id).get());
    }
}
