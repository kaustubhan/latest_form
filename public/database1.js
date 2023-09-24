import express from "express";
import bodyParser from "body-parser";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  port: 3306,
  user: 'sql12647543',
  password: 'gZYUTLGig8',
  database: 'sql12647543'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
app.get('/',(req,res)=>{
  var k=res;
  connection.query("SELECT * FROM uni_trial", (err,res)=>{
    if(err) throw err;
    var data1=res;
    console.log('Data received from uni_trial');
    console.log(Object.keys(data1).length);
  
    let z=1;
    for (let i = 0; i < Object.keys(data1).length; i++){
      
      fs.writeFileSync('output'+z+'.png', data1[i]['schoolmarksheet']);
      data1[i]['schoolmarksheet']='output'+z+'.png';
        
      z=z+1;
      fs.writeFileSync('output'+z+'.png', data1[i]['collegemarksheet']);
      data1[i]['collegemarksheet']='output'+z+'.png';
      z=z+1;
      data1[i]['phoneNo']=String(data1[i]['phoneNO']);
      data1[i]['fphone']=String(data1[i]['fphone']);
      data1[i]['mphone']=String(data1[i]['mphone']);
      data1[i]['schoolgrade']=String(data1[i]['schoolgrade']);
      data1[i]['collegegrade']=String(data1[i]['collegegrade']);
      data1[i]['zip']=String(data1[i]['zip']);
    }
    k.render("response.ejs",{data:data1}); 
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});