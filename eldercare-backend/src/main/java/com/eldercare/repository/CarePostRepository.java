package com.eldercare.repository;

import com.eldercare.model.CarePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarePostRepository extends JpaRepository<CarePost, Long> {
    List<CarePost> findByClientId(Long clientId);
    List<CarePost> findByActiveTrue();
}
