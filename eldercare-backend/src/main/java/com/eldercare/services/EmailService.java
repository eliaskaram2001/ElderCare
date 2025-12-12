package com.eldercare.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${bug.report.receiver}")
    private String receiverEmail;

    public void sendBugReport(String name, String email, String description) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(receiverEmail);
        message.setSubject("New Bug Report from " + name);
        message.setText(
                "Name: " + name + "\n" +
                        "Email: " + email + "\n\n" +
                        "Description:\n" + description
        );

        mailSender.send(message);
    }
}
