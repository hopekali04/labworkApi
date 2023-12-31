const express = require('express');
const mysql = require('mysql2');
const app = express();

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

const config = require('./config');
const connection = mysql.createPool(config.database);

const home = (req, res) =>{

    const data = {title: "Home"}
    res.render("index", data)

}

const newpost = (req, res) =>{
    const data = {title: "New Post"}
    res.render("add", data)
}

const submitPost = (req, res) =>{
    data = req.body
    connection.query("INSERT INTO news SET ?", data, (error, results)=>{
        if (error){
            console.log(error)
        }else{
        //data= { title: "POST SuccessFul"}
        res.redirect("/")
        }
    })

    //res.redirect("/")
    //res.render("add")
}
app.get('/', home)
app.get('/post/add', newpost)
app.post('/add/post', submitPost)

app.listen(3000,()=>{
    console.log('listening');
});