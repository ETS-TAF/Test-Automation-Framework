package ca.etsmtl.taf.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ca.etsmtl.taf.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
}