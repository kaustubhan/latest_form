import express from "express";
import bodyParser from "body-parser";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let a=0;
let b=0;
let length1=0;
let length=0;
let z=0;

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
  a=0;
  b=0;
  var k=res;
  connection.query("SELECT * FROM uni_trial", (err,res)=>{
    if(err) throw err;
    var data1=res;
    length1=Object.keys(data1).length
    console.log('Data received from uni_trial');
    console.log(Object.keys(data1).length,5);
    if( Object.keys(data1).length >5 ){
      length=5;
      b= Object.keys(data1).length-5;

    }else{
      length=Object.keys(data1).length
    }
    console.log(length);
    for (let i = 0; i < length; i++){
      
      fs.writeFileSync('public/output'+z+'.png', data1[i]['schoolmarksheet']);
      data1[i]['marksheetschool']='output'+z+'.png';
        
      z=z+1;
      fs.writeFileSync('public/output'+z+'.png', data1[i]['collegemarksheet']);
      data1[i]['marksheetcollege']='output'+z+'.png';
      z=z+1;
      data1[i]['phoneNo']=String(data1[i]['phoneNO']);
      data1[i]['fphone']=String(data1[i]['fphone']);
      data1[i]['mphone']=String(data1[i]['mphone']);
      data1[i]['schoolgrade']=String(data1[i]['schoolgrade']);
      data1[i]['collegegrade']=String(data1[i]['collegegrade']);
      data1[i]['zip']=String(data1[i]['zip']);
    }
    console.log(length);
    k.render("response.ejs",{data:data1,prev:a,n:b,l:length}); 
  });
});

app.post('/previous',(req,res)=>{
  var k1=res;
  if(b=0){
    b=length1-a;
  }else{
    b=b+5;
  }
  a=a-5;
  connection.query("SELECT * FROM uni_trial", (err,res)=>{
    if(err) throw err;
    var data1=res;

    for (let i = a; i < a+5; i++){
      
      fs.writeFileSync('output'+z+'.png', data1[i]['schoolmarksheet']);
      data1[i]['marksheetschool']='output'+z+'.png';
        
      z=z+1;
      fs.writeFileSync('output'+z+'.png', data1[i]['collegemarksheet']);
      data1[i]['marksheetcollege']='output'+z+'.png';
      z=z+1;
      data1[i]['phoneNo']=String(data1[i]['phoneNO']);
      data1[i]['fphone']=String(data1[i]['fphone']);
      data1[i]['mphone']=String(data1[i]['mphone']);
      data1[i]['schoolgrade']=String(data1[i]['schoolgrade']);
      data1[i]['collegegrade']=String(data1[i]['collegegrade']);
      data1[i]['zip']=String(data1[i]['zip']);
    }
    k1.render("response.ejs",{data:data1,prev:a,n:b,l:a+5});
  });
});

app.post('/next',(req,res)=>{
  var k2=res;
  a=a+5;
  if(b-5<0){
    b=0;
  }else{
    b=b-5;
  }
  if(length-a<5){
    length=length1;
  }else{
    length1=a+5;
  }
  connection.query("SELECT * FROM uni_trial", (err,res)=>{
    if(err) throw err;
    var data1=res;
    console.log(length,a);

    for (let i = a; i < length; i++){
      
      fs.writeFileSync('output'+z+'.png', data1[i]['schoolmarksheet']);
      data1[i]['marksheetschool']='output'+z+'.png';
      
      console.log(z);

      z=z+1;
      fs.writeFileSync('output'+z+'.png', data1[i]['collegemarksheet']);
      data1[i]['marksheetcollege']='output'+z+'.png';
      z=z+1;
      data1[i]['phoneNo']=String(data1[i]['phoneNO']);
      data1[i]['fphone']=String(data1[i]['fphone']);
      data1[i]['mphone']=String(data1[i]['mphone']);
      data1[i]['schoolgrade']=String(data1[i]['schoolgrade']);
      data1[i]['collegegrade']=String(data1[i]['collegegrade']);
      data1[i]['zip']=String(data1[i]['zip']);
    }
    k2.render("response.ejs",{data:data1,prev:a,n:b,l:length});
  });
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
