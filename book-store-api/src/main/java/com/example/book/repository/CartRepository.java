package com.example.book.repository;

import com.example.book.dTo.CartDto;
import com.example.book.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Query(value = "select cart.* from cart join customer c on c.id = cart.customer_id where c.id =:id and cart.status = false ", nativeQuery = true)
    List<Cart> findByCustomerId(@Param("id") int id);

    @Query(value = "select cart.* from cart join customer c on c.id = cart.customer_id where c.id =:id and cart.status = true", nativeQuery = true)
    Cart findCart(@Param("id") int id);
}
