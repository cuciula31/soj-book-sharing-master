package com.soj.booksharing.web;

import com.soj.booksharing.data.JwtUtil;
import com.soj.booksharing.entity.Authority;
import com.soj.booksharing.entity.User;
import com.soj.booksharing.repository.AuthorityRepository;
import com.soj.booksharing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthorityRepository authorityRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialRequest request){
        try {
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(), request.getPassword()
                    )
            );

            User user = (User) authenticate.getPrincipal();
            String token = jwtUtil.generateToken(user);
            return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION,
                    token)
                    .body(token);
        }catch (BadCredentialsException badCredentialsException){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
//        return ResponseEntity.ok(null);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User request){

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encryptedPassword = passwordEncoder.encode(request.getPassword());
        request.setPassword(encryptedPassword);
        userRepository.save(request);

        Authority authority = new Authority();
        authority.setAuthority("BASIC_USER");
        authority.setUser(request);

        authorityRepository.save(authority);
        return  ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, "ok").body("ok");
    }

}
