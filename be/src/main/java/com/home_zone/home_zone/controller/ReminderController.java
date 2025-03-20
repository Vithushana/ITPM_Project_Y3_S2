package com.home_zone.home_zone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.home_zone.home_zone.model.Reminder;
import com.home_zone.home_zone.service.ReminderService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/reminders")
public class ReminderController {
    @Autowired
    private ReminderService reminderService;

    @PostMapping
    public Reminder addReminder(@RequestBody Reminder reminder) {
        return reminderService.addReminder(reminder);
    }

    @GetMapping
    public List<Reminder> getAllReminders() {
        return reminderService.getAllReminders();
    }

    @PostMapping("/send-email")
    public String sendEmail() {
        reminderService.sendEmailForReminders();
        return "Emails sent successfully!";
    }

    
}
