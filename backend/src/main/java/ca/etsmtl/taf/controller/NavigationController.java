package ca.etsmtl.taf.controller;

import java.util.Arrays;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NavigationController {

    @GetMapping("{tab}")
    public String tab(@PathVariable String tab) {
        if (Arrays.asList("dashbord", "testrun", "edition")
                  .contains(tab)) {
            return tab;
        }

        return "redirect:/";
    }
}
