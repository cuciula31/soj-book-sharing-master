package com.soj.booksharing.repository;

import com.soj.booksharing.entity.EndedRental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EndedRentalRepository extends JpaRepository<EndedRental, Long> {
}
