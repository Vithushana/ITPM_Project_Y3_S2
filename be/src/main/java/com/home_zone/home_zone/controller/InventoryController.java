package com.home_zone.home_zone.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.home_zone.home_zone.model.InventoryItem;
import com.home_zone.home_zone.service.InventoryService;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/create")
    public InventoryItem createItem(@RequestBody InventoryItem newItem) {
        return inventoryService.createItem(newItem);
    }
    
    @GetMapping
    public List<InventoryItem> getAllItems() {
        return inventoryService.getAllItems();
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable String id) {
        inventoryService.deleteItem(id);
    }

    @PutMapping("/update")
    public InventoryItem updateItem(@RequestBody InventoryItem updatedItem) {
        return inventoryService.updateItem(updatedItem);
    }
}
