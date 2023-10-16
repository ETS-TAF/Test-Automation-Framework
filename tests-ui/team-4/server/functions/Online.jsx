async function Online(driver, website) {
  const result = {
    name: "Tester si le site est en ligne",
    code: "ONLINE",
    passed: true,
    reason: "Aucune raison",
    awnser: [],
  };
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

exports.default = Online;
