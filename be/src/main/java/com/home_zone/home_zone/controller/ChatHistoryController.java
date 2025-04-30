package com.home_zone.home_zone.controller;

import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.home_zone.home_zone.model.ChatHistory;
import com.home_zone.home_zone.repository.ChatHistoryRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/chat-history")
public class ChatHistoryController {

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    @GetMapping
    public List<ChatHistory> getAllElectronics() {
        return chatHistoryRepository.findAll();
    }

    @PutMapping("/{id}")
    public void makeFavorite(@PathVariable String id, @RequestParam("favorite") Boolean favorite ) {
        ChatHistory history = chatHistoryRepository.findById(id).orElse(null);
        if (history == null) {
            throw new RuntimeErrorException(null, "Cant find history");
        } else {
            history.setFavorite(favorite);
            chatHistoryRepository.save(history);
        }
    }
    
}
