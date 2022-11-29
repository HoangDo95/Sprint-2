package com.example.book.service;

import com.example.book.entity.Cart;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartService {
    Cart save(Cart cart);

    List<Cart> findByCustomerId( int id);

    Cart findCart(int id);
}
