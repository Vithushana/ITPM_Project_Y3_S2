package com.home_zone.home_zone.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.home_zone.home_zone.model.Feedback;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {
}
