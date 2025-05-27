package swp.project.adn_backend.service;

import lombok.AccessLevel;

import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import swp.project.adn_backend.dto.request.UserDTO;
import swp.project.adn_backend.entity.Users;
import swp.project.adn_backend.enums.RegisterErrorCode;
import swp.project.adn_backend.enums.Roles;
import swp.project.adn_backend.exception.AppException;
import swp.project.adn_backend.mapper.UserMapper;
import swp.project.adn_backend.repository.UserRepository;

import java.util.Collections;
import java.util.HashSet;


@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserService {

    UserRepository userRepository;
    UserMapper userMapper;


    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;

    }


    // Đăng ký User
    public Users registerUserAccount(UserDTO userDTO) {

        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new AppException(RegisterErrorCode.USER_EXISTED);
        }

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new AppException(RegisterErrorCode.EMAIL_EXISTED);
        }

        if (userRepository.existsByPhone(userDTO.getPhone())) {
            throw new AppException(RegisterErrorCode.PHONE_EXISTED);
        }
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            throw new AppException(RegisterErrorCode.CONFIRM_PASSWORD_NOT_MATCHING);
        }
        // MÃ hóa passoword
        PasswordEncoder passwordEncoder=new BCryptPasswordEncoder(10);
        Users users = userMapper.toUser(userDTO);

        HashSet<String> role=new HashSet<>();
        role.add(Roles.USER.name());
        users.setRoles(role);

        users.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userRepository.save(users);

    }

}
