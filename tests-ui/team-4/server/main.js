const TestRunner = require('./TestRunner.js').default;

// NO MENU 
const website1 = 'https://www.google.com/';
const website2 = 'https://duckduckgo.com/';

// FAKE WEBSITE 
const website3 = 'https://www.jakkjhjksdhjsd.com/';

// TEACHER WEBSITE
const website4 = 'https://www.acadarc.org/';

//GOT MENU
const website5 = 'https://stackoverflow.com/';
const website6 = 'https://itecnote.com/';
const website7 = 'https://www.shakercuisineetmixologie.com/';


const website = website4;
var hideBrowser = false;
tests = ['ONLINE', 'MENU'];
TestRunner(website, tests, hideBrowser);