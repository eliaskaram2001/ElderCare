package com.eldercare.controller;

import com.eldercare.model.Message;
import com.eldercare.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin("*")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    // Send message
    @PostMapping
    public Message sendMessage(@RequestBody Message message) {
        return messageRepository.save(message);
    }

    // Load chat for booking
    @GetMapping("/{bookingId}")
    public List<Message> getChat(@PathVariable Long bookingId) {
        return messageRepository.findByBookingIdOrderBySentAtAsc(bookingId);
    }
}
