const express = require('express');

const ripple = require('./api/ripple');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/ripple', ripple);

app.get('/', (req, res) => {
    res.send('welcome ripple exchange system');
});

app.listen(port, () => {
    console.log(`Example app listening at http://158.247.203.166:${port}`);
})

module.exports = app;