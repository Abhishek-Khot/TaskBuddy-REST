const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const {v4 :uuid4} = require('uuid');
app.use(express.json());
const methodOverride = require('method-override');

app.use(express.urlencoded({extended :true}));//to take the url parameters
app.use(methodOverride('_method'));

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));//join the views folder (for the ejs files)

app.use(express.static(path.join(__dirname,"public")));//join the public folder to add the static files

let postIncrementer =1; 

let posts = [
    {
        id: postIncrementer++,
        username: "Complete the project report",
        content: "Due next week, need to finalize the document."
    },
    {
        id: postIncrementer++,
        username: "Study for mid-term exam",
        content: "Focus on chapters 3, 4, and 5."
    },
    {
        id: postIncrementer++,
        username: "Grocery shopping",
        content: "Buy essentials for the week."
    },
    {
        id: postIncrementer++,
        username: "Call the dentist",
        content: "Schedule a check-up appointment."
    },
    {
        id: postIncrementer++,
        username: "Finish reading literature book",
        content: "Prepare notes for the upcoming discussion."
    }
];


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//form
//submit the form then the value we get 
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    // console.log(req.body);
    // res.send("post request working");
    //post requset we get add the new post by adding the data to the array
    //we submit the form  come here then should redirect to main page
    let {username,content} = req.body;
    let id = postIncrementer++;
    posts.push({id,username,content}); 
    res.redirect("/posts");//main page
});
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>parseInt(id) === p.id);
    res.render("show.ejs",{post});
});

//not understand this part
app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>parseInt(id) === p.id);
    post.content = newContent;
    console.log(post.content);
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=>parseInt(id) === p.id);
    // console.log(post);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p)=>parseInt(id) !== p.id);
    res.redirect("/posts");
});
app.listen(port,(req,res)=>{
    console.log(`Listening to the port ${port}`);
});