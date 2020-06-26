const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const data = require("./data")
// use files statics 
server.use(express.static('public'))

// configure template engine
server.set('view engine', 'njk')

nunjucks.configure('views',{
    express:server,
    autoescape:false
})
// makes routes
server.get('/',function(req, res){
    res.render('about', {data})
})
server.get('/contents',function(req, res){
    res.render('contents', {data})
})
server.use(function(req, res){
    res.status(404).render("not-found")
})
// starting server
server.listen(5000, function(){
    
})