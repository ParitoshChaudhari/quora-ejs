const exp = require("constants");
const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
var methodOverride = require('method-override')

// random id
const {v4:uuid4} = require("uuid");

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

let posts=[
    {
        id:uuid4(),
        username:"apna_college",
        content:"Start learning coding from her :) "
    },
    {
        id:uuid4(),
        username:"RCPIT",
        content:"Start learning CSE from her :) "
    },
    {
        id:uuid4(),
        username:"ra9",
        content:"You are smart to understanding"
    },
    {
        id:uuid4(),
        username:"ParitoshChaudhari",
        content:"Started learning MERN STACK "
    },
]

app.get("/",(req,res)=>{
    res.render("index.ejs",{posts});
})

// Routes
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let {username,content} = req.body;
    let id = uuid4();
    posts.push({id,username,content});
    // res.send("Post required.");
    res.redirect("/posts");
});


app.patch("/posts/:id",(req,res)=>{
    let {id} =  req.params;
    let updatedContent = req.body.content;
    let post = posts.find((post) => id === post.id);
    post.content = updatedContent;
    console.log(id);
    res.redirect("/posts")
});


app.get("/posts/:id/edit",(req,res)=>{
    let {id} =  req.params;
    let post = posts.find((post) => id === post.id);
    res.render("edit.ejs",{post});
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((post) => id === post.id);
    // console.log(post);
    // res.send("Seraching");
    res.render("show.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
     posts = posts.filter((post) => id !== post.id);
     res.redirect("/posts");
});



app.listen(PORT,()=>{
    console.log(`Server started at PORT:${PORT}`);
});