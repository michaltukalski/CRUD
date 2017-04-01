const express = require("express");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const BookSchema = require ('./bookSchema');

const app = express();
const port = 3000;
let db;

app.use(bodyParser.urlencoded({encode: true, extended:true}));
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

MongoClient.connect('mongodb://tukal:aaa@ds149040.mlab.com:49040/book', (err, res)=>{
  if(err){
    return console.error(err);
  }
  db = res;
  app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
  })
})

app.get('/', (req, res)=>{
  db.collection('book').find().toArray((err, result) => {
    console.log(result);
    res.render('index.ejs', {titles: result});
  });
  console.log(__dirname)
});

app.post('/titles', (req, res)=> {
  const book = new BookSchema;
  book.title = req.body.title;
  book.description = req.body.description;
  db.collection('book').save(book, (err, result)=>{
    console.log(req.body);
    if(err){
      return console.error(err);
    }
    console.info('Saved to database');
    res.redirect('/');;
  })
})

app.put('/titles', (req, res)=>{
  db.collection('book').findOneAndUpdate({
    title:'someTitle'
  }, {
    $set:{
      title:req.body.title,
      description: req.body.description
    }
  }, {
    sort: {_id:-1},
    upsert:true
  }, (err, response) =>{
    if(err){
      return res.send(err);
    }
    res.send(response);
  })
});
