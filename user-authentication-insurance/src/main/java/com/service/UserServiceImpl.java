package com.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dto.AuthRequest;
import com.dto.ForgotPasswordDTO;
import com.dto.LoginDTO;
import com.dto.SignupDTO;
import com.dto.UserResponseDTO;
import com.entity.UserEntity;
import com.enums.UserRole;
import com.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Override
	@Transactional
	public ResponseEntity<UserResponseDTO> addUser(SignupDTO signupDto) {
		if (isInvalidSignup(signupDto)) {
			return ResponseEntity.badRequest().body(null);
		}

		UserEntity userEntity = signupDto.toEntity();
		userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
		userEntity.setUserRole(UserRole.User.name());
		userRepository.save(userEntity);

		return ResponseEntity.status(HttpStatus.CREATED).body(userEntity.toDto());
	}

	private boolean isInvalidSignup(SignupDTO signupDto) {
		return signupDto == null || isNullOrEmpty(signupDto.getUsername()) || !isValidEmail(signupDto.getEmail())
				|| signupDto.getPassword().length() < 6 || !isValidPhoneNumber(signupDto.getPhoneNo());
	}

	private boolean isNullOrEmpty(String str) {
		System.out.println("a");
		return str == null || str.trim().isEmpty();
	}

	private boolean isValidEmail(String email) {
		System.out.println("e");

		return email != null && email.contains("@");
	}

	private boolean isValidPhoneNumber(Long phoneNo) {
		return phoneNo != null && String.valueOf(phoneNo).length() == 10;
	}

	@Override
	public ResponseEntity<UserResponseDTO> login(LoginDTO loginDto) {
		if (loginDto == null || !isValidEmail(loginDto.getEmail()) || isNullOrEmpty(loginDto.getPassword()))
			return ResponseEntity.badRequest().body(null);
		UserEntity userEntity = userRepository.findByEmail(loginDto.getEmail());
		if (userEntity == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

		if (!userEntity.getPassword().equals(loginDto.getPassword()))
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
       String jwt;
		Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        if (authenticate.isAuthenticated()) {
            jwt= generateToken(loginDto.getUsername());
        } else {
            throw new RuntimeException("invalid access");
        }
        UserResponseDTO dto=userEntity.toDto();
        dto.setJwt(jwt);
		return ResponseEntity.ok(dto);
	}

	@Override
	public ResponseEntity<?> forgotPassword(ForgotPasswordDTO forgotPasswordDTO) {
		System.out.print("hello");

//		if (!isValidEmail(forgotPasswordDTO.getEmail()) || isNullOrEmpty(forgotPasswordDTO.getPassword())
//				|| isNullOrEmpty(forgotPasswordDTO.getNickname())
//				|| isNullOrEmpty(forgotPasswordDTO.getConfirmPassword()))
//			return ResponseEntity.badRequest().body(null);
		UserEntity user = userRepository.findByEmailAndNickname(
			    forgotPasswordDTO.getEmail(), forgotPasswordDTO.getNickname());
		System.out.print(user);
//		if (user == null || !user.getNickname().equals(forgotPasswordDTO.getNickname()))
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

		if (!forgotPasswordDTO.getPassword().equals(forgotPasswordDTO.getConfirmPassword()))
			return ResponseEntity.badRequest().body("Passwords do not match");
System.out.print(user.getEmail());
		user.setPassword(passwordEncoder.encode(forgotPasswordDTO.getPassword()));
		userRepository.save(user);
		

		return ResponseEntity.ok("Password reset successfully");
	}
	public String generateToken(String username) {
        return jwtService.generateToken(username);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }

	@Override
	public UserEntity getUserDetails(String username) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserResponseDTO getToken(AuthRequest authRequest) {
		// TODO Auto-generated method stub
		String jwt=generateToken(authRequest.getUsername());
		Optional<UserEntity> userEntity=userRepository.findByUsername(authRequest.getUsername()); 
		return UserResponseDTO.builder().jwt(jwt).userId(userEntity.get().getUserId()).username(userEntity.get().getUsername()).email(userEntity.get().getEmail()).userRole(userEntity.get().getUserRole()).build();
	}

	
}
