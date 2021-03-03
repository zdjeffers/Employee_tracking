const express = require('express');
const router = express.Router();

// get all employee roles
router.get('/role', (req, res) => {
    const sql = `SELECT * FROM roles`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: "List of all roles has been compiled",
        data: rows
      });
    });
  });

// add a new role
router.post('/roles', (req, res) => {
    const sql = `INSERT INTO roles`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: "New Employee Role Added",
        data: rows
      });
    });
  });

// update employees current role
router.post('/roles', (req, res) => {
    const sql1 = `SELECT * FROM employee WHERE last_name = ?`;
    const params = [];
  
    db.all(sql1, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: "Employee's role has been updated",
        data: rows
      });
    })
      .then((data) => {
        const sql2 = `UPDATE employee WHERE id = ?`, { id }, { role_id: id };
        const params = [];
  
        db.all(sql1, params, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
  
          res.json({
            message: "Employee's role has been updated",
            data: rows
          });
        });
      });
  });
  
module.exports = router;