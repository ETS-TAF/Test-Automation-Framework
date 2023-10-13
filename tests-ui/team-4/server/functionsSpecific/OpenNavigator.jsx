async function OpenNavigator(driver, website) {
  const result = {
    name: "Ouvrir le navigateur",
    code: "OpenNavigator",
    passed: true,
    reason: "Aucune raison",
    awnser: [],
  };
  result.name = `Ouvrir le navigateur - ( ${website} ) ` ;

  try {
    await driver.get(website);
    // Sceeenshot ?
    result.passed = true;
  } catch (error) {
    result.passed = false;
    result.reason = "Le site Web est en panne ou n'existe pas";
  } finally {
    return result;
  }
}

exports.default = OpenNavigator;
