const express = require('express');
const router = express.Router();

// get all departments
router.get('/department', (req, res) => {
    const sql = `SELECT * FROM department`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: "List of all departments has been compiled",
        data: rows
      });
    });
  });

// Add a new department
router.post('/department', (req, res) => {
    const sql = `INSERT INTO department`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: "You have added a new employee department",
        data: rows
      });
    });
  });

module.exports = router;