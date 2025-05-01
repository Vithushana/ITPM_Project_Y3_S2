package com.home_zone.home_zone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.home_zone.home_zone.model.ContactMessage;
import com.home_zone.home_zone.service.ContactMessageService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactMessageService contactMessageService;

    @PostMapping
    public String handleContactMessage(@RequestBody ContactMessage message) {
        contactMessageService.saveMessage(message);
        return "Message saved successfully!";
    }
}
