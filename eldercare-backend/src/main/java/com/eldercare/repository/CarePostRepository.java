package com.eldercare.repository;

import com.eldercare.model.CarePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarePostRepository extends JpaRepository<CarePost, Integer> {
    List<CarePost> findByClientId(Integer clientId);
    List<CarePost> findByActiveTrue();

    @Query(value = """
        SELECT * FROM care_posts
        WHERE active = 1
          AND (:keyword IS NULL 
               OR LOWER(title) LIKE LOWER(CONCAT('%', :keyword, '%')))
        """, nativeQuery = true)
    List<CarePost> searchByTitle(@Param("keyword") String keyword);
}
