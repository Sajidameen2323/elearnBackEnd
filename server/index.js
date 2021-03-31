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
	database: 'elearn',
});

//storing profile pics configurations
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '../my-app/public/profilepics')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
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
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    const industry=req.body.industry;
    const profilepic = req.body.profilepic;
    console.log(profilepic);

    const sqlqi = "INSERT INTO candidates (firstname,lastname,email,industry,profilepic) VALUES (?,?,?,?,?)";

    db.query(sqlqi,[firstname,lastname,email,industry,profilepic],(err,rslt)=>{
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

app.get('/api/search/candidate/:name',(req,res)=>{
    let term = req.params.name;
    sqlqsc = "select * from candidates where firstname like ? or lastname like ? or id=?";

    db.query(sqlqsc,['%'+term+'%','%'+term+'%',term],(err,rslt)=>{
        if(err) return console.log(err);
        console.log(rslt);
        res.send(rslt);
    })
});
app.get('/api/search/result/:name',(req,res)=>{
    let term = req.params.name;
    sqlqsr = "select firstname,lastname,knowledge_area,level,score,assessor,overall,completed from result r inner join candidates c on c.id = r.candidate_id where firstname like ? or lastname like ? or id=?;";
    db.query(sqlqsr,['%'+term+'%','%'+term+'%',term],(err,rslt)=>{
        if(err)return console.log(err);
        console.log(rslt);
        res.send(rslt);
    })
});
app.get('/api/results',(req,res)=>{
    let sqlqr = "select firstname,lastname,knowledge_area,level,score,assessor,overall,completed from result r inner join candidates c on c.id = r.candidate_id;";
    db.query(sqlqr,(err,rslt)=>{
        if(err) return res.send(err);
        console.log(rslt);
        res.send(rslt);
    })
});
app.post('/api/results/filter',(req,res)=>{
    let term = req.body.date;
    let sqlqrf = `SELECT firstname,lastname,knowledge_area,level,score,assessor,overall,completed FROM result r JOIN candidates c ON c.id = r.candidate_id WHERE completed=?`;

    db.query(sqlqrf,[term],(err,rslt)=>{
        if(err) return console.log(err);
        res.send(rslt);
        console.log(rslt);
    })

})

app.post('/api/addresult',(req,res)=>{
    let candidateId = req.body.candidateId;
    let knowledgeArea = req.body.knowledgeArea;
    let level = req.body.level;
    let score = req.body.score;
    let assessor = req.body.assessor;
    let overall = req.body.overall;
    let completed = req.body.completed;
    console.log(completed);
    let sqlqar = "INSERT INTO result (candidate_id,knowledge_area,level,score,assessor,overall,completed) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlqar,[candidateId,knowledgeArea,level,score,assessor,overall,completed],(err,rslt)=>{
        if(err) return res.send(err);
        res.send('success');
        console.log(rslt);
    })
});
app.delete('/api/userDelete',(req,res)=>{
    let userId = req.query.id;
    sqlqd = "DELETE FROM candidates WHERE id=?";
    db.query(sqlqd,[userId],(err,rslt)=>{
        if(err) return console.log(err);
        console.log(rslt)
    })
})

app.listen(3001,()=>{
	console.log('running on port 3001');
});