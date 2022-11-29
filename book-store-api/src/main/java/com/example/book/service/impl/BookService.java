package com.example.book.service.impl;

import com.example.book.dTo.IBookDto;
import com.example.book.entity.Book;
import com.example.book.repository.BookRepository;
import com.example.book.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService implements IBookService {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Page<Book> FindAll(Integer idCategory, String name, Pageable pageable) {
        return bookRepository.findAll(idCategory, "%" + name + "%", pageable);
    }

    @Override
    public Optional<Book> findById(int id) {
        return bookRepository.findById(id);
    }

    @Override
    public void create(Book book) {
        String code = bookRepository.getMaxCode();
        int temp = Integer.parseInt(code.substring(2));
        temp += 1;
        code = "MS" + String.format("%03d", temp);
        book.setCode(code);
        bookRepository.save(book);
    }

    @Override
    public void update(Book book) {
        bookRepository.save(book);
    }

    @Override
    public void delete(int id) {
        bookRepository.deleteBook(id);
    }

    @Override
    public List<IBookDto> findTopByBook(String startDate, String endDate) {
        List<IBookDto> iBookDtos = bookRepository.findTopByBook(startDate, endDate);
        return bookRepository.findTopByBook(startDate, endDate);
    }

}
