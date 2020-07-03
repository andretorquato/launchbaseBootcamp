const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const routes = require('./routes')

// use files statics 
server.use(express.static('public'))
server.use(routes)
// configure template engine
server.set('view engine', 'njk')

nunjucks.configure('views',{
    express:server,
    autoescape:false,
    noCache: true
})
// message error page not found 
server.use(function(req, res){
    res.status(404).render("not-found")
})
// starting server
server.listen(3000, function(){
    
})