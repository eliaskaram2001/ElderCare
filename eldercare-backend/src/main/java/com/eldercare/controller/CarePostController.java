package com.eldercare.controller;

import com.eldercare.dto.CreatePostRequest;
import com.eldercare.model.CarePost;
import com.eldercare.repository.CarePostRepository;
import com.eldercare.service.CarePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin("*")
public class CarePostController {

    @Autowired
    private CarePostRepository carePostRepository;
    @Autowired
    private CarePostService carePostService;

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

    @GetMapping("/search")
    public List<CarePost> getPostsByTitle(@RequestParam String title) {
        return carePostService.SearchByTitle(title);
    }

    @GetMapping("/{id}")
    public Optional<CarePost> getPostById(@PathVariable Integer id) {
        return carePostService.getDetailById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePostById(@PathVariable Integer id) {
        boolean success = carePostService.softDeleted(id);
        if (success) {
            return ResponseEntity.ok("Post deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
