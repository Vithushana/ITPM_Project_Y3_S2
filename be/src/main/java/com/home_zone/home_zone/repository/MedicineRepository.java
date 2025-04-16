package com.home_zone.home_zone.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.home_zone.home_zone.model.Medicine;

@Repository
public interface MedicineRepository
    extends MongoRepository<Medicine, String>,
        MedicineCustomRepository {

    Medicine findByName(String name);
    
}
