const { By } = require("selenium-webdriver");

async function Menu(driver, website) {
  const result = {
    name: "Tester si le menu est bien fonctionnel",
    code: "MENU",
    passed: true,
    reason: "Aucune raison",
    awnser: [],
  };
  try {
    await driver.get(website);
    const menu = await driver.findElement(By.tagName("header"));
    const menuItems = await menu.findElements(By.tagName("a"));
    const links = [];
    for (let i = 0; i < menuItems.length; i++) {
      const item = await menuItems[i].getAttribute("href");
      links.push(item);
    }

    await Promise.all(
      links.map(async (link) => {
        if (link.startsWith("http://") || link.startsWith("https://")) {
          try {
            await driver.get(link);
          } catch (error) {
            result.passed = false;
            result.reason = "Un ou plusieurs liens du menu ne fonctionne pas";
            result.awnser.push({ link: link, error: error.message });
          }
        }
      })
    );
  } catch (error) {
    result.passed = false;
    result.reason = "Aucun Menu n'a été trouvé"; // Probably CLOSE THE WINDOW TOO SOON, no such element Unable to locate element
  } finally {
    return result;
  }
}
exports.default = Menu;
