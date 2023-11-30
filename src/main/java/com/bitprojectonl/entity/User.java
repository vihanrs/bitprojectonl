package com.bitprojectonl.entity;

import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
	private String userName;
	
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
	
	@ManyToMany(cascade = CascadeType.MERGE)
	@JoinTable(name = "user_has_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles;
}
