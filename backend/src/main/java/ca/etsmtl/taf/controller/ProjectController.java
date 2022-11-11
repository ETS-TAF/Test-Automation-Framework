package ca.etsmtl.taf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.etsmtl.taf.entity.Project;
import ca.etsmtl.taf.entity.User;
import ca.etsmtl.taf.repository.ProjectRepository;
import ca.etsmtl.taf.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/op")
public class ProjectController {
	
	@Autowired
	private UserRepository userRepository;
	
	private final ProjectRepository repository;

	ProjectController(ProjectRepository repository) {
	    this.repository = repository;
	  }	

	@PostMapping("/projects")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	Project newProject(@RequestBody Project newProject) {
		
		User currentOwner = userRepository.findByUserName(newProject.getOwner().getUserName()).get();
		newProject.setOwner(currentOwner);
		return repository.save(newProject);
	}	

	@GetMapping("/projects")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	List<Project> getProjects() {
		return repository.findAll();
	}

}
