package com.home_zone.home_zone.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.home_zone.home_zone.model.Reminder;
import com.home_zone.home_zone.repository.ReminderRepository;

@Service
public class ReminderService {
    @Autowired
    private ReminderRepository reminderRepository;
    public Reminder addReminder(Reminder reminder) {
        return reminderRepository.save(reminder);
    }

    public List<Reminder> getAllReminders() {
        return reminderRepository.findAll();
    }

    public void deleteReminder(String id){
        reminderRepository.deleteById(id);
    }

    public Reminder updateReminder(String id, Reminder newReminder) {
        return reminderRepository.save(newReminder);
    }

    public void sendEmailForReminders() {
        List<Reminder> reminders = reminderRepository.findAll();
        
        for (Reminder reminder : reminders) {
            if (!reminder.isEmailSent()) {
                System.out.println("Sending email to " + reminder.getName() + " about their reminder.");
                reminder.setEmailSent(true);
                reminderRepository.save(reminder);
            }
        }
    }
}
