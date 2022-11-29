package com.example.book.service.impl;

import com.example.book.entity.Cart;
import com.example.book.repository.CartRepository;
import com.example.book.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService implements ICartService {
    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public List<Cart> findByCustomerId(int id) {
        return cartRepository.findByCustomerId(id);
    }

    @Override
    public Cart findCart(int id) {
        return cartRepository.findCart(id);
    }

}
