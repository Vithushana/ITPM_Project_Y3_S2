package com.home_zone.home_zone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.home_zone.home_zone.model.Recipe;
import com.home_zone.home_zone.repository.RecipeRepository;

@Service
public class RecipeService {
    private RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(String id) {
        return recipeRepository.findById(id);
    }

    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(String id) {
        recipeRepository.deleteById(id);
    }
    
}
