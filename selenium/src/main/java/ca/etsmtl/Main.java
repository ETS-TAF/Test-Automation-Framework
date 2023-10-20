package ca.etsmtl;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;


public class Main {
    String website_url = "https://www.selenium.dev/selenium/web/web-form.html";

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver(website_url);

        driver.get();

        driver.getTitle();

        driver.manage().timeouts().implicitlyWait(1,TimeUnit.SECONDS);

        WebElement textBox = driver.findElement(By.name("my-text"));
        WebElement submitButton = driver.findElement(By.cssSelector("button"));

        textBox.sendKeys("Selenium");
        submitButton.click();

        WebElement message = driver.findElement(By.id("message"));
        message.getText();

        driver.quit();
    }
}