package com.home_zone.home_zone.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.home_zone.home_zone.model.Faq;

public interface FaqRepository extends MongoRepository<Faq, String> {
}
