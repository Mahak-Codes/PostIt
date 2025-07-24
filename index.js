const express=require("express");
const path=require("path");
const app=express();
const port=8080;
const posts=require("./views/data.js");
const fs = require("fs");
const {v4:uuidv4}=require("uuid");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.get("/",(req,res)=>{
  res.send("<h1>User Posts</h1>")
})

app.get("/posts",(req,res)=>{
  res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
  res.render("addpost.ejs");
})
app.post("/posts",(req,res)=>{
  const { user, url, content } = req.body;
  posts.push({
    id:uuidv4(),
    username: user,
    image: url,
    content: content
  });
  const updatedData = `let posts = ${JSON.stringify(posts, null, 2)};\n\nmodule.exports = posts;`;
  fs.writeFileSync(path.join(__dirname, "views", "data.js"), updatedData);
  res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
  const {id}=req.params;
  let post=posts.find((p)=>p.id===id);
  if(post==undefined){
    res.send("<h1>No such post exists</h1>")
  }
  else{
    res.render("show.ejs",{post});
  }
})
app.listen(port,(req,res)=>{
  console.log(`Server is listening  on ${port}`);
})