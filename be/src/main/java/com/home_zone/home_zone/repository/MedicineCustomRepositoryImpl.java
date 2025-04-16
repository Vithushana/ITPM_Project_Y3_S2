package com.home_zone.home_zone.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.home_zone.home_zone.model.Medicine;

@Repository
public class MedicineCustomRepositoryImpl implements MedicineCustomRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Medicine> findByCustomQuery(Query query) {
        return mongoTemplate.find(query, Medicine.class);
    }
}
