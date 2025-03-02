package com.home_zone.home_zone.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.home_zone.home_zone.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByName(String name);
    User findByEmail(String email);
    User findByResetToken(String resetToken);
}
