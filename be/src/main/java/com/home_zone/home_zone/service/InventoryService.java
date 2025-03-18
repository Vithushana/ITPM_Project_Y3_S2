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

    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    public void deleteItem(String id) {
        inventoryRepository.deleteById(id);
    }

    public InventoryItem updateItem(InventoryItem updatedItem) {
        return inventoryRepository.save(updatedItem);

    }

    public InventoryItem createItem(InventoryItem newItem) {
        return inventoryRepository.save(newItem);
    }
}