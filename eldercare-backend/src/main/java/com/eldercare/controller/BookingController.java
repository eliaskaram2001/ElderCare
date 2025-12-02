package com.eldercare.controller;

import com.eldercare.model.Booking;
import com.eldercare.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
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
}