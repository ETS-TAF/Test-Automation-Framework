install node
install yarn
Install dependencies on both packages (yarn install)

"server": "start ./server/main.js",

    "dev": "concurrently --kill-others \"yarn run start-watch\" \"yarn run wp-server\"",


    "asos":"concurrently \"npm:server\" ",
