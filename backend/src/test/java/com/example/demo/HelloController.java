package com.example.demo; // Apnar project er package name onujayi hobe

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String sayHello() {
        return "Hello! Amar Spring Boot Application thikvabe kaj korche! 🚀";
    }
}