const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');
const { login, authorize} = require('./auth')

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//Login endpoint from auth.js
app.post('/login', login);
    
// Endpoints from queries.js handling
app.get('/bike', db.getBikecheck);
app.get('/bike/:part', db.getPart);
app.post('/bike', authorize, db.postNewPart);
app.put('/bike/:id', authorize, db.updatePart);
app.delete('/bike/:id', authorize, db.deletePart);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});