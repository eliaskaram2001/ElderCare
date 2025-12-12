package com.eldercare.controller;

import com.eldercare.dto.CreatePostRequest;
import com.eldercare.model.CarePost;
import com.eldercare.model.User;
import com.eldercare.repository.CarePostRepository;
import com.eldercare.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public CarePost createPost(@RequestBody CreatePostRequest req) {
        CarePost post = new CarePost();
        post.setClientId(req.clientId);
        post.setTitle(req.title);
        post.setDescription(req.description);
        post.setLocation(req.location);
        post.setTags(req.tags);
        post.setPrice(req.price);

        return carePostRepository.save(post);
    }


    @GetMapping
    public List<CarePost> getAllPosts() {
        List<CarePost> posts = carePostRepository.findByActiveTrue();

        posts.forEach(post -> {
            User user = userRepository.findById(post.getClientId()).orElse(null);
            if (user != null) {
                post.setClientName(user.getFullName());  // <-- KEY LINE
            }
        });

        return posts;
    }

    @GetMapping("/my/{clientId}")
    public List<CarePost> getMyPosts(@PathVariable Long clientId) {
        List<CarePost> posts = carePostRepository.findByClientId(clientId)
                .stream()
                .filter(CarePost::isActive)
                .toList();

        posts.forEach(post -> {
            User user = userRepository.findById(post.getClientId()).orElse(null);
            if (user != null) {
                post.setClientName(user.getFullName());
            }
        });

        return posts;
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
                .map(post -> {
                    User user = userRepository.findById(post.getClientId()).orElse(null);
                    if (user != null) post.setClientName(user.getFullName());
                    return ResponseEntity.ok(post);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
