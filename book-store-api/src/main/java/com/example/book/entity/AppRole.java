package com.example.book.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class AppRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "VARCHAR(45)", name = "role_name")
    private String roleName;

    @Column(columnDefinition = "BIT(1) DEFAULT 0")
    private Boolean status;

    @JsonBackReference
    @OneToMany(mappedBy = "appRole")
    @JsonIgnore
    private List<UserRole> userRoles;

    public AppRole() {
    }

    public AppRole(Integer id, String roleName, Boolean status, List<UserRole> userRoles) {
        this.id = id;
        this.roleName = roleName;
        this.status = status;
        this.userRoles = userRoles;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
