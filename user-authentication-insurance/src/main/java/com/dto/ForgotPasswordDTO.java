package com.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForgotPasswordDTO {
private String email;
private String nickname;
private String password;
private String confirmPassword;
}
