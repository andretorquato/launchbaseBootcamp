const { age, graduation, date } = require("../../libs/utils");
const students = require("../models/students");

module.exports = {
  index(req, res) {

    const { filter } = req.query;
    if( filter ){
       students.findBy(filter, function(students){
        
        res.render('students/index', { students, filter });
       });
    }else{
      students.all(function (students) {
        for (student of students) {
          
          student.id = Number(student.id);
        }
  
        return res.render("students/index", { students });
      });
    }
  
  },
  create(req, res) {

    students.teachersSelectOption(function (options) {
      return res.render("students/create", { options});
    });
    
  },
  show(req, res) {
    students.find(req.params, function (student) {
      if (student == undefined) return res.status(404).render("not-found");

      student.age = date(Date.parse(student.birth_date)).birthDay;
      
      students.teachersSelectOption(function(options){
        console.log(options);
        return res.render("students/show", { student });
      });

    });
  },
  edit(req, res) {
    students.find(req.params, function (student) {
      if (student == undefined) return res.status(404).render("not-found");

      student.birth_date = date(Date.parse(student.birth_date)).iso;

      students.teachersSelectOption(function (options) {
        return res.render("students/edit", { student, options});
      });
      
    });
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("preencha todos os campos");
      }
    }

    students.create(req.body, function (student) {
      return res.render("students", { student });
    });
  },
  update(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("preencha todos os campos");
      }
    }

    students.update(req.body, function (student) {
      return res.redirect(`/students/${req.body.id}`);
    });
  },
  delete(req, res) {
    students.delete(req.body.id, function (student) {
      return res.redirect("/students");
    });
  },

};
