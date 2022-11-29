package com.example.book.dTo;

import java.util.List;

public class CartDto {
    private String dateCreate;
    private Integer id;
    private List<CartDetailDto> cartDetailList;

    public CartDto() {
    }

    public CartDto(String dateCreate, Integer id) {
        this.dateCreate = dateCreate;
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDateCreate() {
        return dateCreate;
    }

    public void setDateCreate(String dateCreate) {
        this.dateCreate = dateCreate;
    }

    public List<CartDetailDto> getCartDetailList() {
        return cartDetailList;
    }

    public void setCartDetailList(List<CartDetailDto> cartDetailList) {
        this.cartDetailList = cartDetailList;
    }
}
