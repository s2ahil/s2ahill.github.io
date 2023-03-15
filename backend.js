var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser"); // use req.body
var path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("views"))
app.use(express.static("images"))


const dotenv=require("dotenv");
dotenv.config()

// mongoose.connect(
//     process.env.DB_CONNECT,
//     {useUnifiedTopology:true,useNewUrlParser:true},


// ).then(()=>console.log("connected to db"))


app.set("view engine", "ejs");

main().then(() => console.log("hello run"));
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CONNECT);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



const qsn_And_Ans = new mongoose.Schema({
    name: String,
    comment: String,
    date: Date,
  });

  // Creating class based on schema
const commentInfo = mongoose.model("commentInfos", qsn_And_Ans);



// createDocument()


app.get("/",(req, res) => {
    res.render(__dirname+'/index.ejs')
})

app.get("/qna", (req, res) => {
 
    commentInfo.find( {} )
    .then( (userData) => {
      data=JSON.stringify(userData)
      obj=JSON.parse(data)
      date=obj[0]['date'].slice(0,10)
      res.render('qnaSection',{data:userData,date:date});
     
     
    })
    .catch( (err) => {
      console.log(err);
    });
  });



app.post("/qna", (req, res) => {

  const createDocument = async () => {
    try {
      const info = commentInfo({
        name: req.body.name,
        comment: req.body.comment,
        date: Date(),
      });

      const result = await info.save();
      console.log(result);
      res.redirect("/qna");
    } catch (err) {
      console.log(err);
      res.send("fail");
    }
  };

  createDocument();
});
app.listen(3000, () => console.log("running"));