const { By } = require("selenium-webdriver");

async function CloseNavigator(driver) {
  const result = {
    name: "Fermer le navigateur",
    code: "CloseNavigator",
    passed: true,
    reason: "Aucune raison",
    awnser: [],
  };
  try {
    await driver.quit();
    result.passed = true;
  } catch (error) {
    result.passed = false;
    result.reason = "L'element n'existe pas ou ne marche pas.";
  } finally {
    return result;
  }
}

exports.default = CloseNavigator;
