package com.home_zone.home_zone.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.home_zone.home_zone.model.Faq;
import com.home_zone.home_zone.service.FaqService;

@RestController
@RequestMapping("/api/faqs")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FaqController {

    @Autowired
    private FaqService faqService;

    @GetMapping
    public List<Faq> getAllFaqs() {
        return faqService.getAllFaqs();
    }

    @PostMapping
    public Faq addFaq(@RequestBody Faq faq) {
        return faqService.addFaq(faq);
    }

    @GetMapping("/{id}")
    public Optional<Faq> getFaqById(@PathVariable String id) {
        return faqService.getFaqById(id);
    }

    @PutMapping("/{id}")
    public Faq updateFaq(@PathVariable String id, @RequestBody Faq faq) {
        return faqService.updateFaq(id, faq);
    }

    @DeleteMapping("/{id}")
    public void deleteFaq(@PathVariable String id) {
        faqService.deleteFaq(id);
    }
}
