const { age, graduation, date } = require('../../libs/utils');

module.exports = {
    index(req, res){
    return res.render('students/index')
    },
    create(req, res){
        return res.render('students/create')
    },
    show(req, res){
        return res.render('students/show')
    },
    edit(req, res){
        return res.render('students/edit')
    },
    post(req, res){
        return res.redirect("/students")
    },
    update(req, res){
        return res.redirect(`/students/edit`)
    },
    delete(req, res){
        return res.redirect('/students')
    },
}
