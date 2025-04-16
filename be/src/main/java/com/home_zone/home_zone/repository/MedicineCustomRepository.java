package com.home_zone.home_zone.repository;

import java.util.List;

import org.springframework.data.mongodb.core.query.Query;

public interface MedicineCustomRepository {
    
    List<?> findByCustomQuery(Query query);

}
