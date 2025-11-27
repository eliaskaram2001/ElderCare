package com.eldercare.dto;

import com.eldercare.model.UserRole;

public class RegisterRequest {
    public String fullName;
    public String email;
    public String password;
    public UserRole role;
    public String location;
    public String bio;
    public String phone;
}
