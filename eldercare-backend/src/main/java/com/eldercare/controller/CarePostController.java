package com.eldercare.controller;

import com.eldercare.dto.CreatePostRequest;
import com.eldercare.model.CarePost;
import com.eldercare.repository.CarePostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        return carePostRepository.findByActiveTrue();
    }


    @GetMapping("/my/{clientId}")
    public List<CarePost> getMyPosts(@PathVariable Long clientId) {
        return carePostRepository.findByClientId(clientId)
                .stream()
                .filter(CarePost::isActive)
                .toList();
    }


    @PutMapping("/deactivate/{id}")
    public ResponseEntity<?> deactivatePost(@PathVariable Long id) {
        return carePostRepository.findById(id).map(post -> {
            post.setActive(false);
            carePostRepository.save(post);
            return ResponseEntity.ok(post);
        }).orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/{id}")
    public ResponseEntity<CarePost> getPostById(@PathVariable Long id) {
        return carePostRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}