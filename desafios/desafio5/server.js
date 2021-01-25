const express = require('express')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')

const server = express()
const routes = require('./routes')


// active use req.body
server.use(express.urlencoded({extended:true}))
// use files statics 
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)


// configure template engine
server.set('view engine', 'njk')

nunjucks.configure('src/app/views',{
    express:server,
    autoescape:false,
    watch:true,
    noCache: true
})
// message error page not found 
server.use(function(req, res){
    res.status(404).render("not-found")
})
// starting server
server.listen(5000, function(){
    
})