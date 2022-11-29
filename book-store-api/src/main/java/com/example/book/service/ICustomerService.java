package com.example.book.service;

import com.example.book.entity.Customer;

import java.util.List;

public interface ICustomerService {
    Customer findByUsername(String username);

    List<Customer> findAll();

    Customer findHistoryByUsername(String username);

    void create(Customer customer);

    void createGmail(Customer customer);
}
