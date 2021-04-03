const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'darkknight2323',
	database: 'elrn',
    timezone:'SYSTEM'
});

//storing profile pics configurations
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '../../elearnFrontEnd/my-app/public/profilepics')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString().slice(0,9)+'-'+file.originalname )
  }
});
var upload = multer({ storage: storage }).single('file');

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));


app.get('/api/select',(req,res)=>{
    const sqlqs = "SELECT * FROM candidates ORDER BY firstname";
    db.query(sqlqs,(err,rslt)=>{
        res.send(rslt);
        console.log(rslt);
    })
});

app.post('/api/insert',(req,res)=>{
    const regNo = req.body.registrationNo;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    const industry=req.body.industry;
    const profilepic = req.body.profilepic;
    console.log(profilepic);

    const sqlqi = "insert into candidates (registration_no,firstname,lastname,email,industry,profilepic) values (?,?,?,?,?,?);";

    db.query(sqlqi,[regNo,firstname,lastname,email,industry,profilepic],(err,rslt)=>{
        if (err) return console.log(err);
        console.log(rslt);
    })
});

app.post('/api/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});
app.get('/api/regNo',(req,res)=>{
    let qry = " select registration_no as regNo from candidates order by regNo;";
    db.query(qry,(err,rslt)=>{
        if (err) return console.log(err);
        res.send(rslt);
    })
})

app.get('/api/search/candidate/:name',(req,res)=>{
    let term = req.params.name;
    sqlqsc = "select * from candidates where firstname like ? or lastname like ? or registration_no=?";

    db.query(sqlqsc,['%'+term+'%','%'+term+'%',term],(err,rslt)=>{
        if(err) return console.log(err);
        console.log(rslt);
        res.send(rslt);
    })
});
app.get('/api/search/result/:name',(req,res)=>{
    let term = req.params.name;
    sqlqsr = "select cand_reg_no,firstname,lastname,knowledge_area,level,score,assessor,overall,completed from results r inner join candidates c on c.registration_no = r.cand_reg_no where firstname like ? or lastname like ? or registration_no=?;";
    db.query(sqlqsr,['%'+term+'%','%'+term+'%',term],(err,rslt)=>{
        if(err)return console.log(err);
        console.log(rslt);
        res.send(rslt);
    })
});
app.get('/api/results',(req,res)=>{
    let sqlqr = "select cand_reg_no,firstname,lastname,knowledge_area,level,score,assessor,overall,completed from results r inner join candidates c on c.registration_no = r.cand_reg_no order by cand_reg_no;";
    db.query(sqlqr,(err,rslt)=>{
        if(err) return res.send(err);
        console.log(rslt);
        res.send(rslt);
    })
});
app.post('/api/results/filter',(req,res)=>{
    let term = req.body.date;
    console.log(term);
    let sqlqrf = `select cand_reg_no,firstname,lastname,knowledge_area,level,score,assessor,overall,completed from results r inner join candidates c on c.registration_no = r.cand_reg_no WHERE completed=?`;

    db.query(sqlqrf,[term],(err,rslt)=>{
        if(err) return console.log(err);
        res.send(rslt);
        console.log(rslt);
    })

})

app.post('/api/addresult',(req,res)=>{
    let cand_reg_no = req.body.cand_reg_no;
    let knowledgeArea = req.body.knowledgeArea;
    let level = req.body.level;
    let score = req.body.score;
    let assessor = req.body.assessor;
    let overall = req.body.overall;
    let completed = req.body.completed;
    console.log(completed);
    let sqlqar = "INSERT INTO results (cand_reg_no,knowledge_area,level,score,assessor,overall,completed) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlqar,[cand_reg_no,knowledgeArea,level,score,assessor,overall,completed],(err,rslt)=>{
        if(err) return res.send(err);
        res.send('success');
        console.log(rslt);
    })
});
app.delete('/api/userDelete',(req,res)=>{
    let userId = req.query.id;
    sqlqd = "DELETE FROM candidates WHERE registration_no=?";
    db.query(sqlqd,[userId],(err,rslt)=>{
        if(err) return console.log(err);
        console.log(rslt)
    })
});

app.get('/api/editCandidate/:regNo',(req,res)=>{
    let registration_no = req.params.regNo;
    console.log(registration_no);
    let sql = "SELECT * FROM candidates WHERE registration_no=?";
    db.query(sql,[registration_no],(err,rslt)=>{
        if (err) return console.log(err);
        console.log(rslt);
        res.send(rslt);
    })
});

app.listen(3001,()=>{
	console.log('running on port 3001');
});