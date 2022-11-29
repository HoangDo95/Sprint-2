package com.example.book.service.impl;

import com.example.book.entity.CartDetail;
import com.example.book.repository.CartDetailRepository;
import com.example.book.service.ICartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailService implements ICartDetailService {
    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Override
    public CartDetail save(CartDetail cartDetail) {
        return cartDetailRepository.save(cartDetail);
    }

    @Override
    public List<CartDetail> findCartDetail(Integer id) {
        return cartDetailRepository.findCartDetail(id);
    }

    @Override
    public void deleteCartDetailByCartId(int id) {
        cartDetailRepository.deleteCartDetailByCartId(id);
    }
}
