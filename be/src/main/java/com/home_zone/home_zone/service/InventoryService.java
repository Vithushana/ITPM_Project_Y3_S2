package com.home_zone.home_zone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.home_zone.home_zone.model.InventoryItem;
import com.home_zone.home_zone.repository.InventoryRepository;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // Get all inventory items
    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    // Delete an item by id
    public void deleteItem(String id) {
        inventoryRepository.deleteById(id);
    }

    // Update an inventory item
    public InventoryItem updateItem(String id, InventoryItem item) {
        if (inventoryRepository.existsById(id)) {
            item.setId(id);
            return inventoryRepository.save(item);
        }
        return null;
    }

    public InventoryItem createItem(InventoryItem newItem) {
        return inventoryRepository.save(newItem);
    }
}