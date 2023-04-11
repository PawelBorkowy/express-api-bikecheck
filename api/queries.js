const {Pool} = require('pg')
require('dotenv').config()

// Database config
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Create bike table 
pool.query('CREATE TABLE IF NOT EXISTS bike (id SERIAL PRIMARY KEY, part TEXT NOT NULL, brand TEXT NOT NULL, model TEXT NOT NULL)');

// Get specific part by name
const getPart = (req, res) => {
    const partName = req.params.part;
    const query = `SELECT id, brand, model FROM bike WHERE part = $1`;

    pool.query(query, [partName], (error, results) => {
        if (error) { // Database error handling
            console.error('Error getting bike part', error);           
            res.status(500).send('Error getting bike part');
            return;
        }
        res.send(results.rows);
    });
};

// Get whole bikecheck
const getBikecheck = (req, res) => {
    const query = 'SELECT * FROM bike';

    pool.query(query, (error, results) => {
        if (error) { // Database error handling
            console.error('Error getting bike bikecheck', error);           
            res.status(500).send('Error getting bike bikecheck');
            return;
        }
        res.send(results.rows);
    });
};

// Add new part to database
const postNewPart = (req, res) => {
    const { part, brand, model } = req.body;
    const query = `INSERT INTO bike (part, brand, model) VALUES ($1, $2, $3)`;

    pool.query(query, [part, brand, model], (error, results) => {
        if (error) { // Database error handling
            console.error('Error adding bike part', error);        
            res.status(500).send('Error adding bike part');
            return;
        }
        res.send(results.rows);
    });
};

// Update existing specific part
const updatePart = (req, res) => {
    const { part, brand, model } = req.body;
    const id = req.params.id;
    const query = `UPDATE bike SET part = $1, brand = $2, model = $3 WHERE id = $4`;
  
    pool.query(query, [part, brand, model, id], (error, results) => {
      if (error) { // Database error handling
        console.error('Error updating bike part', error);
        res.status(500).send('Error updating bike part');
        return;
      }
  
      res.send(results.rows);
    });
};

// Delete part from database
const deletePart = (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM bike WHERE id = $1`;
  
    pool.query(query, [id], (error, results) => {
      if (error) { // Database error handling
        console.error('Error deleting bike part', error);
        res.status(500).send('Error deleting bike part');
        return;
      }
  
      res.send(results.rows);
    });
};

module.exports = {
    getPart,
    getBikecheck,
    postNewPart,
    updatePart,
    deletePart,
};