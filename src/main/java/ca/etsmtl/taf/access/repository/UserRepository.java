package ca.etsmtl.taf.access.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ca.etsmtl.taf.access.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
