package com.home_zone.home_zone.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reminders")
public class Reminder {
    @Id
    private String id;
    private String name;
    private String description;
    private String reminderDate;
    private String purchasingDate;
    private boolean emailSent;
    private Category category;

    public enum Category {
        ELECTRONICS,
        MEDICINE, 
        GROCERIES;
    }

    public Reminder(String name, String description, String reminderDate, boolean emailSent, Category category, String purchasingDate) {
        this.name = name;
        this.description = description;
        this.reminderDate = reminderDate;
        this.purchasingDate = purchasingDate;  
        this.emailSent = emailSent;
        this.category = category;
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

    public String getdescription() {
        return description;
    }

    public void setdescription(String description) {
        this.description = description;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getpurchasingDate(){
        return purchasingDate;
    }
    
    public void setpurchasingDate(String purchasingDate){
        this.purchasingDate=purchasingDate;
    }
    
    
}
