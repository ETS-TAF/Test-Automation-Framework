package ca.etsmtl.selenium.requests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.time.Duration;
import java.util.concurrent.TimeUnit;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;

import org.springframework.web.bind.annotation.*;

import ca.etsmtl.selenium.requests.payload.request.SeleniumAction;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/microservice/selenium")
public class useSelenium {
    @PostMapping("/test")
    public String testWithSelenium(@RequestBody List<SeleniumAction> seleniumActions) {
        Logger logger = Logger.getLogger("useSelenium");
        logger.setLevel(Level.ALL);
        Arrays.stream(logger.getHandlers()).forEach(handler -> {
            handler.setLevel(Level.FINE);
        });
        for (SeleniumAction seleniumAction : seleniumActions) {
            try {
                WebDriver driver = new ChromeDriver();

                try {
                    switch (seleniumAction.getAction_type_name()) {
                        case "goToUrl":
                            driver.get(seleniumAction.getInput());
                            break;
                        case "FillField":
                            break;
                        case "type":
                            break;
                        case "assert":
                            break;
                        default:
                            break;
                    }
        
                    driver.quit();
        
                    return "test completed";
                }
        
                catch(Exception e) {
                    driver.quit();
                    return "error on test";
                }
            }

            catch(Exception e) {
                return "error with the web driver";
            }
    	}
        return "error";
    }

    @GetMapping("/all")
    public String allAccess() {
        return "Bienvenue au TAF.";
    }
}
