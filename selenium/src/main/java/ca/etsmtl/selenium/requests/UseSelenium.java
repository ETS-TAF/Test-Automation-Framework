package ca.etsmtl.selenium.requests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;
import java.util.concurrent.TimeUnit;
import java.util.Arrays;
import java.util.List;
import java.sql.Timestamp;

import org.springframework.web.bind.annotation.*;

import ca.etsmtl.selenium.requests.payload.request.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/microservice/selenium")
public class UseSelenium {
    @PostMapping("/test")
    public SeleniumResponse testWithSelenium(@RequestBody SeleniumCase seleniumCase) {
        List<SeleniumAction> seleniumActions = seleniumCase.getActions();

        SeleniumResponse seleniumResponse = new SeleniumResponse();
        seleniumResponse.setCase_id(seleniumCase.getCase_id());
        seleniumResponse.setCaseName(seleniumCase.getCaseName());
        seleniumResponse.setSeleniumActions(seleniumActions);
        long currentTimestamp = (new Timestamp(System.currentTimeMillis())).getTime();
        seleniumResponse.setTimestamp(currentTimestamp/1000);
        
        try {
            System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver");
            
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--no-sandbox");
            options.addArguments("--headless");
            options.addArguments("--disable-dev-shm-usage");
            options.addArguments("--window-size=1920x1080");
            WebDriver driver = new ChromeDriver(options);
            
            long startTime = System.currentTimeMillis();

            try {
                for (SeleniumAction seleniumAction : seleniumActions) {
                    System.out.println("action type name : " + seleniumAction.getAction_type_name());

                    switch (seleniumAction.getAction_type_id()) {
                        case 1: //goToUrl
                            System.out.println("go to : " + seleniumAction.getInput());
                            driver.get(seleniumAction.getInput());
                            driver.manage().timeouts().implicitlyWait(1,TimeUnit.SECONDS);
                            break;
                        case 2: //FillField
                            System.out.println("fill : " + seleniumAction.getObject() + " with " + seleniumAction.getInput());
                            WebElement textBox = driver.findElement(By.name(seleniumAction.getObject()));
                            textBox.sendKeys(seleniumAction.getInput());
                            break;
                        case 3: //GetAttribute
                            WebElement webElement = driver.findElement(By.name(seleniumAction.getTarget()));
                            String pageAttribute = webElement.getAttribute(seleniumAction.getObject());
                            if (!pageAttribute.equals(seleniumAction.getInput())) {
                                seleniumResponse.setSuccess(false);
                                seleniumResponse.setOutput("Attribute " + seleniumAction.getObject() + " of " + seleniumAction.getTarget() + " is " + pageAttribute + " instead of " + seleniumAction.getInput());
                                driver.quit();
                                long endTime = System.currentTimeMillis();
                                long totalTime = endTime - startTime;
                                seleniumResponse.setDuration(totalTime);
                                return seleniumResponse;
                            }
                            break;
                        case 4: //GetPageTitle
                            String pageTitle = driver.getTitle();
                            if (!pageTitle.equals(seleniumAction.getTarget())) {
                                seleniumResponse.setSuccess(false);
                                seleniumResponse.setOutput("Page title is " + pageTitle + " instead of " + seleniumAction.getTarget());
                                driver.quit();
                                long endTime = System.currentTimeMillis();
                                long totalTime = endTime - startTime;
                                seleniumResponse.setDuration(totalTime);
                                return seleniumResponse;
                            }
                            break;
                        case 5: //Clear
                            WebElement textBoxToClear = driver.findElement(By.name(seleniumAction.getObject()));
                            textBoxToClear.clear();
                            break;
                        case 6: //Click
                            WebElement submitButton = driver.findElement(By.name(seleniumAction.getObject()));
                            submitButton.click();
                            break;
                        case 7: //isDisplayed
                            WebElement message = driver.findElement(By.name(seleniumAction.getObject()));
                            message.getText();
                            break;
                        default:
                            System.out.println("action type id : " + seleniumAction.getAction_type_id() + " not found");
                            break;
                    }
                }
        
                driver.quit();

                long endTime = System.currentTimeMillis();
                long totalTime = endTime - startTime;
                seleniumResponse.setDuration(totalTime);
                
                seleniumResponse.setSuccess(true);

            }
        
            catch(Exception e) {
                driver.quit();

                long endTime = System.currentTimeMillis();
                long totalTime = endTime - startTime;
                seleniumResponse.setDuration(totalTime);
                
                seleniumResponse.setSuccess(false);
                seleniumResponse.setOutput(e.getMessage());
                return seleniumResponse;
            }

        }

        catch(Exception e) {
            System.out.println(e);
            seleniumResponse.setSuccess(false);
            seleniumResponse.setOutput(e.toString());
            return seleniumResponse;
        }

        return seleniumResponse;
    }

    @GetMapping("/all")
    public String allAccess() {
        return "Bienvenue au TAF.";
    }
}
