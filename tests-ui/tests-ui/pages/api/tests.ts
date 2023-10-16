import type { NextApiRequest, NextApiResponse } from "next";

export type TestResults = {
  firstTest: boolean;
  secondTest: boolean;
  thirdTest: boolean;
};

const titleTags = ["h1", "h2", "h3", "h4", "h5", "h6"];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestResults>
) {
  const { Builder, By } = require("selenium-webdriver");
  const chrome = require('selenium-webdriver/chrome');
  const body = JSON.parse(req.body);
  const {
    url,
    h1Text,
    firstTestButtonText,
    firstTestTextShown,
    doFirstTest,
    doSecondTest,
    doThirdTest,
    htmlSelectorIdentifier,
    identifier,
    htmlSelectorPassword,
    password,
    thirdTestButtonName,
    thirdTestTextShown,
    thirdTestLoginButton,
  } = body;

  const testResults: TestResults = {
    firstTest: false,
    secondTest: false,
    thirdTest: false,
  };

  (async function executeTests() {
    const options = new chrome.Options();
    options.headless();
    options.addArguments('no-sandbox')
    options.addArguments('disable-dev-shm-usage')
    const seleniumServer = process.env.SELENIUM_SERVER ?? "http://localhost:4444/wd/hub";
    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .usingServer(seleniumServer)
      .build();

    try {
      await driver.get(url);
      if (doFirstTest) {
        // Tester le texte affiché suite à un clic sur un boutton
        let firstTestElements = await driver.findElement(
          By.xpath(`//*[text()[contains(.,'${firstTestButtonText}')]]`)
        );
        const actions = driver.actions({ async: true });
        await actions.move({ origin: firstTestElements }).click().perform();
        let firstTestTextShownElements = await driver.findElements(
          By.xpath(`//*[text()[contains(.,'${firstTestTextShown}')]]`)
        );
        testResults.firstTest = firstTestTextShownElements.length > 0;
      }

      if (doSecondTest) {
        //  Tester le texte dans une balise de titre
        await driver.get(url);
        for (const title of titleTags) {
          let secondElements = await driver.findElements(By.tagName(title));
          for (let e of secondElements) {
            const textElement: string = await e.getText();
            if (textElement.includes(h1Text)) {
              testResults.secondTest = true;
              break;
            }
          }
        }
      }

      if (doThirdTest) {
        //  Tester l'authentification
        await driver.get(url);
        //  Rediriger vers la page de connexion
        if (thirdTestLoginButton) {
          let loginElement = await driver.findElement(
            By.xpath(`//*[text()[contains(.,'${thirdTestLoginButton}')]]`)
          );
          const actions = driver.actions({ async: true });
          await actions.move({ origin: loginElement }).click().perform();
        }
        //  Identifiant
        let identifierElement;
        if (htmlSelectorIdentifier.charAt(0) === "#") {
          identifierElement = await driver.findElement(
            By.id(htmlSelectorIdentifier.substring(1))
          );
        } else if (htmlSelectorIdentifier.charAt(0) === ".") {
          identifierElement = await driver.findElement(
            By.className(htmlSelectorIdentifier.substring(1))
          );
        } else {
          identifierElement = await driver.findElement(
            By.name(htmlSelectorIdentifier)
          );
        }
        const actionsIdentifier = driver.actions({ async: true });
        await actionsIdentifier
          .move({ origin: identifierElement })
          .press()
          .perform();
        await driver.actions().sendKeys(identifier).perform();

        //  Mot de passe
        let passwordElement;
        if (htmlSelectorPassword.charAt(0) === "#") {
          passwordElement = await driver.findElement(
            By.id(htmlSelectorPassword.substring(1))
          );
        } else if (htmlSelectorPassword.charAt(0) === ".") {
          passwordElement = await driver.findElement(
            By.className(htmlSelectorPassword.substring(1))
          );
        } else {
          passwordElement = await driver.findElement(
            By.name(htmlSelectorPassword)
          );
        }
        const actionsPassword = driver.actions({ async: true });
        await actionsPassword
          .move({ origin: passwordElement })
          .press()
          .perform();
        await driver.actions().sendKeys(password).perform();

        //  Cliquer sur le bouton pour s'authentifier
        let authenticateButton = await driver.findElement(
          By.xpath(`//*[text()[contains(.,'${thirdTestButtonName}')]]`)
        );
        const actions = driver.actions({ async: true });
        await actions.move({ origin: authenticateButton }).click().perform();
        await driver.manage().setTimeouts({ implicit: 2000 });
        let thirdTestTextShownElements = await driver.findElements(
          By.xpath(`//*[text()[contains(.,'${thirdTestTextShown}')]]`)
        );
        testResults.thirdTest = thirdTestTextShownElements.length > 0;
      }
    } finally {
      res.status(200).json(testResults);
      await driver.quit();
    }
  })();
}
