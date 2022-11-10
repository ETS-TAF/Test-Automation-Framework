package ca.etsmtl.taf.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ca.etsmtl.taf.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUserName(String username);

  Boolean existsByUserName(String userName);

  Boolean existsByEmail(String email);
}
