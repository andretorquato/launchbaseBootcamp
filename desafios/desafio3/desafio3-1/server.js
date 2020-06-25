const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
// use files statics 
server.use(express.static('public'))

// configure template engine
server.set('view engine', 'njk')

nunjucks.configure('views',{
    express:server
})
// makes routes
server.get('/',function(req, res){
    res.render('about')
})
server.get('/contents',function(req, res){
    res.render('contents')
})
server.use(function(req, res){
    res.status(404).render("not-found")
})
// starting server
server.listen(5000, function(){

})