package com.home_zone.home_zone.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.home_zone.home_zone.model.CleaningSupplies;

@Repository
public interface CleaningSuppliesRepository extends MongoRepository<CleaningSupplies, String> {
}
