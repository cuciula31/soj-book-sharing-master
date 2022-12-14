package com.soj.booksharing.services;

import com.soj.booksharing.entity.PendingRental;
import com.soj.booksharing.entity.RentedBook;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RentalService {

    //Create
    ResponseEntity<String> addNew(RentedBook rentedBook);
    //Read
    ResponseEntity<List<RentedBook>> fetchAll();

    ResponseEntity<List<PendingRental>> fetchAllPending();

    ResponseEntity<RentedBook> fetchById(Long id);

    //Update
    ResponseEntity<String> update(RentedBook rentedBook, Long id);

    //Delete
    ResponseEntity<String> delete(Long id);

    ResponseEntity<String> deletePending(Long id);

    ResponseEntity<List<String>> availableBooks();

    ResponseEntity<Boolean> checkIfBookAvailable(Long bookId);

    ResponseEntity<String> extend(Long id);
}
