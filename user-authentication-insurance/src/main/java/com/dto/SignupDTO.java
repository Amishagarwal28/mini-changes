package com.dto;

import java.sql.Date;


import com.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupDTO {

	private String username;

	private String email;

	private String password;

	private String address;

	private Long phoneNo;

	private String nickname;

	private Date dob;

	public UserEntity toEntity() {
		return UserEntity.builder().username(username).email(email).password(password).address(address).phoneNo(phoneNo)
				.nickname(nickname).dob(dob).build();
	}
}
