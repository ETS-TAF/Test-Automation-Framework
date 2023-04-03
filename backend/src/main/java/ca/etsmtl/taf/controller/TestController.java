package ca.etsmtl.taf.controller;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
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


	@PostMapping("/executeTest")
	public ResponseEntity<String> executeTest(@RequestParam("browser") String browser, @RequestBody String requestBody) {
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString("http://localhost:9595/" + browser + "/test");

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<String> requete = new HttpEntity<>(requestBody, headers);

		ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.POST, requete, String.class);

		return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
	}
}
