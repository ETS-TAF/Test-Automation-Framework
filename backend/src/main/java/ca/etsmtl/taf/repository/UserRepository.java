package ca.etsmtl.taf.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ca.etsmtl.taf.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
