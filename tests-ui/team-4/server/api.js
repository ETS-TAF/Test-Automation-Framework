const express = require('express');
const TestRunner = require('./TestRunner.js').default;
var cors = require('cors');
const { default: TestCase } = require('./TestCase.js');

const app = express();
const ads = { API: 'Interface Tester' };
app.use(express.json());
app.use(cors())

app.listen(3001, () => {
    console.log('# Interface Tester is running on port 3001 ');
});


app.get('/', (req, res) => {
    res.send(ads);
});

app.post('/', (req, res) => {
    if (req.body.testCase == true) {
        TestCase(req.body.website, req.body.tests, req.body.hideBrowser)
            .catch((err) => {
                console.log(err);
            })
            .then((result) => {
                // const sanitezed = result.replace(/(\r\n|\n|\r)/gm, '');
                res.send(result);
            });
    }
    else {
        TestRunner(req.body.website, req.body.tests, req.body.hideBrowser)
            .catch((err) => {
                console.log(err);
            })
            .then((result) => {
                // const sanitezed = result.replace(/(\r\n|\n|\r)/gm, '');
                res.send(result);
            });
    }
});