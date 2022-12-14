package com.soj.booksharing.controller;

import com.soj.booksharing.entity.RentedBook;
import com.soj.booksharing.services.RentalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/rentals")
public class RentalController {

    private final RentalService rentalService;


    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @GetMapping
    public ResponseEntity<List<RentedBook>> all() {
        return rentalService.fetchAll();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<RentedBook> getById(@PathVariable(value = "id") Long id) {
        return rentalService.fetchById(id);
    }

    @PostMapping
    public ResponseEntity<String> add(@RequestBody RentedBook rentedBook) {
        return rentalService.addNew(rentedBook);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<String> update(@RequestBody RentedBook rentedBook, @PathVariable(value = "id") Long id) {
        return rentalService.update(rentedBook, id);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) {
        return rentalService.delete(id);
    }

    @DeleteMapping(value = "/pending/{id}")
    public ResponseEntity<String>deletePending(@PathVariable(value = "id")Long id){
        return rentalService.deletePending(id);
    }
    @GetMapping(value = "/available")
    public ResponseEntity<List<String>> available() {
        return rentalService.availableBooks();
    }

    @GetMapping(value = "/available/{id}")
    public ResponseEntity<Boolean> bookAvailable(@PathVariable(value = "id") Long bookId) {
        return rentalService.checkIfBookAvailable(bookId);
    }

    @PutMapping(value = "/{id}/extend")
    public ResponseEntity<String> extendEndDate(@PathVariable(value = "id") Long id) {
        return rentalService.extend(id);
    }
}
