async function Wait(driver, temps) {
  const result = {
    name: "Attendre quelques secondes",
    code: "Wait",
    passed: true,
    reason: "Aucune raison",
    awnser: [],
  };
  result.name = `Attendre ${temps / 1000} secondes`;
  try {
    await driver.sleep(temps);
    result.passed = true;
  } catch (error) {
    result.passed = false;
    result.reason = "Le site Web est en panne ou n'existe pas";
  } finally {
    return result;
  }
}

exports.default = Wait;
