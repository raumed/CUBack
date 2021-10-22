const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/api/unit_config/', (req, res)=>{
    mysqlConnection.query('SELECT * FROM unit_config', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    })
});

router.get('/api/unit_config/:user_cd_id', (req, res)=>{
    const {user_cd_id} = req.params;
    mysqlConnection.query('SELECT * FROM Unit_config WHERE user_cd_id = ?', [user_cd_id], (err, rows, fields) =>{
        if(!err){
            res.status(200);
            res.json(rows);
        } else{
            console.log(err);
        }
    })
});

router.put('/api/unit_config/:user_cd_id', (req, res) => {
    const { ds_lenght, ds_pressure, ds_temperature } = req.body;
    const { user_cd_id } = req.params;
    const query = `
    UPDATE unit_config
      SET ds_lenght = ?,
      ds_pressure = ?,
      ds_temperature = ?
    WHERE user_cd_id = ?;
    `;
    mysqlConnection.query(query, [ds_lenght, ds_pressure, ds_temperature, parseInt(user_cd_id)], (err, rows, fields) => {
      if(!err) {
        res.status(200);
        res.json({status: 'Units Updated'});
      } else {
        res.status(500);
        console.log(err);
      }
    });
  });

  router.post('/api/unit_config/:user_cd_id', (req, res) => {
    const { ds_lenght, ds_pressure, ds_temperature } = req.body;
    const { user_cd_id } = req.params;
    const query = `
    INSERT INTO unit_config (user_cd_id, ds_lenght, ds_pressure, ds_temperature)
    VALUES (?,?,?,?);
    `;
    mysqlConnection.query(query, [ds_lenght, ds_pressure, ds_temperature, parseInt(user_cd_id)], (err, rows, fields) => {
      if(!err) {
        res.status(200);
        res.json({status: 'Configuration created'});
      } else {
        res.status(500);
        console.log(err);
      }
    });
  });

module.exports = router;