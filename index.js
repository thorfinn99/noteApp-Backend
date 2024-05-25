const express = require('express')
const path = require('path')
const app = express()
const fs = require("fs")
const { log } = require('console')

app.set("view engine", 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req,res)=> {
    fs.readdir(`./files`, (err,files)=> {
        res.render("index", {files: files} )
    })
})

app.get('/file/:filename', (req,res)=> {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err,filedata){
        res.render("show",  {filename: req.params.filename, filedata: filedata} );
    })
})
app.get('/edit/:filename', (req,res)=> {
    res.render('edit', {filename: req.params.filename})
})
app.post('/edit', (req,res)=> {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err)=> {
        res.redirect("/")
    } )
})
app.post('/create', (req,res)=> {
    console.log(req.body);
     fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.desc, function(err){
        res.redirect("/")
     })
})

app.listen(3000, ()=>{
    console.log("server is up");
})