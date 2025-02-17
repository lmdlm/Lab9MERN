const express = require('express')
const app = express()
const port = 4000
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());

const mongoDB ='mongodb+srv://admin:admin@cluster0-cofws.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser:true});

const Schema = mongoose.Schema;

const movieSchema = new Schema ({
    title: String,
    year: String,
    poster: String
})

const MovieModel = mongoose.model('movies', movieSchema);


app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/URL', (req, res) => {res.send('Welcome to URL!');
})

app.get('/hello/:name', (req,res)=>{
    console.log(req.params.name);
    res.send('Hello '+req.params.name);
})

app.post('/api/movies', (req,res)=>{
    console.log('Post request successful');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);
    res.json('Data uploaded');


    MovieModel.create({
        title:req.body.title,
        year: req.body.year,
        poster: req.body.poster
    });
    res.send('Item added');
})

app.get('/api/movies', (req,res)=>{

    MovieModel.find((err,data)=>{
        console.log(data);
        res.json({movie:data})
    });
})  

app.delete('/api/movies/:id', (req,res)=>{
    console.log(req.params.id);

    MovieModel.deleteOne({_id:req.params.id}, (error, data) =>{
        if(error)
            res.json(error);
        res.json(data);
    })
})

app.get('/api/movies/:id', (req, res)=>{
    console.log(req.params.id);

    MovieModel.findById(req.params.id,
        (err,data)=>{
        res.json(data);
    });
})

    // const myMovies = [
    //     {
    //     "Title":"Avengers: Infinity War",
    //     "Year":"2018",
    //     "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //     "Title":"Captain America: Civil War",
    //     "Year":"2016",
    //     "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     }
    //     ]

    // res.status(200).json({movies:myMovies, 
    //                       message:'Operation completed sucessfully'})


app.get('/test', (req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/name', (req,res)=>{
    console.log('Hello '+req.query.firstname+' '+req.query.lastname);
    res.send('Hello '+req.query.firstname+' '+req.query.lastname);
})

app.post('/name', (req,res)=>{
    console.log('Hello '+req.query.firstname+' '+req.query.lastname);
    console.log(req.body.firstname);
    res.send('Hello '+req.body.firstname +' '+ req.body.lastname);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))