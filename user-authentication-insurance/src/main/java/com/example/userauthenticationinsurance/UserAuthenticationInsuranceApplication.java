package com.example.userauthenticationinsurance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan("com")
@EnableJpaRepositories("com.repository")
@EntityScan("com.entity")
@EnableDiscoveryClient
public class UserAuthenticationInsuranceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserAuthenticationInsuranceApplication.class, args);
	}

}
