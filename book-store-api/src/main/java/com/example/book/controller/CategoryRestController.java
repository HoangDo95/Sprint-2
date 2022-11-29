package com.example.book.controller;

import com.example.book.entity.Category;
import com.example.book.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/public/category")
public class CategoryRestController {
    @Autowired
    private ICategoryService iCategoryService;
    @GetMapping("list")
    public ResponseEntity<List<Category>> getAll(){
        return new ResponseEntity<>(iCategoryService.findAllCategory(), HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<Category> findById(@PathVariable("id") int id){
        return new ResponseEntity<>(iCategoryService.FindById(id), HttpStatus.OK);
    }
}
