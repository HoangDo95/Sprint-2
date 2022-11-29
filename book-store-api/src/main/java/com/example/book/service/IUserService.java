package com.example.book.service;

import com.example.book.dTo.CartDetailDto;
import com.example.book.entity.AppUser;
import com.example.book.entity.Cart;
import com.example.book.entity.CartDetail;
import freemarker.template.TemplateException;

import javax.mail.MessagingException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

public interface IUserService {

    AppUser findByName(String name);

    String existsByUserName(String username) throws MessagingException, UnsupportedEncodingException;

    void saveNewPassword(String password, String name);

    List<AppUser> findAll();

    void save(AppUser appUser);

    void saveGmail(AppUser appUser);

    Integer findMaxId();

    Optional<AppUser> findById(Integer id);

    void paypalDone(Cart cart, List<CartDetail> cartDetails) throws MessagingException, UnsupportedEncodingException, IOException, TemplateException;
}
