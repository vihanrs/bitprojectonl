package com.bitprojectonl.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebConfiguration {
	
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
		httpSecurity.authorizeHttpRequests(auth -> {
			auth
			.requestMatchers("/resources/**").permitAll()
			.requestMatchers("/createadmin").permitAll()
			.requestMatchers("/login").permitAll()
			.requestMatchers("/error").permitAll()
			.requestMatchers("/index").hasAnyAuthority("Admin","Manager","Cashier","Store-Manager")
			.requestMatchers("/employee/**").hasAnyAuthority("Admin","Manager")
			.requestMatchers("/privilege/**").hasAnyAuthority("Admin","Manager")
			.requestMatchers("/item/**").hasAnyAuthority("Admin","Manager","Cashier","Store-Manager")
			.requestMatchers("/user").hasAnyAuthority("Admin","Manager").anyRequest().authenticated();
		})
		//login form detail
		.formLogin(login->{login.loginPage("/login")
			.defaultSuccessUrl("/index",true)
			.failureUrl("/login?error=usernamepassworderror")
			.usernameParameter("userName")
			.passwordParameter("password");
			})
		
		//logout
		.logout(logout -> {
			logout
			.logoutUrl("/logout")
			.logoutSuccessUrl("/login");
		})
		
		//exception
		.exceptionHandling(exception -> {
			exception.accessDeniedPage("/error");
		})
		
		.csrf(csrf -> {
			csrf.disable();
		});
		
		return httpSecurity.build();
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		bCryptPasswordEncoder = new BCryptPasswordEncoder();
		return bCryptPasswordEncoder;
	}
}
