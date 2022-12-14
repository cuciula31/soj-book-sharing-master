package com.soj.booksharing.controller;

import com.soj.booksharing.entity.Wishlist;
import com.soj.booksharing.services.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public ResponseEntity<List<Wishlist>> all(){
        return wishlistService.allWishes();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Wishlist> findById(@PathVariable(value = "id")Long id){
      return wishlistService.wishById(id);

    }
}
