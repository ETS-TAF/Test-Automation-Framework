package ca.etsmtl.selenium.requests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/microservice/selenium")
public class useSelenium {
    @GetMapping("/test")
    public String firstTest() {
        try {
            WebDriver driver = new ChromeDriver();

            try {

                driver.get("https://www.selenium.dev/selenium/web/web-formm.html");
    
                driver.getTitle();
    
                driver.manage().timeouts().implicitlyWait(1,TimeUnit.SECONDS);
    
                WebElement textBox = driver.findElement(By.name("my-text"));
                WebElement submitButton = driver.findElement(By.cssSelector("button"));
    
                textBox.sendKeys("Selenium");
                submitButton.click();
    
                WebElement message = driver.findElement(By.id("message"));
                message.getText();
    
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

    @GetMapping("/all")
    public String allAccess() {
        return "Bienvenue au TAF.";
    }
}
