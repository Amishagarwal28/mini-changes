package com.dto;

import com.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {
	private String username;
	private String email;
    private String password;

    public UserEntity toEntity() {
        return UserEntity.builder().password(password).email(email).build();
    }
}
