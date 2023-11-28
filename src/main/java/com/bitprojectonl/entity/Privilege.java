package com.bitprojectonl.entity;

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
@Table(name = "privilege")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Privilege {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    @NotNull
    private Integer id;

    @Column(name = "sel")
    @NotNull
    private boolean sel;

    @Column(name = "inst")
    @NotNull
    private boolean inst;

    @Column(name = "upd")
    @NotNull
    private boolean upd;

    @Column(name = "del")
    @NotNull
    private boolean del;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    @NotNull
    private Role role;

    @ManyToOne
    @JoinColumn(name = "module_id", referencedColumnName = "id") 
    @NotNull
    private Module module;
}
