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

import com.home_zone.home_zone.model.ShoppingItem;
import com.home_zone.home_zone.repository.ShoppingItemRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/shopping")
public class ShoppingController {
    @Autowired
    private ShoppingItemRepository shoppingItemRepository;

    @PostMapping("/add")
    public ShoppingItem addItem(@RequestBody ShoppingItem item) {
        return shoppingItemRepository.save(item);
    }

    @GetMapping("/{category}")
    public List<ShoppingItem> getItems(@PathVariable String category) {
        return shoppingItemRepository.findByCategory(category);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteItem(@PathVariable String id) {
        shoppingItemRepository.deleteById(id);
    }
}
