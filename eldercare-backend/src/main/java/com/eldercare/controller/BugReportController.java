package com.eldercare.controllers;

import com.eldercare.dto.BugReportRequest;
import com.eldercare.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@RequiredArgsConstructor
public class BugReportController {

    private final EmailService emailService;

    @PostMapping("/bug-report")
    public ResponseEntity<?> submitBugReport(@RequestBody BugReportRequest report) {

        emailService.sendBugReport(
                report.getName(),
                report.getEmail(),
                report.getDescription()
        );

        return ResponseEntity.ok("Bug report sent.");
    }
}
