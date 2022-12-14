package com.soj.booksharing.services;

import com.soj.booksharing.data.*;
import com.soj.booksharing.entity.*;
import com.soj.booksharing.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final BooksRepository booksRepository;
    private final RentalRepository rentalRepository;
    private final WishlistRepository wishlistRepository;
    private final PendingRentalRepository pendingRentalRepository;
    private final EndedRentalRepository endedRentalRepository;
    private final RejectedRepository rejectedRepository;


    public UserServiceImpl(UserRepository repository, BooksRepository booksRepository, RentalRepository rentalRepository, WishlistRepository wishlistRepository, PendingRentalRepository pendingRentalRepository, EndedRentalRepository endedRentalRepository, RejectedRepository rejectedRepository) {
        this.repository = repository;
        this.booksRepository = booksRepository;
        this.rentalRepository = rentalRepository;
        this.wishlistRepository = wishlistRepository;
        this.pendingRentalRepository = pendingRentalRepository;
        this.endedRentalRepository = endedRentalRepository;
        this.rejectedRepository = rejectedRepository;
    }

    @Override
    public ResponseEntity<User> fetchUser(@NotNull Long id) {
           if (repository.findById(id).isPresent()){
               return ResponseEntity.ok(repository.findById(id).get());
           }else{
               return new ResponseEntity<>(HttpStatus.NOT_FOUND);
           }

    }

    @Override
    public ResponseEntity<List<User>> fetchAllUsers() {
        return ResponseEntity.ok(repository.findAll());
    }

    @Override
    public ResponseEntity<String> deleteUser(Long id) {
        if (repository.findById(id).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        repository.deleteById(id);
        return ResponseEntity.ok(StringFormatters.userDeleted(id));
    }

    public ResponseEntity<String> update(User user, Long id) {

        if (repository.findById(id).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        User toBeUpdated = repository.findById(id).get();
        UserUtils.userUpdate(user, toBeUpdated);
        repository.save(toBeUpdated);

        return ResponseEntity.ok(StringFormatters.userUpdated(id));

    }

    @Override
    public ResponseEntity<User> add(User user) {
        return null;
    }

    @Override
    public ResponseEntity<String> addExistingBook(Long userId, Long bookId) {

        if (repository.findById(userId).isEmpty() || booksRepository.findById(bookId).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


        User user = fetchUser(userId).getBody();
        Book book = BookUtils.getById(bookId, booksRepository);

        assert user != null;
        user.getOwnedBooks().add(book);
        book.getUsers().add(user);

        repository.save(user);
        booksRepository.save(book);

        return ResponseEntity.ok(StringFormatters.userUpdated(userId));
    }

    @Override
    public ResponseEntity<String> addPending(Long userId, Long bookId, Integer rentingPeriod) {
        return ResponseEntity.ok(RentalUtils.checkAndSavePending(userId, bookId, rentingPeriod, repository, booksRepository, rentalRepository,pendingRentalRepository));
    }

    @Override
    public ResponseEntity<String> addEnded(Long userId,Long ownerId, Long bookId) {
        return ResponseEntity.ok(RentalUtils.saveEnded(booksRepository.findById(bookId).get(),repository.findById(userId).get(),repository.findById(ownerId).get(),repository,booksRepository,endedRentalRepository));
    }

    @Override
    public ResponseEntity<String> addRejected(Long userId,Long ownerId, Long bookId) {
        return ResponseEntity.ok(RentalUtils.saveRejected(booksRepository.findById(bookId).get(),repository.findById(userId).get(),repository.findById(ownerId).get(),repository,booksRepository,rejectedRepository));
    }


    @Override
    public ResponseEntity<String> addNewBook(Book book, Long userId) {

        User user = fetchUser(userId).getBody();

      //if (!booksRepository.findAll().isEmpty()){
            if (booksRepository.findAll().stream().anyMatch(b -> b.getBookTitle().equals(book.getBookTitle()))) {
                Book existentBook = booksRepository.findAll().stream()
                        .filter(b -> b.getBookTitle().equals(book.getBookTitle()))
                        .findFirst().get(); //If book already found by stream is not necessary to verify ifPresent
                existentBook.getUsers().add(user);
                user.getOwnedBooks().add(existentBook);
                booksRepository.save(existentBook);
            } else {
                book.getUsers().add(user);
                user.getOwnedBooks().add(book);
                booksRepository.save(book);
            }
//        }else{
//            book.getUsers().add(user);
//            user.getOwnedBooks().add(book);
//            booksRepository.save(book);
//        }


        repository.save(user);

        return ResponseEntity.ok(StringFormatters.userUpdated(userId));
    }

    @Override
    public ResponseEntity<String> addToWishlist(Long userId, Long bookId) {
        User user = fetchUser(userId).getBody();
        Book book = BookUtils.getById(bookId, booksRepository);

        if (WishlistUtils.isAlready(bookId, fetchUser(userId).getBody().getWishlist().stream().toList(), booksRepository)) {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED); //StringFormatters.bookFailedToAdd(book);
        } else {
            Wishlist wishlist = new Wishlist();

            user.getWishlist().add(wishlist);
            book.getWishlist().add(wishlist);

            wishlist.setUser(user);
            wishlist.setBook(book);

             if (RentalUtils.checkIfAvailable(bookId,booksRepository,rentalRepository)){
                 wishlist.setEstimatedDate(Date.from(LocalDate.now().atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()));
             }else{
                 wishlist.setEstimatedDate(book.getRentedBook().get(0).getEndDate());
             }

            repository.save(user);
            booksRepository.save(book);
            wishlistRepository.save(wishlist);

            return ResponseEntity.ok(StringFormatters.bookAddedToWishList(book));
        }
    }

    @Override
    public ResponseEntity<String> addRental(Long userId, Long bookId, Integer rentingPeriod) {
        return ResponseEntity.ok(RentalUtils.checkAndSaveRental(userId, bookId, rentingPeriod, repository, booksRepository, rentalRepository));
    }



    @Override
    public ResponseEntity<List<Book>> fetchOwnedBooks(Long id) {
        return ResponseEntity.ok(fetchUser(id).getBody().getOwnedBooks());
    }

    @Override
    public ResponseEntity<List<RentedBook>> rentedBooksByUser(Long id) {
        List<RentedBook> toBeReturned = new ArrayList<>();
        toBeReturned.addAll(fetchUser(id).getBody().getRentedBooks());
        return ResponseEntity.ok(toBeReturned);
    }


    @Override
    public ResponseEntity<List<User>> fetchAllUsersThatOwn(Long id) {
        Book book = booksRepository.getById(id);
        return ResponseEntity.ok(book.getUsers());
    }

    @Override
    public ResponseEntity<List<RentedBook>> whoRentedMyBooks(Long userId) {
        User user = repository.findById(userId).get();
        List<RentedBook> toBeReturned = new ArrayList<>();

        List<RentedBook> rentedBooks = rentalRepository.findAll().stream().filter(rb -> rb.getRentedFrom().equals(user)).toList();

        for (RentedBook rentedBook : rentedBooks) {
            toBeReturned.add(rentedBook);
        }

        return ResponseEntity.ok(toBeReturned) ;
    }

    @Override
    public ResponseEntity<List<PendingRental>> fetchMyPending(Long userId) {
        List<PendingRental> toBeReturned = new ArrayList<>(fetchUser(userId).getBody().getPendingBooks());
        return ResponseEntity.ok(toBeReturned);
    }

    @Override
    public ResponseEntity<List<PendingRental>> fetchOthersPending(Long userId) {
        User user = repository.findById(userId).get();

        List<PendingRental> rentedBooks = pendingRentalRepository.findAll().stream().filter(rb -> rb.getRentedFrom().equals(user)).toList();

        List<PendingRental> toBeReturned = new ArrayList<>(rentedBooks);

        return ResponseEntity.ok(toBeReturned) ;
    }

    @Override
    public ResponseEntity<List<RejectedRental>> fetchMyRejected(Long userId) {
        List<RejectedRental> toBeReturned = new ArrayList<>(fetchUser(userId).getBody().getRejectedBooks());
        return ResponseEntity.ok(toBeReturned);
    }

    @Override
    public ResponseEntity<List<RejectedRental>> fetchOthersRejected(Long userId) {
        User user = repository.findById(userId).get();

        List<RejectedRental> rentedBooks = rejectedRepository.findAll().stream().filter(rb -> rb.getRentedFrom().equals(user)).toList();

        List<RejectedRental> toBeReturned = new ArrayList<>(rentedBooks);

        return ResponseEntity.ok(toBeReturned);
    }

    @Override
    public ResponseEntity<List<EndedRental>> fetchMyEnded(Long userId) {
        List<EndedRental> toBeReturned = new ArrayList<>(fetchUser(userId).getBody().getEndedBooks());
        return ResponseEntity.ok(toBeReturned);
    }

    @Override
    public ResponseEntity<List<EndedRental>> fetchOthersEnded(Long userId) {
        User user = repository.findById(userId).get();

        List<EndedRental> rentedBooks = endedRentalRepository.findAll().stream().filter(rb -> rb.getRentedFrom().equals(user)).toList();

        List<EndedRental> toBeReturned = new ArrayList<>(rentedBooks);

        return ResponseEntity.ok(toBeReturned);
    }

    @Override
    public ResponseEntity<List<Wishlist>> wishListByUserId(Long userId) {
        return ResponseEntity.ok(fetchUser(userId).getBody().getWishlist().stream().toList());
    }

    @Override
    public ResponseEntity<String> deleteWish(Long userId, Integer wish){
        User user = fetchUser(userId).getBody();
        List<Wishlist> wishlist = new ArrayList<>(user.getWishlist().stream().toList());
        if (wish > wishlist.size()){
            return ResponseEntity.ok(StringFormatters.wishRemovalFailed());
        }else{
            Wishlist wishToRemove = wishlist.get(wish);
            Book book = wishToRemove.getBook();
            book.getWishlist().remove(wishToRemove);
            wishlistRepository.delete(wishToRemove);
            wishlist.remove(wish.intValue());
            repository.save(user);
            booksRepository.save(book);
            return ResponseEntity.ok(StringFormatters.wishRemoved(book));
        }
    }
}
