const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");

const TestingFunctions = {
    openNavigator: require('./functionsSpecific/OpenNavigator.jsx').default,
    closeNavigator: require('./functionsSpecific/CloseNavigator.jsx').default,
    clickElement: require('./functionsSpecific/ClickElement.jsx').default,
    enterInput: require('./functionsSpecific/EnterInput.jsx').default,
    checkPage: require('./functionsSpecific/CheckPage.jsx').default,
    checkElement: require('./functionsSpecific/CheckElement.jsx').default,
    wait: require('./functionsSpecific/Wait.jsx').default
}

async function TestCase(website, tests, hideBrowser) {
    var testResult = {};
    var options = new chrome.Options();
    options.headless();
    options.addArguments('no-sandbox')
    options.addArguments('disable-dev-shm-usage')
    // options.excludeSwitches('enable-logging'); // hide devtools in options 

    const chromeDesktop = {
        prefs: {
            profile: {
                managed_default_content_settings: {
                    images: 2
                }
            }
        }
    };

    // hideBrowser ? options.addArguments("--headless") : null;
    const seleniumServer = process.env.SELENIUM_SERVER ?? "http://localhost:4444/wd/hub";
    let driver = await new Builder()
        .withCapabilities(chromeDesktop)
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .usingServer(seleniumServer)
        .build();

    console.log("\n ## Lancement de cas de test")
    for await (const test of tests) {
        // Open navigator
        if (test.value === 'OpenNavigator') {
            console.log(`  - ${test.label}: ${test.input}`);
            testResult['OpenNavigator'] = await TestingFunctions.openNavigator(driver, test.input);
        }
        // Click on a specific element
        if (test.value === 'ClickElement') {
            console.log(`  - ${test.label}: ${test.locator}`);
            testResult['clickElement'] = await TestingFunctions.clickElement(driver, test.locator);
        }
        // Enter an input in a element
        if (test.value === 'EnterInput') {
            console.log(`  - ${test.label}: ${test.locator}`);
            if (testResult['EnterInput']) {
                testResult[`EnterInput-2`] = await TestingFunctions.enterInput(driver, test.locator, test.input);
            }
            else {
                testResult['EnterInput'] = await TestingFunctions.enterInput(driver, test.locator, test.input);
            }
        }
        // Ask selenium to wait 
        if (test.value === 'Wait') {
            console.log(`  - ${test.label} for ${test.input} seconds`);
            const miliseconds = test.input * 1000;
            testResult['Wait'] = await TestingFunctions.wait(driver, miliseconds);

        }
        // check if driver is on a specific page 
        if (test.value === 'CheckPage') {
            console.log(`  - ${test.label}: ${test.input}`);
            testResult['CheckPage'] = await TestingFunctions.checkPage(driver, test.input);
        }

        // check if an element is present on the page
        if (test.value === 'CheckElement') {
            console.log(`  - ${test.label}: ${test.locator}`);
            if (testResult['CheckElement']) {
                testResult[`CheckElement-2`] = await TestingFunctions.checkElement(driver, test.locator);
            }
            else {
                testResult['CheckElement'] = await TestingFunctions.checkElement(driver, test.locator);
            }
        }

        // Close navigator
        if (test.value === 'CloseNavigator') {
            console.log(`  - ${test.label}`);
            testResult['CloseNavigator'] = await TestingFunctions.closeNavigator(driver);
        }
    }
    return testResult;


}

exports.default = TestCase;