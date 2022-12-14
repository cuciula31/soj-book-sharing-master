package com.soj.booksharing.repository;

import com.soj.booksharing.entity.Book;
import com.soj.booksharing.entity.RejectedRental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RejectedRepository extends JpaRepository<RejectedRental, Long> {
}
