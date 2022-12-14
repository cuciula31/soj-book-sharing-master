package com.soj.booksharing.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;


@Entity
public class EndedRental {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties({"endedBooks", "pendingTo"})
    private User user;

    @ManyToOne()
    @JoinTable(name = "ended_from",
            joinColumns = @JoinColumn(name = "rental_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    @JsonIgnoreProperties({"pendingBooks","rentedFrom","pendingRentals", "users" ,"pendingFrom", "book", "pendingTo"})
    private User endedFrom;

    @ManyToOne
    @JsonIgnoreProperties({"pendingRentals", "pendingFrom", "book", "pendingTo","users","pendingBooks","rentedBook"})
    private Book book;


    public EndedRental(Long id, User user, User pendingFrom, Book book) {
        this.id = id;
        this.user = user;
        this.endedFrom = pendingFrom;
        this.book = book;
    }

    public EndedRental() {

    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public User getRentedFrom() {
        return endedFrom;
    }

    public void setRentedFrom(User rentedFrom) {
        this.endedFrom = rentedFrom;
    }
}
