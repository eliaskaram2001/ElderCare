package com.eldercare.service.ServiceImpl;

import com.eldercare.model.CarePost;
import com.eldercare.repository.CarePostRepository;
import com.eldercare.service.CarePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarePostImplication implements CarePostService {
    @Autowired
    private CarePostRepository carePostRepository;

    @Override
    public List<CarePost> SearchByTitle(String title) {
        if (title != null && title.isBlank()) {
            title = null;
        }
        return carePostRepository.searchByTitle(title);
    }

    @Override
    public Optional<CarePost> getDetailById(Integer id) {
        return carePostRepository.findById(id);
    }

    @Override
    public Boolean softDeleted(Integer id) {
        return carePostRepository.findById(id).map(post -> {
            post.setActive(false);     // softDeleted
            carePostRepository.save(post);
            return true;
        }).orElse(false);
    }
}
