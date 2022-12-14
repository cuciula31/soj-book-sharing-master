package com.soj.booksharing.repository;

import com.soj.booksharing.entity.PendingRental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PendingRentalRepository extends JpaRepository<PendingRental, Long> {
}
