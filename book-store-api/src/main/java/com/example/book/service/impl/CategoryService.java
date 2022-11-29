package com.example.book.service.impl;

import com.example.book.entity.Category;
import com.example.book.repository.CategoryRepository;
import com.example.book.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public List<Category> findAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public Category FindById(int id) {
        return categoryRepository.findById(id).get();
    }
}
