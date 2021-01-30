const { age, graduation, date } = require("../../libs/utils");
const students = require("../models/students");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;
    
    page = page || 1;
    limit = limit || 2;
    let offset = limit * ( page -1 );


    const params = {
      page,
      limit,
      filter,
      offset,
      callback(students){

        const pagination = {
          total: Math.ceil(students[0].total / limit),
          page
        }

        return res.render("students/index", { students, filter, pagination });
      }
    };

    students.paginate(params);
        
    
    
  },
  create(req, res) {
    students.teachersSelectOption(function (options) {
      return res.render("students/create", { options });
    });
  },
  show(req, res) {
    students.find(req.params, function (student) {
      if (student == undefined) return res.status(404).render("not-found");

      student.age = date(Date.parse(student.birth_date)).birthDay;

      students.teachersSelectOption(function (options) {
      
        return res.render("students/show", { student });
      });
    });
  },
  edit(req, res) {
    students.find(req.params, function (student) {
      if (student == undefined) return res.status(404).render("not-found");

      student.birth_date = date(Date.parse(student.birth_date)).iso;

      students.teachersSelectOption(function (options) {
        return res.render("students/edit", { student, options });
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
      return res.redirect(`students/${student.id}`);
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
