package com.example.book.repository;

import com.example.book.dTo.IBookDto;
import com.example.book.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
@Transactional
public interface BookRepository extends JpaRepository<Book, Integer> {

    @Query(value = "select * from book where status = 0 and (category_id = :idCategory or name like :name)order by id desc ", nativeQuery = true)
    Page<Book> findAll(@Param("idCategory") Integer idCategory, @Param("name") String name, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "insert into `book` (author,code,description,dimension," +
            "discount,img,`name`,price,publishing_home,quantity,release_date,total_page,translator,category_id) values" +
            " (:author,:code,:description,:dimension,:discount,:img,:name,:price,:publishingHome,:quantity,:releaseDate," +
            ":totalPage,:translator,:idCategory)",
            nativeQuery = true)
    void create(@Param("author") String author,
                @Param("code") String code,
                @Param("description") String description,
                @Param("dimension") String dimension,
                @Param("discount") double discount,
                @Param("img") String img,
                @Param("name") String name,
                @Param("price") double price,
                @Param("publishingHome") String publishingHome,
                @Param("quantity") int quantity,
                @Param("releaseDate") LocalDate releaseDate,
                @Param("totalPage") int totalPage,
                @Param("translator") String translator,
                @Param("idCategory") Integer idCategory
    );

    @Query(value = "select Max(code) from book", nativeQuery = true)
    String getMaxCode();

    @Transactional
    @Modifying
    @Query(value = "update book set status = 1 where id =:id", nativeQuery = true)
    void deleteBook(@Param("id") Integer id);


    @Query(value = " select b.name, sum(cd.quantity) as amount " +
            " from book b " +
            " join cart_detail cd on b.id = cd.book_id " +
            " join cart c on cd.cart_id = c.id " +
            " where c.status = false " +
            " and c.date_create between :startDate and :endDate " +
            " group by cd.book_id " +
            " order by amount desc " +
            " limit 10 ", nativeQuery = true)
    List<IBookDto> findTopByBook(@Param("startDate") String startDate, @Param("endDate") String endDate);
}
