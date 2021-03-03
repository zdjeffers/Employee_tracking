const express = require('express');
const router = express.Router();

// gets all employees
router.get('/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: "List of all employees has been compiled",
        data: rows
      });
    });
  });

// add new employee
router.post('/employee', (req, res) => {
    const sql = `INSERT INTO employee`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'Successfully added an employee.',
        data: rows
      });
    });
  });

module.exports = router;