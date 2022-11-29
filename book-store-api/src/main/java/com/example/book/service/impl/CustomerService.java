package com.example.book.service.impl;

import com.example.book.entity.AppRole;
import com.example.book.entity.AppUser;
import com.example.book.entity.Customer;
import com.example.book.entity.UserRole;
import com.example.book.repository.CustomerRepository;
import com.example.book.repository.UserRepository;
import com.example.book.repository.UserRoleRepository;
import com.example.book.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Override
    public Customer findByUsername(String username) {
        return customerRepository.findByUsername(username);
    }

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer findHistoryByUsername(String username) {
        return customerRepository.findHistoryByUser(username);
    }

    @Override
    public void create(Customer customer) {
        List<AppUser> users = userRepository.findAll();
        UserRole userRole = new UserRole();
        AppRole roles = new AppRole();
        roles.setId(2);
        userRole.setStatus(false);
        userRole.setAppUser(users.get(users.toArray().length - 1));
        userRole.setAppRole(roles);
        userRoleRepository.save(userRole);

        customer.setAppUser(customer.getAppUser());
        customerRepository.save(customer.getName(), customer.getAddress(), customer.getBirthDay(), customer.getGender(), customer.getPhone(),customer.getEmail(), users.toArray().length);
    }

    @Override
    public void createGmail(Customer customer) {
        if (customerRepository.findCustomerByEmail(customer.getEmail()) == null) {
            AppUser appUser = userRepository.findById(userRepository.findMaxId()).get();
            customer.setAppUser(appUser);
            customerRepository.save(customer);
        }
    }
}
