const { age, graduation, date } = require('../../libs/utils')

module.exports = {
    index(req, res){
    return res.render('teachers/index')
    },
    create(req, res){
        return res.render('teachers/create')
    },
    show(req, res){
        return res.render('teachers/show')
    },
    edit(req, res){
        return res.render('teachers/edit')
    },
    post(req, res){
        return res.redirect("/teachers")
    },
    update(req, res){
        return res.redirect(`/teachers/edit`)
    },
    delete(req, res){
        return res.redirect('/teachers')
    },
}

