package ca.etsmtl.taf.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ca.etsmtl.taf.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
  Optional<Project> findByName(String name);
}