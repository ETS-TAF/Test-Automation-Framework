package ca.etsmtl.taf.access.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ca.etsmtl.taf.access.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
}