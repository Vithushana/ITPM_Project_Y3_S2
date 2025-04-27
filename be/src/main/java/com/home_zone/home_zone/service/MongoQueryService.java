package com.home_zone.home_zone.service;

import com.home_zone.home_zone.repository.ElectronicsRepository;
import com.home_zone.home_zone.repository.MedicineRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MongoQueryService {

    @Autowired
    private ElectronicsRepository electronicsRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<?> handleSentence(String sentence) {
        String query = fetchQueryFromFlask(sentence);

        System.out.println("Generated Query: " + query);

        if (query.startsWith("Electronics")) {
            return handleElectronicsQuery(query);
        } else if (query.startsWith("Medicine")) {
            return handleMedicineQuery(query);
        } else {
            throw new RuntimeException("Unknown entity in query: " + query);
        }
    }

    private String fetchQueryFromFlask(String sentence) {
        String url = "http://localhost:8082/generate-query";

        Map<String, String> body = new HashMap<>();
        body.put("sentence", sentence);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body);
        MongoQueryResponse response = restTemplate.postForObject(url, request, MongoQueryResponse.class);

        if (response == null || response.getQuery() == null) {
            throw new RuntimeException("Invalid query from model");
        }

        return response.getQuery();
    }

    private List<?> handleElectronicsQuery(String query) {
        Query mongoQuery = parseToQuery(query);
        return electronicsRepository.findByCustomQuery(mongoQuery);
    }

    private List<?> handleMedicineQuery(String query) {
        Query mongoQuery = parseToQuery(query);
        return medicineRepository.findByCustomQuery(mongoQuery);
    }

    private Query parseToQuery(String jsQuery) {
        String inner = extractInnerQuery(jsQuery);
        inner = inner.replace("True", "true").replace("False", "false");
        Document queryDoc = Document.parse(inner);
        return convertDocumentToMongoQuery(queryDoc);
    }

    private String extractInnerQuery(String jsQuery) {
        return jsQuery.replaceAll(".*\\.find\\((\\{.*})\\)", "$1");
    }

    private Query convertDocumentToMongoQuery(Document queryDoc) {
        Query query = new Query();

        for (String key : queryDoc.keySet()) {
            Object value = queryDoc.get(key);
            if (value instanceof Document) {
                Document valueDoc = (Document) value;
                for (String operator : valueDoc.keySet()) {
                    Object operand = valueDoc.get(operator);
                    addOperatorCriteria(query, key, operator, operand, valueDoc);
                }
            } else {
                query.addCriteria(Criteria.where(key).is(value));
            }
        }

        return query;
    }

    private void addOperatorCriteria(Query query, String key, String operator, Object operand, Document valueDoc) {
        if ("$lt".equals(operator)) {
            query.addCriteria(Criteria.where(key).lt(operand));
        } else if ("$gt".equals(operator)) {
            query.addCriteria(Criteria.where(key).gt(operand));
        } else if ("$eq".equals(operator)) {
            query.addCriteria(Criteria.where(key).is(operand));
        } else if ("$regex".equals(operator)) {
            String options = (String) valueDoc.getOrDefault("$options", "");
            boolean ignoreCase = options.contains("i");
            query.addCriteria(Criteria.where(key).regex((String) operand, ignoreCase ? "i" : ""));
        } else {
            throw new UnsupportedOperationException("Unsupported operator: " + operator);
        }
    }

    public static class MongoQueryResponse {
        private String query;

        public String getQuery() {
            return query;
        }

        public void setQuery(String query) {
            this.query = query;
        }
    }
}
