package com.example.book.service.impl;

import com.example.book.entity.UserRole;
import com.example.book.repository.UserRoleRepository;
import com.example.book.service.IUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRoleService implements IUserRoleService {
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Override
    public void save(UserRole userRole) {
        userRoleRepository.save(userRole.getAppUser().getId());
    }
}
