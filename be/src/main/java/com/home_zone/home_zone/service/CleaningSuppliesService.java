package com.home_zone.home_zone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.home_zone.home_zone.model.CleaningSupplies;
import com.home_zone.home_zone.repository.CleaningSuppliesRepository;

@Service
public class CleaningSuppliesService {

    @Autowired
    private CleaningSuppliesRepository repository;

    public List<CleaningSupplies> getAll() {
        return repository.findAll();
    }

    public CleaningSupplies addItem(CleaningSupplies item) {
        return repository.save(item);
    }

    public CleaningSupplies updateItem(String id, CleaningSupplies item) {
        item.setId(id);
        return repository.save(item);
    }

    public void deleteItem(String id) {
        repository.deleteById(id);
    }
}