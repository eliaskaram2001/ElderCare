package com.eldercare.controller;

import com.eldercare.model.Booking;
import com.eldercare.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }

    @GetMapping("/provider/{id}")
    public List<Booking> getProviderBookings(@PathVariable Long id) {
        return bookingRepository.findByProviderId(id);
    }

    @GetMapping("/client/{id}")
    public List<Booking> getClientBookings(@PathVariable Long id) {
        return bookingRepository.findByClientId(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");

        return bookingRepository.findById(id).map(booking -> {
            booking.setStatus(newStatus);
            bookingRepository.save(booking);
            return ResponseEntity.ok(booking);
        }).orElse(ResponseEntity.notFound().build());
    }
}