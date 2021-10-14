const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res)=>{
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    })
});

router.get('/:cd_id', (req, res)=>{
    const {cd_id} = req.params;
    mysqlConnection.query('SELECT * FROM user WHERE cd_id = ?', [cd_id], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    })
});

module.exports = router;