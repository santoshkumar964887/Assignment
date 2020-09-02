const express=require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const path=require('path');
const MongoClient=mongoose.MongoClient;
const app=express();
const PORT= process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const url = 'mongodb+srv://rakhimishra:RakhiMishra@cluster0.dgxpd.mongodb.net/Niswey?retryWrites=true&w=majority';


app.post("/data", (req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Niswey");
  dbo.collection("contacts").find({}).toArray(function(err, result) {
    if (err) throw err;
    res.status(200).json({result})
    console.log(result)
    db.close();
  });
});
})

// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static('myapp/build'))
//   app.get('*', (req, res)=>{
//     res.sendFile(path.resolve(__dirname, 'myapp', 'build', 'index.html'))
//   })
// }

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(PORT, ()=> console.log("Server started on" + PORT))