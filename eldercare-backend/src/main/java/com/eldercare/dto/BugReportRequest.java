package com.eldercare.dto;

import lombok.Data;

@Data
public class BugReportRequest {
    private String name;
    private String email;
    private String description;
}
