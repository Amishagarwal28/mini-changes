package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;


import com.dto.AuthRequest;
import com.dto.ForgotPasswordDTO;
import com.dto.LoginDTO;
import com.dto.SignupDTO;
import com.dto.UserResponseDTO;
import com.entity.UserEntity;
import com.service.UserService;
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

	@Autowired
    UserService userService;
	
	@Autowired
	private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDTO> addUser(@RequestBody SignupDTO signupDto)
    {
        return userService.addUser(signupDto);
    }
    @PostMapping("/token")
    public UserResponseDTO getToken(@RequestBody AuthRequest authRequest) {
    	System.out.print(authRequest.getUsername());
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
            

            return userService.getToken(authRequest);
        } else {
        	System.out.print("notttttttttt");

            throw new RuntimeException("invalid access");
        }
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        userService.validateToken(token);
        return "Token is valid";
    }
    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO>login(@RequestBody LoginDTO loginDto) {
        return userService.login(loginDto);
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDTO forgotPasswordDTO){
    	System.out.print(forgotPasswordDTO);
    	return userService.forgotPassword(forgotPasswordDTO);
    }
   
}
