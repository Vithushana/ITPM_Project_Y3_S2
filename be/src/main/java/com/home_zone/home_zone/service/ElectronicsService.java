package com.home_zone.home_zone.service;

import com.home_zone.home_zone.model.Electronics;
import com.home_zone.home_zone.repository.ElectronicsRepository;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ElectronicsService {

    @Autowired
    private ElectronicsRepository repository;

    public List<Electronics> getAllElectronics() {
        return repository.findAll();
    }

    public Optional<Electronics> getElectronicsById(String id) {
        return repository.findById(id);
    }

    public Electronics addElectronics(Electronics electronics) {
        return repository.save(electronics);
    }

    public Electronics updateElectronics(String id, Electronics electronics) {
        return repository.findById(id).map(existingItem -> {
            // existingItem.setName(electronics.getName());
            existingItem.setQuantity(electronics.getQuantity());
            existingItem.setCategory(electronics.getCategory());
            existingItem.setPrice(electronics.getPrice());
            existingItem.setExpirationDate(electronics.getExpirationDate());
            existingItem.setImageUrl(electronics.getImageUrl());
            return repository.save(existingItem);
        }).orElseThrow(() -> new RuntimeException("Electronics item not found with id: " + id));
    }

    public void deleteElectronics(String id) {
        repository.deleteById(id);
    }
    
    
}
