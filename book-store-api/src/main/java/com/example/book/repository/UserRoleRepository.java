package com.example.book.repository;

import com.example.book.entity.AppUser;
import com.example.book.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface UserRoleRepository extends JpaRepository<UserRole,Integer> {
    List<UserRole> findAllByAppUser(AppUser appUser);
    @Modifying
    @Query(value = "insert into user_role (`status`, `role_id`,`user_id`) values (0, 2, :userId)", nativeQuery = true)
    void save(@Param("userId") Integer userId);
}
