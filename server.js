const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const PORT= 5000
const MongoClient=mongoose.MongoClient
const app=express()

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
app.listen(PORT, ()=> console.log("Server started on" + PORT))