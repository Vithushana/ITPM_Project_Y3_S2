package com.home_zone.home_zone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.home_zone.home_zone.model.CleaningSupplies;
import com.home_zone.home_zone.service.CleaningSuppliesService;

@RestController
@RequestMapping("/api/cleaning-supplies")
@CrossOrigin(origins = "*")
public class CleaningSuppliesController {

    @Autowired
    private CleaningSuppliesService service;

    @GetMapping
    public List<CleaningSupplies> getAll() {
        return service.getAll();
    }

    @PostMapping
    public CleaningSupplies add(@RequestBody CleaningSupplies item) {
        return service.addItem(item);
    }

    @PutMapping("/{id}")
    public CleaningSupplies update(@PathVariable String id, @RequestBody CleaningSupplies item) {
        return service.updateItem(id, item);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteItem(id);
    }
}
