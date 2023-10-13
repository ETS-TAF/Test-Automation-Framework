async function CheckPage(driver, website) {
  const result = {
    name: "Vérification de la page courrante",
    code: "CheckPage",
    passed: true,
    reason: "Aucune raison",
    awnser: [],
  };
  try {
    result.name = `Vérifier de la page courrante - ( ${website} )`;
    const url = await driver.getCurrentUrl();
    if (url === website) {
      result.passed = true;
    } else {
      throw new Error(
        `La page ne correspond pas à celle attendu. La page trouvée est: ${url}`
      );
    }
    return result;
  } catch (error) {
    result.passed = false;
    result.reason = error.message;
    return result;
  }
}

exports.default = CheckPage;
