package com.example.application.service;

import com.example.application.model.User;
import com.example.application.repository.UserRepository;
import com.example.application.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service class for managing user operations.
 * 
 * @author Example Developer
 * @version 1.0
 */
@Service
public class java_example {

    private final UserRepository userRepository;
    private static final int MAX_USERNAME_LENGTH = 50;
    
    @Autowired
    public java_example(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    /**
     * Retrieves all active users.
     *
     * @return List of active users
     */
    public List<User> getAllActiveUsers() {
        return userRepository.findAll().stream()
                .filter(User::isActive)
                .collect(Collectors.toList());
    }
    
    /**
     * Finds a user by their ID.
     *
     * @param userId The ID of the user to find
     * @return The found user
     * @throws ResourceNotFoundException if user is not found
     */
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }
    
    /**
     * Creates a new user.
     *
     * @param user The user to create
     * @return The created user with ID
     * @throws IllegalArgumentException if user data is invalid
     */
    @Transactional
    public User createUser(User user) {
        validateUser(user);
        
        user.setCreatedAt(LocalDateTime.now());
        user.setActive(true);
        
        return userRepository.save(user);
    }
    
    /**
     * Updates an existing user.
     *
     * @param userId The ID of the user to update
     * @param userDetails The updated user details
     * @return The updated user
     * @throws ResourceNotFoundException if user is not found
     */
    @Transactional
    public User updateUser(Long userId, User userDetails) {
        User user = getUserById(userId);
        
        // Update fields
        if (userDetails.getUsername() != null) {
            if (userDetails.getUsername().length() > MAX_USERNAME_LENGTH) {
                throw new IllegalArgumentException("Username too long");
            }
            user.setUsername(userDetails.getUsername());
        }
        
        if (userDetails.getEmail() != null) {
            user.setEmail(userDetails.getEmail());
        }
        
        user.setUpdatedAt(LocalDateTime.now());
        
        return userRepository.save(user);
    }
    
    /**
     * Deactivates a user instead of deleting them.
     *
     * @param userId The ID of the user to deactivate
     * @return true if deactivation was successful
     */
    @Transactional
    public boolean deactivateUser(Long userId) {
        User user = getUserById(userId);
        user.setActive(false);
        user.setDeactivatedAt(LocalDateTime.now());
        userRepository.save(user);
        return true;
    }
    
    /**
     * Permanently deletes a user.
     * This operation should be used with caution.
     *
     * @param userId The ID of the user to delete
     */
    @Transactional
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        userRepository.deleteById(userId);
    }
    
    /**
     * Validates user data before saving.
     *
     * @param user The user to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validateUser(User user) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        
        if (user.getUsername().length() > MAX_USERNAME_LENGTH) {
            throw new IllegalArgumentException("Username too long");
        }
        
        if (user.getEmail() == null || !user.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        
        // Check if username is already taken
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Username already taken");
        }
    }
    
    /**
     * Searches for users matching the given criteria.
     *
     * @param searchTerm The search term to match against username or email
     * @return List of matching users
     */
    public List<User> searchUsers(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return List.of();
        }
        
        return userRepository.findByUsernameContainingOrEmailContaining(
                searchTerm.toLowerCase(),
                searchTerm.toLowerCase()
        );
    }
}