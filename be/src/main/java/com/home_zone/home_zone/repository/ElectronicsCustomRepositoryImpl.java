package com.home_zone.home_zone.repository;

import com.home_zone.home_zone.model.Electronics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ElectronicsCustomRepositoryImpl implements ElectronicsCustomRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Electronics> findByCustomQuery(Query query) {
        return mongoTemplate.find(query, Electronics.class);
    }
}

