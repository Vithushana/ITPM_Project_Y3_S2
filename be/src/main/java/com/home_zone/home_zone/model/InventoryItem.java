package com.home_zone.home_zone.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "inventoryitems")
public class InventoryItem {
    @Id 
    private String id;
    private String name;
    private int quantity;
    private String category;
    private String expirationDate;
    public InventoryItem() {}

    public InventoryItem(String name, int quantity, String category, String expirationDate) {
        this.name = name;
        this.quantity = quantity;
        this.category = category;
        this.expirationDate = expirationDate;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    @Override
    public String toString() {
        return "InventoryItem{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", category='" + category + '\'' +
                ", expirationDate=" + expirationDate +
                '}';
    }

    public void setId(String id2) {
        throw new UnsupportedOperationException("Unimplemented method 'setId'");
    }


}
