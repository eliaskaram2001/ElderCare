package com.eldercare.service;

import com.eldercare.model.CarePost;

import java.util.List;
import java.util.Optional;

public interface CarePostService {
    List<CarePost> SearchByTitle(String title);

    Optional<CarePost> getDetailById(Integer id);

    Boolean softDeleted(Integer id);
}
