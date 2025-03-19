package com.home_zone.home_zone.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reminders")
public class Reminder {
    @Id
    private String id;
    private String name;
    private String purchasingDate;
    private String reminderDate;
    private boolean emailSent;

    public Reminder(String name, String purchasingDate, String reminderDate, boolean emailSent) {
        this.name = name;
        this.purchasingDate = purchasingDate;
        this.reminderDate = reminderDate;
        this.emailSent = emailSent;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPurchasingDate() {
        return purchasingDate;
    }
    public void setPurchasingDate(String purchasingDate) {
        this.purchasingDate = purchasingDate;
    }
    public String getReminderDate() {
        return reminderDate;
    }
    public void setReminderDate(String reminderDate) {
        this.reminderDate = reminderDate;
    }
    public boolean isEmailSent() {
        return emailSent;
    }
    public void setEmailSent(boolean emailSent) {
        this.emailSent = emailSent;
    }
    
}
