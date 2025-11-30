package com.eldercare.repository;

import com.eldercare.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByProviderId(Long providerId);
    List<Booking> findByClientId(Long clientId);
}