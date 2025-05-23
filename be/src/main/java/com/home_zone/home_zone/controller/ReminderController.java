package com.home_zone.home_zone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.home_zone.home_zone.model.Reminder;
import com.home_zone.home_zone.service.ReminderService;
import org.springframework.web.bind.annotation.PutMapping;


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
     //email reminder to all users
    @PostMapping("/send-email")
    public String sendEmail() {
        reminderService.sendEmailForReminders();
        return "Emails sent successfully!";
    }
    // delete reminder by id
    @DeleteMapping("/{id}")
    public void deleteReminder(@PathVariable String id) {
        reminderService.deleteReminder(id);
    }
    
    // update reminder by id
    @PutMapping("/{id}")
    public Reminder updateReminder(@PathVariable String id, @RequestBody Reminder reminder){
        return reminderService.updateReminder(id, reminder);
    }
    
}
