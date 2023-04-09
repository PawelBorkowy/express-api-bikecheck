const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries')

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Endpoints from queries.js handling
app.get('/conway', db.getBikecheck);
app.get('/conway/:part', db.getPart);
app.post('/conway', db.postNewPart);
app.put('/conway/:id', db.updatePart);
app.delete('/conway/:id', db.deletePart);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});