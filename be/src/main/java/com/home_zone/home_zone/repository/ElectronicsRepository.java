package com.home_zone.home_zone.repository;

import org.springframework.stereotype.Repository;

import com.home_zone.home_zone.model.Electronics;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface ElectronicsRepository extends MongoRepository<Electronics, String> {
    Electronics findByName(String name);
}
