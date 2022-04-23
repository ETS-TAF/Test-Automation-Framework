package ca.etsmtl.taf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TestAutomationFrameworkApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestAutomationFrameworkApplication.class, args);
	}

}
