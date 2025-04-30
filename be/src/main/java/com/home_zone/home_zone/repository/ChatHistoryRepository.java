package com.home_zone.home_zone.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.home_zone.home_zone.model.ChatHistory;

public interface ChatHistoryRepository extends MongoRepository<ChatHistory, String> {
}
