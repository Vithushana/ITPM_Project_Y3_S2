package com.home_zone.home_zone.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.home_zone.home_zone.model.ShoppingItem;

public interface ShoppingItemRepository extends MongoRepository<ShoppingItem, String> {
    List<ShoppingItem> findByCategory(String category);
}
