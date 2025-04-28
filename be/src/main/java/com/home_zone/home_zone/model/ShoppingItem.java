package com.home_zone.home_zone.model;

import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonFormat;

@Document(collection = "shoppingItems")
public class ShoppingItem {
    @Id
    private String id;
    private Category category;
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;    
    
    private String count; 
    private String quantity;
    private String price; 
    private String type;
    private String amount;
    private String note;

    public enum Category {
        ELECTRONICS, MEDICINE, GROCERIES, BALANCEMONEY
    }
    
    // Default constructor
    public ShoppingItem() {
    }

    // All-args constructor
    public ShoppingItem(String id, Category category, String name, LocalDate date, 
                      String count, String quantity, String price, 
                      String type, String amount, String note) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.date = date;
        this.count = count;
        this.quantity = quantity;
        this.price = price;
        this.type = type;
        this.amount = amount;
        this.note = note;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }   

    public void setType(String type) {
        this.type = type;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
    
    @Override
    public String toString() {
        return "ShoppingItem{" +
                "id='" + id + '\'' +
                ", category=" + category +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", count='" + count + '\'' +
                ", quantity='" + quantity + '\'' +
                ", price='" + price + '\'' +
                ", type='" + type + '\'' +
                ", amount='" + amount + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}