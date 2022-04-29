package ca.etsmtl.taf.controller;

import java.util.Arrays;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
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
