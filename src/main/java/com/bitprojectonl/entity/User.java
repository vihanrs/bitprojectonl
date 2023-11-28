package com.bitprojectonl.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "username",unique = true)
	@NotNull
	private String username;
	
	@Column(name = "password")
	@NotNull
	private String password;
	
	@Column(name = "email",unique = true)
	@NotNull
	private String email;
	
	@Column(name = "photopath")
	private String photoPath;
	
	@Column(name = "status")
	@NotNull
	private Boolean status;
	
	@Column(name = "added_datetime")
	@NotNull
	private LocalDateTime addedDateTime;
	
	@Column(name = "note")
	private String note;

	@ManyToOne   //(optional = true) for optional FK
	@JoinColumn(name = "employee_id", referencedColumnName = "id")
	private Employee employeeId;
}
