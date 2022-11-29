package com.example.book.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String code;
    private String name;
    private double price;
    private double discount;
    private String author;
    @Column(columnDefinition = "longtext")
    private String description;
    private String dimension;
    private String translator;
    private String publishingHome;
    private String img;
    private int quantity;
    private int totalPage;
    private LocalDate releaseDate;

    @Column(columnDefinition = "BIT(1) DEFAULT 0")
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    private Category category;

    @OneToMany(mappedBy = "book")
    @JsonIgnore
    private Set<CartDetail> cartDetails;


    public Book() {
    }

    public Book(Integer id, String code, String name, double price, double discount, String author,
                String description, String dimension, String translator, String publishingHome, String img,
                int quantity, int totalPage, LocalDate releaseDate, Boolean status, Category category,
                Set<CartDetail> cartDetails) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.price = price;
        this.discount = discount;
        this.author = author;
        this.description = description;
        this.dimension = dimension;
        this.translator = translator;
        this.publishingHome = publishingHome;
        this.img = img;
        this.quantity = quantity;
        this.totalPage = totalPage;
        this.releaseDate = releaseDate;
        this.status = status;
        this.category = category;
        this.cartDetails = cartDetails;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDimension() {
        return dimension;
    }

    public void setDimension(String dimension) {
        this.dimension = dimension;
    }

    public String getTranslator() {
        return translator;
    }

    public void setTranslator(String translator) {
        this.translator = translator;
    }

    public String getPublishingHome() {
        return publishingHome;
    }

    public void setPublishingHome(String publishingHome) {
        this.publishingHome = publishingHome;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

   public Set<CartDetail> getCartDetails() {
        return cartDetails;
    }

    public void setCartDetails(Set<CartDetail> cartDetails) {
        this.cartDetails = cartDetails;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
