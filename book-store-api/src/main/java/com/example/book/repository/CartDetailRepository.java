package com.example.book.repository;

import com.example.book.dTo.CartDetailDto;
import com.example.book.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
    @Query(value = "select cart_detail.*,b.* from cart_detail join cart c on c.id = cart_detail.cart_id " +
            "join book b on b.id = cart_detail.book_id where cart_id=:id", nativeQuery = true)
    List<CartDetail> findCartDetail(@Param("id") Integer id);

    @Modifying
    @Query(value = "delete from cart_detail where cart_id=:id", nativeQuery = true)
    void deleteCartDetailByCartId(@Param("id") int id);
}
