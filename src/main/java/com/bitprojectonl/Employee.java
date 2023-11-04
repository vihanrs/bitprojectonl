package com.bitprojectonl;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.validator.constraints.Length;

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

@Entity // applied as an entity class
@Table(name = "employee") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // generate all args constructor
public class Employee {
    @Id //for primary key -PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto generated id - AI
    @Column(name = "id", unique = true) // for map with column
    @NotNull
    private Integer id;

    @Column(name = "empno", unique = true)
    @NotNull
    @Length(max = 8)
    private String empNo;

    @Column(name = "fullname")
    @NotNull
    private String fullName;

    @Column(name = "callingname")
    @NotNull
    private String callingName;

    @Column(name = "nic", unique = true)
    @NotNull
    @Length(max = 12, min = 10)
    private String nic;

    @Column(name = "email", unique = true)
    @NotNull
    private String email;

    @Column(name = "mobile")
    @NotNull
    @Length(max = 10)
    private String mobile;

    @Column(name = "land_no")
    private String landNo;

    @Column(name = "address")
    @NotNull
    private String address;

    @Column(name = "note")
    private String note;

    @Column(name = "gender")
    @NotNull
    private String gender;

    @Column(name = "civilstatus")
    @NotNull
    private String civilStatus;

    @Column(name = "dateofbirth")
    @NotNull
    private LocalDate dateOfBirth;

    @Column(name = "addeddatetime")
    @NotNull
    private LocalDateTime addedDateTime;

    @Column(name = "lastmodifydatetime")
    private LocalDateTime lastModifyDateTime;

    @Column(name = "deletedatetime")
    private LocalDateTime deleteDateTime;

    @ManyToOne //relationship formate
    @JoinColumn (name = "employee_status_id", referencedColumnName = "id") // join column condition
    private EmployeeStatus employeeStatusId;

    @ManyToOne
    @JoinColumn(name = "designation_id", referencedColumnName = "id") 
    private Designation designationId;

}
