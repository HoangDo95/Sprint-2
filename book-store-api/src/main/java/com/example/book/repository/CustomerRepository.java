package com.example.book.repository;

import com.example.book.dTo.HistoryDto;
import com.example.book.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Repository
@Transactional
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query(value = "select customer.*, app_user.* from customer join app_user on customer.app_user_id = app_user.id where app_user.username = :username", nativeQuery = true)
    Customer findByUsername(@Param("username") String username);

    @Query(value = "select customer.* from customer join app_user au on au.id = customer.app_user_id where au.username =:username", nativeQuery = true)
    Customer findHistoryByUser(@Param("username") String username);

    @Query(value = "select * from customer where email =:email limit 1", nativeQuery = true)
    Customer findCustomerByEmail(@Param("email") String email);

    @Modifying
    @Query(value = "insert into customer (`name`, `address`, `birth_day`, `gender`, `phone`, `status`,`email`, `app_user_id`) values (:name, :address, :birthDay, :gender, :phone, 0, :email, :app_user_id)", nativeQuery = true)
    void save(@Param("name") String name, @Param("address") String address, @Param("birthDay") LocalDate birthDay, @Param("gender") int gender, @Param("phone") int phone,@Param("email") String email, @Param("app_user_id") int app_user_id);
}
