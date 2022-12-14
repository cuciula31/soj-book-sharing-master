package com.soj.booksharing.repository;

import com.soj.booksharing.entity.RentedBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<RentedBook, Long> {
}
