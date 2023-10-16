const { By } = require("selenium-webdriver");

async function EnterInput(driver, locator, input) {
  const result = {
    name: "Écrire du texte dans un champ",
    code: "EnterInput",
    passed: true,
    reason: "Aucune raison",
    awnser: [],
  }; // driver.findElement(By.css(test.locator)).sendKeys(input);

  const action = locator.split("=");
  if (action[1] !== undefined) {
    result.name = `Écrire du texte dans un champ - ( ${action[0]}=${action[1]} )`;
  }
  try {
    if (action[0] === "id") {
      await driver
        .findElement(By.id(action[1]))
        .sendKeys(input)
        .catch((err) => {
          throw new Error("L'element n'existe pas ou ne marche pas.");
        });
    } else if (action[0] === "name") {
      await driver
        .findElement(By.name(action[1]))
        .sendKeys(input)
        .catch((err) => {
          throw new Error("L'element n'existe pas ou ne marche pas.");
        });
    } else if (action[0] === "xpath") {
      await driver
        .findElement(By.xpath(action[1]))
        .sendKeys(input)
        .catch((err) => {
          throw new Error("L'element n'existe pas ou ne marche pas.");
        });
    } else if (action[0] === "css") {
      await driver
        .findElement(By.css(action[1]))
        .sendKeys(input)
        .catch((err) => {
          throw new Error("L'element n'existe pas ou ne marche pas.");
        });
    } else if (action[0] === "linkText") {
      await driver
        .findElement(By.linkText(action[1]))
        .sendKeys(input)
        .catch((err) => {
          throw new Error("L'element n'existe pas ou ne marche pas.");
        });
    } else if (action[0] === "partialLinkText") {
      await driver
        .findElement(By.partialLinkText(action[1]))
        .sendKeys(input)
        .catch((err) => {
          throw new Error("L'element n'existe pas ou ne marche pas.");
        });
    } else if (action[0] === "class") {
      await driver
        .findElement(By.className(action[1]))
        .sendKeys(input)
        .catch((err) => {
          throw new Error("L'element n'existe pas ou ne marche pas.");
        });
    } else if (action[0] === "tagName") {
      await driver
        .findElement(By.tagName(action[1]))
        .sendKeys(input)
        .catch((err) => {
          throw new Error("L'element n'existe pas ou ne marche pas.");
        });
    } else {
      throw new Error("Le locator n'est pas bien défini.");
    }
    await driver.sleep(1000);
    result.passed = true;
    return result;
  } catch (error) {
    result.passed = false;
    result.reason = error.message;
    return result;
  }
}

exports.default = EnterInput;
