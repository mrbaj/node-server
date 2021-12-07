import express from "express";
import fs from 'fs';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const feedbackData = require('../data/feedback.json');

import mysql from 'mysql2';

const router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"myDb"
});



router.get('/api', async function(req, res) { 
    con.connect(function(err) {               
        if (err) throw err;                   
        con.query("SELECT * FROM demo", function (err, result, fields) {
          if (err) throw err;                 
            res.send(result)                  
        });                                   
      });                                     
  });

export default router;
