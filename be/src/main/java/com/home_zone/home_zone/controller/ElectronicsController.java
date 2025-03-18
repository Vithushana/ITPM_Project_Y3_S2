package com.home_zone.home_zone.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.home_zone.home_zone.model.Electronics;
import com.home_zone.home_zone.service.ElectronicsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/electronics")
public class ElectronicsController {
    @Autowired
    private ElectronicsService electronicsService;

    @GetMapping
    public List<Electronics> getAllElectronics() {
        return electronicsService.getAllElectronics();
    }

    @GetMapping("/{id}")
    public Optional<Electronics> getElectronicsById(@PathVariable String id) {
        return electronicsService.getElectronicsById(id);
    }

    @PostMapping
    public Electronics addElectronics(@RequestBody Electronics electronics) {
        return electronicsService.addElectronics(electronics);
    }

    @PutMapping("/{id}")
    public Electronics updateElectronics(@PathVariable String id, @RequestBody Electronics electronics) {
        return electronicsService.updateElectronics(id, electronics);
    }

    @DeleteMapping("/{id}")
    public void deleteElectronics(@PathVariable String id) {
        electronicsService.deleteElectronics(id);
    }
    
    

    
}
