package com.home_zone.home_zone.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.home_zone.home_zone.model.InventoryItem;

@Repository
public interface InventoryRepository extends MongoRepository<InventoryItem, String> {
    InventoryItem  findByName(String name);
}
