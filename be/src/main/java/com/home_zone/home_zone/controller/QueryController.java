package com.home_zone.home_zone.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.home_zone.home_zone.service.MongoQueryService;

@RestController
@RequestMapping("/nlp-query")
@CrossOrigin(origins = "*", maxAge = 3600)
public class QueryController {

    @Autowired
    private MongoQueryService mongoQueryService;

    @PostMapping
    public List<?> processSentence(@RequestBody Map<String, String> input) {
        return mongoQueryService.handleSentence(input.get("sentence"));
    }
}

