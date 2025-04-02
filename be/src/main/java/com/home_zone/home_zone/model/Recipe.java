package com.home_zone.home_zone.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipes")
public class Recipe {
    @Id
    private String id;
    private String image;
    private String name;
    private String category;
    private String steps;

   public String getId() {
    return id;
   }
   public void setId(String id) {
    this.id = id;
   }

   public String getImage() {
    return image;
   }

   public void setImage(String image) {
    this.image = image;
   }

   public String getName() {
    return name;
   }

   public void setName(String name) {
    this.name = name;
   }

   public String getCategory() {
    return category;
   }

   public void setCategory(String category) {
    this.category = category;
   }

   public String getSteps() {
    return steps;
   }
   public void setSteps(String steps) {
    this.steps = steps;
   }

}
