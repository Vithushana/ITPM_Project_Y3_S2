package com.home_zone.home_zone.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "faqs")
public class Faq {
    @Id
    private String id;
    private String question;
    private String answer;

    // Constructors
    public Faq() {}

    public Faq(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
