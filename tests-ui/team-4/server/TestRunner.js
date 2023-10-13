const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");

const TestingFunctions = {
    online: require('./functions/Online.jsx').default,
    menu: require('./functions/Menu.jsx').default,
}

async function TestRunner(website, tests, hideBrowser) {
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

    console.log('# Testing website: ' + website);
    if (tests.includes('ONLINE')) {
        console.log(' - Website Online...');
        const test1 = await TestingFunctions.online(driver, "https://acadarc.org/");
        // console.log(test1);
        testResult['ONLINE'] = test1;
    }
    if (tests.includes('MENU')) {
        console.log(' - Website Menu...');
        const test = await TestingFunctions.menu(driver, website);
        // console.log(test);
        testResult['MENU'] = test;
    }
    await driver.quit();
    return testResult;

}

exports.default = TestRunner;

