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
        if (repository.existsById(id)) {
            electronics.setId(id);
            return repository.save(electronics);
        }
        return null;
    }

    public void deleteElectronics(String id) {
        repository.deleteById(id);
    }
    
    
}
