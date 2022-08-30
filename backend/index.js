import express from 'express'
import bodyparser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
import csvtojson from 'csvtojson'
import multer from 'multer'
import excelSchema from './models/employeeSchema'
import {mongoClient} from 'mongodb'
import nodemailer from 'nodemailer'
import http from 'http'
import mysql from 'mysql'

const app = express();
//Front end Not designed
// var storage = multer.diskStorage({
//     destination:(req,file,cb) => {
//         cb(null, './public')
//     },
//     filename:(null,file.filename)
//

// var uploads = multer({storage:storage})
 app.use(bodyparser.json({urlencoded: false}))
  app.use('/login',express.static(path.resolve(__dirname +'/public')))

 
// connecting to DB
 const CONNECT_URL ='mongodb+srv://midhun:midhun7418@cluster0.wu0lvgy.mongodb.net/test'
 const PORT = process.env.PORT || 5000
 mongoose.connect(CONNECT_URL,{useNewurlparser: true })
   .then(() => app.listen(PORT,() => {console.log(`server is Running at port: ${PORT}`)}))
   .catch((error) =>console.log(error))


   app.set('view engine','ejs')

   //route for Home page

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  // Upload excel file and import to mongodb

app.post('/uploadfile', upload.single("/FCT-EMP-LIST"), (req, res,next) =>{
    importExcelData2MongoDB(__dirname + '/public/' + req.file.filename);
    console.log(res);
});

// Import Excel File to MongoDB database

function importExcelData2MongoDB(filePath){
    // -> Read Excel File to Json Data
    const excelData = excelToJson({
        sourceFile: './public',
        sheets:[{
            // Excel Sheet Name
            name: 'FCT-EMP-LIST',
  
            // Header Row -> be skipped and will not be present at our result object.
            header:{
               rows: 1
            },
             
            // Mapping columns to keys
            columnToKey: {
                A: '_id',
                B: 'employeeName',
                C: 'email',
                D: 'dateOfJoin',
                E: 'passWord'
            }
        }]
    })
    await run();
    async function run(){
        try {
            const database = client.db('insertDB')
            const employee = database.collection('Employeee')

            employee.query('SELECT _id ,employeeName,email,DateOfJoin FROM Employee', function(err, rows, fields)
    {
        console.log('Connection result error '+err);
        console.log('num of records is '+rows.length);

        app.get('/', function (req, res) {
          res.send(rows);
        });

    });
        }
    

        catch(err){ console.log(err)}

    }

    // To display in table


    // Send Username  and password to mail ids.
   


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'excelData[1]',
        pass: 'excelData[4]',
    }
});

send();

async function send() {
    const result = await transporter.sendMail({
        from: 'midhun7418@cluster0',
        to: 'excelData[1]',
        subject: 'your credentials',
        text: JSON.Stringify(excelData[1]),
              pass: JSON.Stringify(excelData[4]),
    });

    console.log(JSON.stringify(result, null, 4));
}
employeeSchema.insertDB(jsonObj,(err,data)=>{  
    if(err){  
        console.log(err);  
    }else{  
        res.redirect('/');  
    }  
}); 
     
fs.unlinkSync(filePath);
}
