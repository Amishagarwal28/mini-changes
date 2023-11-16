package com.service;

import org.springframework.http.ResponseEntity;

import com.dto.AuthRequest;
import com.dto.ForgotPasswordDTO;
import com.dto.LoginDTO;
import com.dto.SignupDTO;
import com.dto.UserResponseDTO;
import com.entity.UserEntity;

public interface UserService {
	public ResponseEntity<UserResponseDTO>addUser(SignupDTO signupDto);

    public ResponseEntity<UserResponseDTO> login(LoginDTO loginDto);

	public ResponseEntity<?> forgotPassword(ForgotPasswordDTO forgotPasswordDTO);

	public String generateToken(String username);

	public void validateToken(String token);

	public UserEntity getUserDetails(String username);

	public UserResponseDTO getToken(AuthRequest authRequest);

}
