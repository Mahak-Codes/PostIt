const express=require("express");
const path=require("path");
const app=express();
const port=8080;
const posts=require("./views/data.js");
app.set("view engine","views");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extented:true}));
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("<h1>User Posts</h1>")
})

app.get("/posts",(req,res)=>{
  res.render("index.ejs",{posts});
})
app.listen(port,(req,res)=>{
  console.log(`Server is listening  on ${port}`);
})