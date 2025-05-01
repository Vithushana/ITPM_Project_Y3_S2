package com.home_zone.home_zone.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "contactmessage")
public class ContactMessage {
    @Id
    private String id;
    private String name;
    private String email;
    private String message;

    // Getters and setters
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

    public String getEmail() {
         return email; 
        }
    public void setEmail(String email) { 
        this.email = email; 
    }

    public String getMessage() {
         return message; 
        }
    public void setMessage(String message) {
         this.message = message; 
        }
}
