package ca.etsmtl.taf.controller;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import ca.etsmtl.taf.entity.User;
import ca.etsmtl.taf.repository.UserRepository;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

	private UserRepository repository;
	private final RestTemplate restTemplate;


	TestController(UserRepository repository, RestTemplate restTemplate) {
	    this.repository = repository;
		this.restTemplate = restTemplate;
	  }

	@GetMapping("/all")
	public String allAccess() {
		return "Bienvenue au TAF.";
	}

	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}

	@GetMapping("/users")
	public List<User> getUsers() {
		return repository.findAll();
	}


	@GetMapping("/executeTest")

	public ResponseEntity<String> executeTest(@RequestParam("userUrl") String userUrl) {
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString("http://localhost:9595/firstTest")
		.queryParam("userUrl", userUrl);
		ResponseEntity<String> response = restTemplate.getForEntity(builder.toUriString(), String.class);

		return response;
	}

	@GetMapping("/executeTestCasButton")
	public ResponseEntity<String> executeTestCasButton(@RequestParam("userUrl") String userUrl, @RequestParam("buttonName") String buttonName, @RequestParam("selectedText") String selectedText){

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString("http://localhost:9595/executeTestCasButton")
				.queryParam("userUrl", userUrl)
				.queryParam("buttonName", buttonName)
				.queryParam("selectedText", selectedText);
		ResponseEntity<String> response = restTemplate.getForEntity(builder.toUriString(), String.class);

		return response;
	}

}
