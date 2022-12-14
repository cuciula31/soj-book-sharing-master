package com.soj.booksharing.services;


import com.soj.booksharing.entity.*;
import org.springframework.http.ResponseEntity;

import javax.validation.constraints.NotNull;
import java.util.List;

public interface UserService {


    ResponseEntity<User> fetchUser(@NotNull Long id);

    ResponseEntity<List<User>> fetchAllUsers();

    ResponseEntity<String> deleteUser(Long id);

    ResponseEntity<String> update(User user, Long id);

    ResponseEntity<User> add(User user);

    ResponseEntity<String> addExistingBook(Long userId, Long bookId);

    ResponseEntity<String> addPending(Long userId, Long bookId, Integer rentingPeriod);

    ResponseEntity<String> addRejected(Long userId,Long ownerId, Long bookId);
    ResponseEntity<String> addEnded(Long userId, Long ownerId ,Long bookId);

    ResponseEntity<String> addRental(Long userId, Long bookId, Integer rentInterval);

    ResponseEntity<String> addNewBook(Book book, Long userId);

    ResponseEntity<String> addToWishlist(Long userId, Long bookId);

    ResponseEntity<List<Book>> fetchOwnedBooks(Long id);

    ResponseEntity<List<RentedBook>> rentedBooksByUser(Long id);

    ResponseEntity<List<User>> fetchAllUsersThatOwn(Long id);

    ResponseEntity<List<RentedBook>> whoRentedMyBooks(Long userId);

    ResponseEntity<List<PendingRental>> fetchMyPending(Long userId);

    ResponseEntity<List<PendingRental>> fetchOthersPending(Long userId);

    ResponseEntity<List<RejectedRental>> fetchMyRejected(Long userId);

    ResponseEntity<List<RejectedRental>> fetchOthersRejected(Long userId);

    ResponseEntity<List<EndedRental>> fetchMyEnded(Long userId);

    ResponseEntity<List<EndedRental>> fetchOthersEnded(Long userId);

    ResponseEntity<List<Wishlist>> wishListByUserId(Long userId);

    ResponseEntity<String> deleteWish(Long userId, Integer wish);
}
