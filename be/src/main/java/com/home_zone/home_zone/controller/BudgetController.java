package com.home_zone.home_zone.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.home_zone.home_zone.model.BudgetItem;
import com.home_zone.home_zone.repository.BudgetRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/budget")
public class BudgetController {
    @Autowired
    private BudgetRepository budgetRepository;

    // Get all budget items
    @GetMapping
    public List<BudgetItem> getAllBudgetItems() {
        return budgetRepository.findAll();
    }

    // Get a specific budget item by ID
    @GetMapping("/{id}")
    public ResponseEntity<BudgetItem> getBudgetItemById(@PathVariable String id) {
        Optional<BudgetItem> budgetItem = budgetRepository.findById(id);
        if (budgetItem.isPresent()) {
            return new ResponseEntity<>(budgetItem.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Add a new budget item
    @PostMapping
    public ResponseEntity<BudgetItem> createBudgetItem(@RequestBody BudgetItem budgetItem) {
        BudgetItem createdBudgetItem = budgetRepository.save(budgetItem);
        return new ResponseEntity<>(createdBudgetItem, HttpStatus.CREATED);
    }

    // Update an existing budget item
    @PutMapping("/{id}")
    public ResponseEntity<BudgetItem> updateBudgetItem(@PathVariable String id, @RequestBody BudgetItem budgetItem) {
        if (!budgetRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        budgetItem.setId(id);
        BudgetItem updatedBudgetItem = budgetRepository.save(budgetItem);
        return new ResponseEntity<>(updatedBudgetItem, HttpStatus.OK);
    }

    // Delete a budget item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudgetItem(@PathVariable String id) {
        if (!budgetRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        budgetRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
