package com.soj.booksharing.data;

import com.soj.booksharing.entity.*;
import com.soj.booksharing.repository.*;

import java.util.List;

public class RentalUtils {



    private static void insertRelationsBetweenUserOwnerAndBook(RentedBook rentedBook, User user, User owner, Book book) {
        user.getRentedBooks().add(rentedBook);
        owner.getRentedTo().add(rentedBook);
        book.getRentedBook().add(rentedBook);
    }

    private static void insertRelationsBetweenUserOwnerAndBook(PendingRental pendingRental, User user, User owner, Book book) {
        user.getPendingBooks().add(pendingRental);
        owner.getPendingTo().add(pendingRental);
        book.getPendingRentals().add(pendingRental);
    }

    private static void saveRental(UserRepository repository, BooksRepository booksRepository, RentalRepository rentalRepository, User user, User owner, Book book, RentedBook rentedBook) {
        repository.save(owner);
        booksRepository.save(book);
        rentalRepository.save(rentedBook);
        repository.save(user);
    }
    private static void savePending(UserRepository repository, BooksRepository booksRepository, PendingRentalRepository pendingRentalRepository, User user, User owner, Book book, PendingRental pendingRental) {
        repository.save(owner);
        booksRepository.save(book);
        pendingRentalRepository.save(pendingRental);
        repository.save(user);
    }

    public static String saveEnded(Book book,User user,User owner,UserRepository userRepository, BooksRepository booksRepository, EndedRentalRepository endedRentalRepository){

        EndedRental endedRental = new EndedRental();
        endedRental.setUser(user);
        endedRental.setRentedFrom(owner);
        endedRental.setBook(book);

        user.getEndedBooks().add(endedRental);
        owner.getEndedTo().add(endedRental);
        book.getEndedRental().add(endedRental);

        userRepository.save(owner);
        booksRepository.save(book);
        endedRentalRepository.save(endedRental);
        userRepository.save(user);

        return "You have successfully ended a rental";
    }

    public static String saveRejected(Book book,User user,User owner,UserRepository userRepository, BooksRepository booksRepository, RejectedRepository rejectedRepository){

        RejectedRental rejectedRental = new RejectedRental();
        rejectedRental.setUser(user);
        rejectedRental.setRentedFrom(owner);
        rejectedRental.setBook(book);

        user.getRejectedBooks().add(rejectedRental);
        owner.getRejectedTo().add(rejectedRental);
        book.getRejectedRental().add(rejectedRental);

        userRepository.save(owner);
        booksRepository.save(book);
        rejectedRepository.save(rejectedRental);
        userRepository.save(user);

        return "You have successfully ended a rental";
    }

    private static Boolean checkIfRentingPeriodNotInGivenIntervals(int interval) {
        return Checkers.checkIfRentingIntervalIsInRange(interval);
    }


    private static String availableUsersEqualsZeroAlert(Long bookId) {
        return StringFormatters.unavailableForRenting(bookId);
    }

    private static String intervalGreaterThanMaximum() {
        return StringFormatters.invalidRentingPeriod();
    }

    public static String checkAndSaveRental(Long userId, Long bookId, Integer rentingPeriod, UserRepository repository, BooksRepository booksRepository, RentalRepository rentalRepository) {

        User user = UserUtils.getUserById(userId, repository);
        Book book = BookUtils.getById(bookId,booksRepository);
        List<User> availableUsers = book.getUsers();
        User owner = null;

        if (rentalRepository.findAll().size() > 0) {
            List<RentedBook> rentalsWithSameBook = rentalRepository.findAll().stream().filter(r -> r.getBook().equals(book)).toList();
            List<User> ownersThatRentedAlready = rentalsWithSameBook.stream().map(RentedBook::getRentedFrom).toList();

                for (User u : availableUsers){
                    if (!ownersThatRentedAlready.contains(u)){
                        owner = u;
                    }
                }
        } else {
            owner = availableUsers.get(0);
        }

        if (owner == null && rentalRepository.findAll().size() > 0) {
            return availableUsersEqualsZeroAlert(book.getId());
        } else {
            if (checkIfRentingPeriodNotInGivenIntervals(rentingPeriod)) {
                return intervalGreaterThanMaximum();
            } else {
                RentedBook rentedBook = new RentedBook(user,
                        owner,
                        book,
                        RentingIntervals.getIntervalsForSpecificPeriod(rentingPeriod).startDate(),
                        RentingIntervals.getIntervalsForSpecificPeriod(rentingPeriod).endDate(),
                        false);
                assert owner != null;
                RentalUtils.insertRelationsBetweenUserOwnerAndBook(rentedBook, user, owner, book);
                RentalUtils.saveRental(repository, booksRepository, rentalRepository, user, owner, book, rentedBook);
                return "You have rented successfully a book!";
            }
        }


    }

    public static String checkAndSavePending(Long userId, Long bookId, Integer rentingPeriod, UserRepository repository, BooksRepository booksRepository, RentalRepository rentalRepository,PendingRentalRepository pendingRentalRepository){
        User user = UserUtils.getUserById(userId, repository);
        Book book = BookUtils.getById(bookId,booksRepository);
        List<User> availableUsers = book.getUsers();
        User owner = null;

        if (rentalRepository.findAll().size() > 0) {
            List<RentedBook> rentalsWithSameBook = rentalRepository.findAll().stream().filter(r -> r.getBook().equals(book)).toList();
            List<User> ownersThatRentedAlready = rentalsWithSameBook.stream().map(RentedBook::getRentedFrom).toList();

            for (User u : availableUsers){
                if (!ownersThatRentedAlready.contains(u)){
                    owner = u;
                }
            }
        } else {
            owner = availableUsers.get(0);
        }

        if (owner == null && rentalRepository.findAll().size() > 0) {
            return availableUsersEqualsZeroAlert(book.getId());
        } else {
            if (checkIfRentingPeriodNotInGivenIntervals(rentingPeriod)) {
                return intervalGreaterThanMaximum();
            } else {
                PendingRental pendingRental = new PendingRental(user,
                        owner,
                        book,
                        RentingIntervals.getIntervalsForSpecificPeriod(rentingPeriod).startDate(),
                        RentingIntervals.getIntervalsForSpecificPeriod(rentingPeriod).endDate(),
                        false);
                assert owner != null;
                RentalUtils.insertRelationsBetweenUserOwnerAndBook(pendingRental, user, owner, book);
                RentalUtils.savePending(repository, booksRepository, pendingRentalRepository, user, owner, book, pendingRental);
                return "You have rented successfully a book!";
            }
        }

    }



    public static Boolean checkIfAvailable(Long bookId, BooksRepository booksRepository, RentalRepository rentalRepository){
        Book book = BookUtils.getById(bookId,booksRepository);
        List<User> availableUsers = book.getUsers();
        User owner = null;

        if (rentalRepository.findAll().size() > 0) {
            List<RentedBook> rentalsWithSameBook = rentalRepository.findAll().stream().filter(r -> r.getBook().equals(book)).toList();
            List<User> ownersThatRentedAlready = rentalsWithSameBook.stream().map(RentedBook::getRentedFrom).toList();

            for (User u : availableUsers){
                if (!ownersThatRentedAlready.contains(u)){
                    owner = u;
                }
            }
        } else {
            owner = availableUsers.get(0);
        }

        return owner != null || rentalRepository.findAll().size() <= 0;
    }
}
