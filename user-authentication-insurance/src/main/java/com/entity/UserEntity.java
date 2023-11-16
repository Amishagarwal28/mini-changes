package com.entity;

import java.sql.Date;


import com.dto.UserResponseDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity  
@AllArgsConstructor
@NoArgsConstructor
@Table(name="user")
public class UserEntity {

	@Id 
    @GeneratedValue()
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username")
    private String username;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "user_role")
    private String userRole;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "phone_no")
    private Long phoneNo;
    
    @Column(name = "nickname")
    private String nickname;
    
    @Column(name = "dob")
    private Date dob;

    public UserResponseDTO toDto() {
        return UserResponseDTO.builder().userId(userId).username(username).email(email).userRole(userRole).build();
    }
}

