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

import com.home_zone.home_zone.model.Medicine;
import com.home_zone.home_zone.service.MedicineService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/medicine")
public class MedicineController {
    @Autowired
    private MedicineService medicineService;
    
    // Get all medicines
    @GetMapping
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    // Get medicine by ID
    @GetMapping("/{id}")
    public Optional<Medicine> getMedicineById(@PathVariable String id) {
        return medicineService.getMedicineById(id);
    }

    // Add new medicine
    @PostMapping
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return medicineService.addMedicine(medicine);
    }

    // Update medicine
    @PutMapping("/{id}")
    public Medicine updateMedicine(@PathVariable String id, @RequestBody Medicine medicine) {
        return medicineService.updateMedicine(id, medicine);
    }

    // Delete medicine
    @DeleteMapping("/{id}")
    public void deleteMedicine(@PathVariable String id) {
        medicineService.deleteMedicine(id);
    }
}
