const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api-bikecheck',
    password: 'postgresSQL',
    port: 5432,
});

pool.query('CREATE TABLE IF NOT EXISTS conway (id SERIAL PRIMARY KEY, part TEXT NOT NULL, brand TEXT NOT NULL, model TEXT NOT NULL)');

const getPart = (req, res) => {
    const partName = req.params.part;
    const query = `SELECT id, brand, model FROM conway WHERE part = $1`;

    pool.query(query, [partName], (error, results) => {
        if (error) {
            console.error('Error getting conway part', error);
            res.status(500).send('Error getting conway part');
            return;
        }
        res.send(results.rows);
    });
};

const getBikecheck = (req, res) => {
    const query = 'SELECT * FROM conway';

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error getting conway bikecheck', error);
            res.status(500).send('Error getting conway bikecheck');
            return;
        }
        res.send(results.rows);
    });
};

const postNewPart = (req, res) => {
    const { part, brand, model } = req.body;
    const query = `INSERT INTO conway (part, brand, model) VALUES ($1, $2, $3)`;

    pool.query(query, [part, brand, model], (error, results) => {
        if (error) {
            console.error('Error adding conway part', error);
            res.status(500).send('Error adding conway part');
            return;
        }
        res.send(results.rows);
    });
};

const updatePart = (req, res) => {
    const { part, brand, model } = req.body;
    const id = req.params.id;
    const query = `UPDATE conway SET part = $1, brand = $2, model = $3 WHERE id = $4`;
  
    pool.query(query, [part, brand, model, id], (error, results) => {
      if (error) {
        console.error('Error updating conway part', error);
        res.status(500).send('Error updating conway part');
        return;
      }
  
      res.send(results.rows);
    });
};

const deletePart = (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM conway WHERE id = $1`;
  
    pool.query(query, [id], (error, results) => {
      if (error) {
        console.error('Error deleting conway part', error);
        res.status(500).send('Error deleting conway part');
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