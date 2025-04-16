package com.home_zone.home_zone.repository;

import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public interface ElectronicsCustomRepository {
    List<?> findByCustomQuery(Query query);
}
