package com.soj.booksharing.data;

import com.soj.booksharing.entity.User;
import com.soj.booksharing.repository.UserRepository;

import java.util.Objects;

public class UserUtils {

    public static User getUserById(Long id, UserRepository userRepository){
           return userRepository.findById(id).get();
    }

    public static void userUpdate(User user, User toBeUpdated){
        if (Objects.nonNull(user.getName()) && !"".equalsIgnoreCase(user.getName())) {
            toBeUpdated.setName(user.getName());
        }

        if (Objects.nonNull(user.getSurname()) && !"".equalsIgnoreCase(user.getSurname())) {
            toBeUpdated.setSurname(user.getSurname());
        }

        if (Objects.nonNull(user.getUsername()) && !"".equalsIgnoreCase(user.getUsername())) {
            toBeUpdated.setUsername(user.getUsername());
        }

        if (Objects.nonNull(user.getEmail()) && !"".equalsIgnoreCase(user.getEmail())) {
            toBeUpdated.setEmail(user.getEmail());
        }

        if (Objects.nonNull(user.getPassword()) && !"".equalsIgnoreCase(user.getPassword())) {
            toBeUpdated.setPassword(user.getPassword());
        }
    }
}
