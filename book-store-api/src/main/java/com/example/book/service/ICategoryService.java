package com.example.book.service;

import com.example.book.entity.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> findAllCategory();

    Category FindById(int id);
}
