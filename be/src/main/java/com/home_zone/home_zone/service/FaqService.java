package com.home_zone.home_zone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.home_zone.home_zone.model.Faq;
import com.home_zone.home_zone.repository.FaqRepository;

@Service
public class FaqService {

    @Autowired
    private FaqRepository faqRepository;

    public List<Faq> getAllFaqs() {
        return faqRepository.findAll();
    }

    public Faq addFaq(Faq faq) {
        return faqRepository.save(faq);
    }

    public Optional<Faq> getFaqById(String id) {
        return faqRepository.findById(id);
    }

    public Faq updateFaq(String id, Faq updatedFaq) {
        Optional<Faq> faqOptional = faqRepository.findById(id);
        if (faqOptional.isPresent()) {
            Faq faq = faqOptional.get();
            faq.setQuestion(updatedFaq.getQuestion());
            faq.setAnswer(updatedFaq.getAnswer());
            return faqRepository.save(faq);
        }
        return null;
    }

    public void deleteFaq(String id) {
        faqRepository.deleteById(id);
    }
}

