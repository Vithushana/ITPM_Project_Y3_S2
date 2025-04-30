package com.home_zone.home_zone.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chatHistory")
public class ChatHistory {
    @Id
    private String id;

    private String sentence;
    private String query;
    private Object response;
    private boolean favorite;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getSentence() {
        return sentence;
    }
    public void setSentence(String sentence) {
        this.sentence = sentence;
    }
    public String getQuery() {
        return query;
    }
    public void setQuery(String query) {
        this.query = query;
    }
    public Object getResponse() {
        return response;
    }
    public void setResponse(Object response) {
        this.response = response;
    }

    public boolean isFavorite() {
        return favorite;
    }
    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }
    @Override
    public String toString() {
        return "ChatHistory [id=" + id + ", sentence=" + sentence + ", query=" + query + ", response=" + response
                + ", favorite=" + favorite + "]";
    }
    
}
