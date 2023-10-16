var process = require("process");
const SERVER_API_URL = process.env.SERVER_API_URL;
console.log("/*************************************** */");
console.log(SERVER_API_URL);
console.log("/*************************************** */");
console.log(process.env);
const PROXY_CONFIG = [
    {
        context: [
            "/"
        ],
        target: SERVER_API_URL
    },
];
module.exports = PROXY_CONFIG;