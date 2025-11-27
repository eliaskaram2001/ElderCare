package com.eldercare.controller;

import com.eldercare.dto.CreatePostRequest;
import com.eldercare.model.CarePost;
import com.eldercare.repository.CarePostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin("*")
public class CarePostController {

    @Autowired
    private CarePostRepository carePostRepository;

    @PostMapping
    public CarePost createPost(@RequestBody CreatePostRequest req) {
        CarePost post = new CarePost();

        post.setClientId(req.clientId);
        post.setTitle(req.title);
        post.setDescription(req.description);
        post.setLocation(req.location);

        return carePostRepository.save(post);
    }

    @GetMapping
    public List<CarePost> getAllPosts() {
        return carePostRepository.findAll();
    }
}
